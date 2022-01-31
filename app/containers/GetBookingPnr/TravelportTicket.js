import React, { useState, useEffect } from 'react';
import BlueArrow from '../../assets/img/BlueArrow.png';
import ErrorBoundary from './../../helper/ErrorBoundary';
import { Link } from 'react-router-dom';
import { toUpper } from 'lodash';
import { ConfirmParent, FailedBooking } from './wrapper/GetBookingStyle';
// import { pdf } from '@react-pdf/renderer';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import Document from './component/TravelportTicketPDF';
import CancelModal from './CancelModal';
import Axios from '../../utils/service';
import { time_convert, diff_minutes, utc_convert, TimeZone, date_convert } from '../../helper/ConvertFunctions';


export default function TravelportTicket({ bookingData })
{
    if (bookingData.data.segments.length === 0)
    {
        return <FailedBooking className="d-flex flex-column">
            <h4>Booking Not Found.</h4>
            <div className="foot">
                <Link to="/">Go to Home</Link>
            </div>
        </FailedBooking>
    }
    const lastIndex = bookingData.data.segments.length - 1;
    let firstCity = bookingData.data.segments[0].origin_city_name.split(',');
    firstCity = firstCity[0].split(' ');
    let lastCity = bookingData.data.segments[lastIndex].destination_city_name.split(',');
    lastCity = lastCity[0].split(' ');
    const [showModal, setShowModal] = useState(false);
    
    const cancelObj = {
        pnr: bookingData.data.galilo_pnr,
        reservationCode: bookingData.data.LocatorCode,
        provider: bookingData.data.provider_type
    };
    const [cancel, setCancel] = useState(false);
    const [loadings, setLoadings] = useState(true);
    const [cancelRes, setCancelRes] = useState({});
    let ticketing = 'E-Reservation Information';

    if (bookingData.data.ticket_numbers && bookingData.data.ticket_numbers.length === bookingData.data.passenger_detail.length) 
    {
        ticketing = 'E-Ticketing Information';
    }

    useEffect(() =>
    {
        const APIreq = '/cancelrequest?pnr=' + cancelObj.pnr + '&ticket_reservation_code=' + cancelObj.reservationCode + '&provider_type=' + cancelObj.provider;
        async function cancelBookings()
        {
            if (cancel)
            {
                Axios.get(APIreq)
                .then((response)=>{
                    const res = response.data;
                    setCancelRes(res);
                    setLoadings(false);
                });
            }
        }
        cancelBookings();
    },[cancel]);
    
    let count = 0;

    firstCity.map((origin) => {
        lastCity.map((destination) => {
            if(destination == origin)
            {
                count++;
            }
        })
    });

    const round = (count > 0) ? true : false ;
    
    let post = 0;
    let current = 0;
    let counter = 0;
    let roundLast = (round) ? 
        bookingData.data.segments.map((segment, index) => 
        {
            current = index;
            counter = 0;
            post = (bookingData.data.segments.length > current+1) ? current + 1 : current ;
            let destCity = segment.destination_city_name.split(' ');
            let originCity = bookingData.data.segments[post].origin_city_name.split(' ');

            destCity.map((destination) => {
                originCity.map((origin) => {
                    if(destination == origin)
                    {
                        counter++;
                    }
                })
            });

            if (counter > 0 && bookingData.data.segments.length > 2)
            {
                return bookingData.data.segments[post];
            }
            else if (counter > 0 && bookingData.data.segments.length <= 2)
            {
                return segment;
            }
        }) 
    :
        '';
    if (roundLast != '' && round)
    {
        roundLast = roundLast.filter(Boolean);
    }
        
    const firstSegment = bookingData.data.segments[0];
    const lastSegment = (round) ? roundLast[0] : bookingData.data.segments[lastIndex];
    const totalStops = bookingData.data.segments.length - 1;
    
    let totalFlightTime = 0; 
    
    if(round)
    {
        let x = 0;
        let c = 0;
        
        bookingData.data.segments.map((segment) => 
        {
            if (x == 0)
            {
                totalFlightTime += Number(segment.TravelTime);
            }
            
            if (lastSegment.destination_city_name == segment.destination_city_name || lastSegment.origin_city_name != segment.origin_city_name)
            {
                x++;
            }
        });
    }
    else
    {
        totalFlightTime = bookingData.data.segments.reduce(
            (accumulator, segment) => accumulator + Number(segment.TravelTime),
            0,
        );
    }

    let TotalPrice = 0;
    if (bookingData.data.pricing.length > 0)
    {
        bookingData.data.pricing.map((price) => {
            TotalPrice += Number(price.TotalPriceWithCommission);
        });
        TotalPrice = 'PKR ' + TotalPrice + '/-';
    }
    else
    {
        TotalPrice = 'PKR 0/-';
    }

    // PDF Print Function
    function print()
    {
        savePdf(<Document bookingData={bookingData} totalStops={totalStops} totalFlightTime={totalFlightTime} firstSegment={firstSegment} 
            lastSegment={lastSegment} round={round} TotalPrice={TotalPrice} ticketing={ticketing} />, "4E - Ticket Information.pdf");
    }

    const ModalToggle = () => {
        setShowModal(!showModal);
    }
    return (
        <>
            {
                (bookingData.status && bookingData.status != '400') ?
                    <ErrorBoundary>
                        <ConfirmParent>
                            <div className="main" style={{opacity: (showModal) ? '0.5' : '1'}}>
                                <div className="success">
                                    <div className="success-head">
                                        <div>
                                            <h2>{ticketing}</h2>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="PAX-info row">
                                        <div className="left">
                                            <div className="PAX-inner-row">
                                                <h4>Passenger: </h4>
                                                <p>{bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>PNR Creation Date: </h4>
                                                <p>{date_convert(bookingData.data.CreateDateTime)}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>Issuing Agent: </h4>
                                                <p>Bukhari Travel Services</p>
                                            </div>
                                            {
                                                (bookingData.data.passenger_detail[0].passport_number) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Passport Number: </h4>
                                                        <p>{toUpper(bookingData.data.passenger_detail[0].passport_number)}</p>
                                                    </div>
                                            }
                                            {
                                                (bookingData.data.passenger_detail[0].nationality) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Fare: </h4>
                                                        <p>{TotalPrice}</p>
                                                    </div>
                                            }
                                        </div>
                                        <div className="right">
                                            {
                                                (bookingData.data.passenger_detail[0].nationality) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Nationality: </h4>
                                                        <p>{toUpper(bookingData.data.passenger_detail[0].nationality)}</p>
                                                    </div>
                                            }
                                            <div className="PAX-inner-row">
                                                <h4>Booking Reference (PNR): </h4>
                                                <p>{bookingData.data.galilo_pnr}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>IATA Number: </h4>
                                                <p>27303054</p>
                                            </div>
                                            {
                                                (bookingData.data.passenger_detail[0].passport_number) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Passport Expiry: </h4>
                                                        <p>{bookingData.data.passenger_detail[0].exp_day + ' ' + bookingData.data.passenger_detail[0].exp_month + ' ' + bookingData.data.passenger_detail[0].exp_year}</p>
                                                    </div>
                                            }
                                            {
                                                (!bookingData.data.passenger_detail[0].nationality) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Fare: </h4>
                                                        <p>{TotalPrice}</p>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                    <h3>Flight Details</h3>
                                    <div className="flight-info-parent">
                                        <div className="flight-info-head">
                                            {/* Desktop View of Flight */}
                                            <div className="inner-head-desktop">
                                                <div className="flight">
                                                    <p>{firstSegment.origin_city_name}</p>
                                                    <p>To</p>
                                                    <p>{lastSegment.destination_city_name}</p>
                                                </div>
                                                <div className="plane">
                                                    <i className="fas fa-plane"></i>
                                                </div>
                                                <div className="depart">
                                                    <h4>Departure</h4>
                                                    <h5 title={TimeZone(firstSegment.DepartureTime)}>{utc_convert(firstSegment.DepartureTime)}</h5>
                                                    <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>{date_convert(firstSegment.DepartureTime)}</h5>
                                                </div>
                                                <div className="arrow">
                                                    <div>
                                                        <p>{(totalStops === 0) ? 'Direct Flight' : (totalStops > 1 ) ? totalStops + ' Stops' : totalStops + ' Stop'}</p>
                                                        <img src={BlueArrow} alt="arrow" />
                                                        <p>{'Total Flight Time: '+ time_convert(totalFlightTime)}</p>
                                                        <p>{(round) ? 'Round-Trip' : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="arrival">
                                                    <h4>Arrival</h4>
                                                    <h5 title={TimeZone(lastSegment.ArrivalTime)}>{utc_convert(lastSegment.ArrivalTime)}</h5>
                                                    <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>{date_convert(lastSegment.ArrivalTime)}</h5>
                                                </div>
                                            </div>
                                            {/* Mobile View of Flight */}
                                            <div className="inner-head-mobile">
                                                <div className="flight">
                                                    <p>{firstSegment.origin_city_name}</p>
                                                    <p>To</p>
                                                    <p>{lastSegment.destination_city_name}</p>
                                                </div>
                                                <div className="depart-arrive">
                                                    <div className="depart">
                                                        <h4>Departure</h4>
                                                        <h5 title={TimeZone(firstSegment.DepartureTime)}>{utc_convert(firstSegment.DepartureTime)}</h5>
                                                        <h4>{date_convert(firstSegment.DepartureTime)}</h4>
                                                    </div>
                                                    <div className="arrow">
                                                        <div>
                                                            <p>{(totalStops === 0) ? 'Direct Flight' : (totalStops > 1 ) ? totalStops + ' Stops' : totalStops + ' Stop'}</p>
                                                            <img src={BlueArrow} alt="arrow" />
                                                            <p>{'Total Time: '+ time_convert(totalFlightTime)}</p>
                                                            <p>{(round) ? 'Round-Trip' : ''}</p>
                                                        </div>
                                                    </div>
                                                    <div className="arrival">
                                                        <h4>Arrival</h4>
                                                        <h5 title={TimeZone(lastSegment.ArrivalTime)}>{utc_convert(lastSegment.ArrivalTime)}</h5>
                                                        <h4>{date_convert(lastSegment.ArrivalTime)}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            bookingData.data.segments.map((segment, index) => {
                                                let originCity = segment.origin_city_name.split(',');
                                                let destinationCity = segment.destination_city_name.split(',');
                                                return (
                                                    <div className="flight-info" key={Math.random()}>
                                                        <div className="flight-inner-row">
                                                            <p>
                                                                <span>{date_convert(segment.DepartureTime)} </span>
                                                                <span>- {originCity[0]} <span style={{ color: '#FF9800' }}>To</span> {destinationCity[0]} -&nbsp;</span>
                                                                <span className="flight-status">Confirmed <i className="fas fa-check-circle"></i></span>
                                                            </p>
                                                        </div>
                                                        <div className="flight-inner-row">
                                                            <div className="flight-inner-row-desktop">
                                                                <div className="airline">
                                                                    <img src={segment.airline_logo} alt='Carrier Logo' />
                                                                    <p>{toUpper(segment.airline_name.slice(0,1)) + segment.airline_name.slice(1) + ' (' + segment.Carrier + ') ' + segment.FlightNumber}</p>
                                                                </div>
                                                                <div className="plane">
                                                                    <i className="fas fa-plane"></i>
                                                                </div>
                                                                <div className="depart">
                                                                    <h4>Departure</h4>
                                                                    <div>
                                                                        <h5 title={TimeZone(segment.DepartureTime)}>{utc_convert(segment.DepartureTime)}</h5>
                                                                    </div>
                                                                    <h5>{date_convert(segment.DepartureTime)}</h5>
                                                                </div>
                                                                <div className="arrow">
                                                                    <div>
                                                                        <img src={BlueArrow} alt="arrow" />
                                                                    </div>
                                                                </div>
                                                                <div className="arrival">
                                                                    <h4>Arrival</h4>
                                                                    <div>
                                                                        <h5 title={TimeZone(segment.ArrivalTime)}>{utc_convert(segment.ArrivalTime)}</h5>
                                                                    </div>
                                                                    <h5>{date_convert(segment.ArrivalTime)}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="flight-inner-row-mobile">
                                                                <div className="airline">
                                                                    <img src={segment.airline_logo} alt='Carrier Logo' />
                                                                    <p>{segment.airline_name + ' (' + segment.Carrier + ') ' + segment.FlightNumber}</p>
                                                                </div>
                                                                <div className="flight-inner-depart-arrive">
                                                                    <div className="depart">
                                                                        <h4>Departure</h4>
                                                                        <h5 title={TimeZone(segment.DepartureTime)}>{utc_convert(segment.DepartureTime)}</h5>
                                                                        <h4>{date_convert(segment.DepartureTime)}</h4>
                                                                    </div>
                                                                    <div className="arrow">
                                                                        <div>
                                                                            <img src={BlueArrow} alt="arrow" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="arrival">
                                                                        <h4>Arrival</h4>
                                                                        <h5 title={TimeZone(segment.ArrivalTime)}>{utc_convert(segment.ArrivalTime)}</h5>
                                                                        <h4>{date_convert(segment.ArrivalTime)}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flight-inner-row flights">
                                                            <h4 className="PAX-head">Passengers</h4>
                                                            {
                                                                (bookingData.data.passenger_detail.length > 0) &&
                                                                    <table className="ticket-info">
                                                                        <thead>
                                                                            <tr key={Math.random()}>
                                                                                <td>Name</td>
                                                                                <td>eTicket Number</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {bookingData.data.passenger_detail.map((pax, index) => {
                                                                                return (
                                                                                    <tr key={Math.random()}>
                                                                                        <td>{pax.lastName + ', ' + pax.firstName}</td>
                                                                                        {
                                                                                            (bookingData.data.ticket_numbers && bookingData.data.ticket_numbers.length > 0) ? 
                                                                                                <td>{bookingData.data.ticket_numbers[index].ticket_number}</td>
                                                                                            :
                                                                                                <td>----------</td>
                                                                                        }
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                            }
                                                            <h4 className="service">Class of Service: <span>{segment.CabinClass}</span></h4>
                                                            {
                                                                (bookingData.data.segments.length > 1 && bookingData.data.segments.length - 1 != index && segment.origin_city_name != lastSegment.destination_city_name && segment.destination_city_name != lastSegment.destination_city_name) &&
                                                                    <h4 className="service">Waiting Time: &nbsp;
                                                                        <span>
                                                                            {
                                                                                diff_minutes(segment.ArrivalTime, bookingData.data.segments[(index + 1 == bookingData.data.segments.length) ? bookingData.data.segments.length - 1 : index + 1].DepartureTime)
                                                                            }
                                                                        </span>
                                                                    </h4>
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="agent">
                                        <h3>Agent Details</h3>
                                        <p>BUKHARI TRAVEL SERVICES</p>
                                        <p>2-Mohammadi Plaza, Blue Area, Islamabad</p>
                                        <p>Pakistan</p>
                                        <p>Phone: +92-51-28282562</p>
                                    </div>
                                </div>
                                <div className="foot">
                                    <a className="foot-btn" onClick={print}>Download PDF</a>
                                    <a className="cancel btn-danger" onClick={() => setShowModal(true)}  data-toggle="modal" data-target="#cancelModal">Cancel Booking</a>
                                    <Link className="foot-btn" to="/">Go to Home</Link>
                                </div>
                                {/* <PDFViewer style={{width: '100%', height: '1300px'}}>
                                    <Document bookingData={bookingData} totalStops={totalStops} totalFlightTime={totalFlightTime} 
                                        firstSegment={firstSegment} lastSegment={lastSegment} round={round} TotalPrice={TotalPrice} 
                                        ticketing={ticketing} />
                                </PDFViewer> */}
                            </div>
                        </ConfirmParent>
                        {/* Bootstrap Cancel Modal */}
                        {
                            (showModal) ?
                                <CancelModal ModalToggle={ModalToggle} showModal={showModal} setCancel={setCancel} loadings={loadings} cancelRes={cancelRes} />
                            :
                                ''
                        }
                    </ErrorBoundary>
                :
                    <FailedBooking className="d-flex flex-column">
                        <h4>Booking Not Found.</h4>
                        <div className="foot">
                            <Link to="/">Go to Home</Link>
                        </div>
                    </FailedBooking>
            }
        </>
    );
}

const saveBlob = (blob, filename) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};

export const savePdf = async (document, filename) => {
    saveBlob(await pdf(document).toBlob(), filename);
};