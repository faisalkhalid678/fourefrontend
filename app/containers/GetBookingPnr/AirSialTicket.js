import React, { useState, useEffect } from 'react';
import BlueArrow from '../../assets/img/BlueArrow.png';
import ErrorBoundary from './../../helper/ErrorBoundary';
import { Link } from 'react-router-dom';
import { toUpper } from 'lodash';
import { ConfirmParent, FailedBooking } from './wrapper/GetBookingStyle';
// import { pdf } from '@react-pdf/renderer';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import Document from './component/AirSialTicketPDF';
import CancelModal from './CancelModal';
import Axios from '../../utils/service';
import { time_convert, date_convert } from '../../helper/ConvertFunctions';

export default function AirSialTicket({ bookingData })
{
    const round = (bookingData.data.segments.inbound && bookingData.data.segments.inbound.length > 0) ? true : false;
    
    const firstSegment = bookingData.data.segments.outbound[0];
    const lastSegment = (round) ? bookingData.data.segments.inbound[0] : bookingData.data.segments.outbound[0];
    const [showModal, setShowModal] = useState(false);
    let ticketing = 'E-Reservation Information';

    let count = 0;
    bookingData.data.passenger_detail.map((pax) => {
        if (pax.ticket_number && pax.ticket_number !== '')
        {
            count++;
        }
    });
    
    if (count === bookingData.data.passenger_detail.length)
    {
        ticketing = 'E-Ticket Information';
    }

    const cancelObj = {
        pnr: bookingData.data.pnr,
        reservationCode: 'Not Found',
        provider: bookingData.data.provider_type
    };
    const [cancel, setCancel] = useState(false);
    const [loadings, setLoadings] = useState(true);
    const [cancelRes, setCancelRes] = useState({});

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

    let originCity = '';
    let destinationCity = '';
    let totalFlightTime = firstSegment.FlightTime;

    const totalStops = (round) ? 1 : 0;

    // PDF Print Function
    function print() {
        savePdf(<Document bookingData={bookingData} firstSegment={firstSegment} lastSegment={lastSegment} originCity={originCity} 
            destinationCity={destinationCity} totalFlightTime={totalFlightTime} totalStops={totalStops} round={round} ticketing={ticketing} />, 
            "4E - Ticket Information.pdf");
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
                                        <h2>{ticketing}</h2>
                                    </div>
                                    <hr />
                                    <div className="PAX-info row">
                                        <div className="left">
                                            <div className="PAX-inner-row">
                                                <h4>Passenger: </h4>
                                                <p>{bookingData.data.passenger_detail[0].title + '. ' + bookingData.data.passenger_detail[0].name}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>Issuing Agent: </h4>
                                                <p>Bukhari Travel Services</p>
                                            </div>
                                            {
                                                (bookingData.data.passenger_detail[0].cnic && bookingData.data.passenger_detail[0].cnic != null && bookingData.data.passenger_detail[0].cnic.trim().length > 0) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>CNIC: </h4>
                                                        <p>{bookingData.data.passenger_detail[0].cnic}</p>
                                                    </div>
                                            }
                                        </div>
                                        <div className="right">
                                            {
                                                (bookingData.data.passenger_detail[0].cnic && bookingData.data.passenger_detail[0].cnic != null && bookingData.data.passenger_detail[0].cnic.trim().length > 0) &&
                                                    <div className="PAX-inner-row">
                                                        <h4>Nationality: </h4>
                                                        <p>PK</p>
                                                    </div>
                                            }
                                            <div className="PAX-inner-row">
                                                <h4>Booking Reference (PNR): </h4>
                                                <p>{bookingData.data.pnr}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>IATA Number: </h4>
                                                <p>27303054</p>
                                            </div>
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
                                                    <p>{firstSegment.Destination_city_name}</p>
                                                </div>
                                                <div className="plane">
                                                    <i className="fas fa-plane"></i>
                                                </div>
                                                <div className="depart">
                                                    <h4>Departure</h4>
                                                    <h5>{firstSegment.DEPARTURE_TIME}</h5>
                                                    <h5 style={{fontSize: 'initial', flexBasis: 'initial'}}>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                </div>
                                                <div className="arrow">
                                                    <div>
                                                        <p>{(totalStops === 0) ? 'Direct Flight' : (totalStops === 1) ? '1 Stop' : totalStops + ' Stops'}</p>
                                                        <img src={BlueArrow} alt="arrow" />
                                                        <p>Total Flight Time: {time_convert(totalFlightTime)}</p>
                                                        <p>{(round) ? 'Round-Trip' : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="arrival">
                                                    <h4>Arrival</h4>
                                                    <h5>{firstSegment.ARRIVAL_TIME}</h5>
                                                    <h5 style={{fontSize: 'initial', flexBasis: 'initial'}}>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                </div>
                                            </div>
                                            {/* Mobile View of Flight */}
                                            <div className="inner-head-mobile">
                                                <div className="flight">
                                                    <p>{firstSegment.origin_city_name}</p>
                                                    <p>To</p>
                                                    <p>{lastSegment.Destination_city_name}</p>
                                                </div>
                                                <div className="depart-arrive">
                                                    <div className="depart">
                                                        <h4>Departure</h4>
                                                        <h5>{firstSegment.DEPARTURE_TIME}</h5>
                                                        <h5 style={{fontSize: 'initial', flexBasis: 'initial'}}>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                    </div>
                                                    <div className="arrow">
                                                        <div>
                                                            <p>{(totalStops === 0) ? 'Direct Flight' : (totalStops === 1) ? '1 Stop' : totalStops + ' Stops'}</p>
                                                            <img src={BlueArrow} alt="arrow" />
                                                            <p>{'Total Flight Time: ' + time_convert(totalFlightTime)}</p>
                                                            <p>{(round) ? 'Round-Trip' : ''}</p>
                                                        </div>
                                                    </div>
                                                    <div className="arrival">
                                                        <h4>Arrival</h4>
                                                        <h5>{firstSegment.ARRIVAL_TIME}</h5>
                                                        <h5 style={{fontSize: 'initial', flexBasis: 'initial'}}>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            originCity = firstSegment.origin_city_name.split(','),
                                            destinationCity = firstSegment.Destination_city_name.split(','),
                                            <div className="flight-info">
                                                <div className="flight-inner-row">
                                                    <p>
                                                        <span>{firstSegment.DEPARTURE_TIME}</span>
                                                        <span>- {originCity[0]} <span style={{ color: '#FF9800' }}>To</span> {destinationCity[0]} -&nbsp;</span>
                                                        <span className="flight-status">Confirmed <i className="fas fa-check-circle"></i></span>
                                                    </p>
                                                </div>
                                                <div className="flight-inner-row">
                                                    <div className="flight-inner-row-desktop">
                                                        <div className="airline">
                                                            <img src={firstSegment.airline_logo} alt='Carrier Logo' />
                                                            <p>{firstSegment.airline_name + ' (' + firstSegment.FlightNumber.slice(0, 2) + ') ' + firstSegment.FlightNumber.slice(2)}</p>
                                                        </div>
                                                        <div className="plane">
                                                            <i className="fas fa-plane"></i>
                                                        </div>
                                                        <div className="depart">
                                                            <h4>Departure</h4>
                                                            <div>
                                                                <h5>{firstSegment.DEPARTURE_TIME}</h5>
                                                            </div>
                                                            <h5>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                        </div>
                                                        <div className="arrow">
                                                            <div>
                                                                <img src={BlueArrow} alt="arrow" />
                                                            </div>
                                                        </div>
                                                        <div className="arrival">
                                                            <h4>Arrival</h4>
                                                            <div>
                                                                <h5>{firstSegment.ARRIVAL_TIME}</h5>
                                                            </div>
                                                            <h5>{date_convert(firstSegment.DEPARTURE_DATE)}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="flight-inner-row-mobile">
                                                        <div className="airline">
                                                            <img src={firstSegment.airline_logo} alt='Carrier Logo' />
                                                            <p>{toUpper(firstSegment.airline_name.slice(0,1)) + firstSegment.airline_name.slice(1) + ' (' + firstSegment.FlightNumber.slice(0, 2) + ') ' + firstSegment.FlightNumber.slice(2)}</p>
                                                        </div>
                                                        <div className="flight-inner-depart-arrive">
                                                            <div className="depart">
                                                                <h4>Departure</h4>
                                                                <h5>{firstSegment.DEPARTURE_TIME}</h5>
                                                                <h4>{date_convert(firstSegment.DEPARTURE_DATE)}</h4>
                                                            </div>
                                                            <div className="arrow">
                                                                <div>
                                                                    <img src={BlueArrow} alt="arrow" />
                                                                </div>
                                                            </div>
                                                            <div className="arrival">
                                                                <h4>Arrival</h4>
                                                                <h5>{firstSegment.ARRIVAL_TIME}</h5>
                                                                <h4>{date_convert(firstSegment.DEPARTURE_DATE)}</h4>
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
                                                                    <tr>
                                                                        <td>Name</td>
                                                                        <td>eTicket Number</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {bookingData.data.passenger_detail.map((pax) => {
                                                                        return (
                                                                            <tr key={Math.random()}>
                                                                                <td>{pax.title + '. ' + pax.name}</td>
                                                                                {
                                                                                    (pax.ticket_number !== '') ?
                                                                                        <td>{pax.ticket_number}</td>
                                                                                    :
                                                                                        <td>----------</td>
                                                                                }
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                    }
                                                    {/* <h4 className="service">Class of Service: <span>{query.cabinClass.label}</span></h4> */}
                                                </div>
                                            </div>
                                        }
                                        {
                                            (round) ?
                                                <>
                                                    {
                                                        originCity = lastSegment.origin_city_name.split(','),
                                                        destinationCity = lastSegment.Destination_city_name.split(','),
                                                        <div className="flight-info">
                                                            <div className="flight-inner-row">
                                                                <p>
                                                                    <span>{lastSegment.DEPARTURE_TIME}</span>
                                                                    <span>- {originCity[0]} <span style={{ color: '#FF9800' }}>To</span> {destinationCity[0]} -&nbsp;</span>
                                                                    <span className="flight-status">Confirmed <i className="fas fa-check-circle"></i></span>
                                                                </p>
                                                            </div>
                                                            <div className="flight-inner-row">
                                                                <div className="flight-inner-row-desktop">
                                                                    <div className="airline">
                                                                        <img src={lastSegment.airline_logo} alt='Carrier Logo' />
                                                                        <p>{lastSegment.airline_name + ' (' + lastSegment.FlightNumber.slice(0, 2) + ') ' + lastSegment.FlightNumber.slice(2)}</p>
                                                                    </div>
                                                                    <div className="plane">
                                                                        <i className="fas fa-plane"></i>
                                                                    </div>
                                                                    <div className="depart">
                                                                        <h4>Departure</h4>
                                                                        <div>
                                                                            <h5>{lastSegment.DEPARTURE_TIME}</h5>
                                                                        </div>
                                                                        <h5>{date_convert(lastSegment.DEPARTURE_DATE)}</h5>
                                                                    </div>
                                                                    <div className="arrow">
                                                                        <div>
                                                                            <img src={BlueArrow} alt="arrow" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="arrival">
                                                                        <h4>Arrival</h4>
                                                                        <div>
                                                                            <h5>{lastSegment.ARRIVAL_TIME}</h5>
                                                                        </div>
                                                                        <h5>{date_convert(lastSegment.DEPARTURE_DATE)}</h5>
                                                                    </div>
                                                                </div>
                                                                <div className="flight-inner-row-mobile">
                                                                    <div className="airline">
                                                                        <img src={lastSegment.airline_logo} alt='Carrier Logo' />
                                                                        <p>{lastSegment.airline_name + ' (' + lastSegment.FlightNumber.slice(0, 2) + ') ' + lastSegment.FlightNumber.slice(2)}</p>
                                                                    </div>
                                                                    <div className="flight-inner-depart-arrive">
                                                                        <div className="depart">
                                                                            <h4>Departure</h4>
                                                                            <h5>{lastSegment.DEPARTURE_TIME}</h5>
                                                                            <h4>{date_convert(lastSegment.DEPARTURE_DATE)}</h4>
                                                                        </div>
                                                                        <div className="arrow">
                                                                            <div>
                                                                                <img src={BlueArrow} alt="arrow" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="arrival">
                                                                            <h4>Arrival</h4>
                                                                            <h5>{lastSegment.ARRIVAL_TIME}</h5>
                                                                            <h4>{date_convert(lastSegment.DEPARTURE_DATE)}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flight-inner-row flights">
                                                                <h4 className="PAX-head">Passengers</h4>
                                                                {
                                                                    (bookingData.data.passenger_detail.length > 0) ?
                                                                        <table className="ticket-info">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>Name</td>
                                                                                    <td>eTicket Number</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {bookingData.data.passenger_detail.map((pax) => {
                                                                                    return (
                                                                                        <tr key={Math.random()}>
                                                                                            <td>{pax.title + '. ' + pax.name}</td>
                                                                                            {
                                                                                                (pax.ticket_number !== '') ?
                                                                                                    <td>{pax.ticket_number}</td>
                                                                                                :
                                                                                                    <td>----------</td>
                                                                                            }
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    :
                                                                        ''
                                                                }
                                                                {/* <h4 className="service">Class of Service: <span>{query.cabinClass.label}</span></h4> */}
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            :
                                                ''
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
                                {/* <PDFViewer style={{ width: '100%', height: '1300px' }}>
                                    <Document bookingData={bookingData} firstSegment={firstSegment} lastSegment={lastSegment} 
                                        originCity={originCity} destinationCity={destinationCity} totalFlightTime={totalFlightTime} 
                                        totalStops={totalStops} round={round} ticketing={ticketing} />
                                </PDFViewer> */}
                            </div>
                            {/* Bootstrap Cancel Modal */}
                            {
                                (showModal) &&
                                    <CancelModal ModalToggle={ModalToggle} showModal={showModal} setCancel={setCancel} loadings={loadings} cancelRes={cancelRes} />
                            }
                        </ConfirmParent>
                    </ErrorBoundary>
                :
                    <FailedBooking className="d-flex flex-column">
                        <h4>Booking Unsuccessful. Please Try Again.</h4>
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