import React, { useState, useEffect } from 'react';
import BlueArrow from '../../assets/img/BlueArrow.png';
import ErrorBoundary from './../../helper/ErrorBoundary';
import { Link } from 'react-router-dom';
import { toUpper } from 'lodash';
import { ConfirmParent, FailedBooking } from './wrapper/GetBookingStyle';
import { pdf } from '@react-pdf/renderer';
// import { PDFViewer, pdf } from '@react-pdf/renderer';
import Document from './component/AirBlueTicketPDF';
import CancelModal from './CancelModal';
import Axios from '../../utils/service';
import { diff_minutes, date_convert, utc_convert } from '../../helper/ConvertFunctions';

export default function AirblueTicket({ bookingData })
{
    const round = (bookingData.data.segments.length > 1) ? true : false;
    let totalFlightTime = 0;
    
    const firstSegment = bookingData.data.segments[0];
    const lastSegment = bookingData.data.segments[0];
    const [showModal, setShowModal] = useState(false);
    const Tickets = bookingData.data.ticketing;
    let ticketing = 'E-Reservation Information';

    if (bookingData.data.ticketing && Tickets.length > 0) 
    {
        ticketing = 'E-Ticketing Information';
    }

    const cancelObj = {
        pnr: bookingData.data.BookingReferenceID.ID,
        reservationCode: bookingData.data.BookingReferenceID.Instance,
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
    
    totalFlightTime = diff_minutes(firstSegment.DepartureDateTime, firstSegment.ArrivalDateTime);

    // PDF Print Function
    function print() {
        savePdf(<Document bookingData={bookingData} round={round} totalFlightTime={totalFlightTime} firstSegment={firstSegment} 
            lastSegment={lastSegment} Tickets={Tickets} ticketing={ticketing} />, "4E - Ticket Information.pdf");
    }

    const ModalToggle = () => {
        setShowModal(!showModal);
    }

    return (
        <ErrorBoundary>
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
                                                <p>{bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>Issuing Agent: </h4>
                                                <p>Bukhari Travel Services</p>
                                            </div>
                                            {
                                                (bookingData.data.passenger_detail[0].passport_number != null) ?
                                                    <div className="PAX-inner-row">
                                                        <h4>Passport Number: </h4>
                                                        <p>{toUpper(bookingData.data.passenger_detail[0].passport_number)}</p>
                                                    </div>
                                                :
                                                    (bookingData.data.passenger_detail[0].cnic != null) &&
                                                        <div className="PAX-inner-row">
                                                            <h4>CNIC: </h4>
                                                            <p>{bookingData.data.passenger_detail[0].cnic}</p>
                                                        </div>
                                            }
                                        </div>
                                        <div className="right">
                                            <div className="PAX-inner-row">
                                                <h4>Nationality: </h4>
                                                <p>{(bookingData.data.passenger_detail[0].cnic != null) ? 'PK' : toUpper(bookingData.data.passenger_detail[0].nationality)}</p>
                                            </div>
                                            <div className="PAX-inner-row">
                                                <h4>Booking Reference (PNR): </h4>
                                                <p>{bookingData.data.BookingReferenceID.ID}</p>
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
                                                    <h5>{utc_convert(firstSegment.DepartureDateTime)}</h5>
                                                    <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>
                                                        {date_convert(firstSegment.DepartureDateTime)}
                                                    </h5>
                                                </div>
                                                <div className="arrow">
                                                    <div>
                                                        <p>{(round) ? '2 Stops' : 'Direct Flight'}</p>
                                                        <img src={BlueArrow} alt="arrow" />
                                                        <p>{'Total Flight Time: ' + totalFlightTime }</p>
                                                        <p>{(round) ? 'Round-Trip' : ''}</p>
                                                    </div>
                                                </div>
                                                <div className="arrival">
                                                    <h4>Arrival</h4>
                                                    <h5>{utc_convert(lastSegment.ArrivalDateTime)}</h5>
                                                    <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>
                                                        {date_convert(lastSegment.ArrivalDateTime)}
                                                    </h5>
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
                                                        <h5>{utc_convert(firstSegment.DepartureDateTime)}</h5>
                                                        <h4>
                                                            {date_convert(firstSegment.DepartureDateTime)}
                                                        </h4>
                                                    </div>
                                                    <div className="arrow">
                                                        <div>
                                                            <p>{(round) ? '2 Stops' : 'Direct Flight'}</p>
                                                            <img src={BlueArrow} alt="arrow" />
                                                            <p>{'Total Flight Time: ' + totalFlightTime }</p>
                                                            <p>{(round) ? 'Round-Trip' : ''}</p>
                                                        </div>
                                                    </div>
                                                    <div className="arrival">
                                                        <h4>Arrival</h4>
                                                        <h5>{utc_convert(lastSegment.ArrivalDateTime)}</h5>
                                                        <h4>
                                                            {date_convert(lastSegment.ArrivalDateTime)}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            bookingData.data.segments.map((segment) => {
                                                let originCity = segment.origin_city_name.split(',');
                                                let destinationCity = segment.Destination_city_name.split(',');
                                                return (
                                                    <div className="flight-info" key={Math.random()}>
                                                        <div className="flight-inner-row">
                                                            <p>
                                                                <span>{date_convert(segment.DepartureDateTime)} </span>
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
                                                                        <h5>{utc_convert(segment.DepartureDateTime)}</h5>
                                                                    </div>
                                                                    <h5>{date_convert(segment.DepartureDateTime)}</h5>
                                                                </div>
                                                                <div className="arrow">
                                                                    <div>
                                                                        <img src={BlueArrow} alt="arrow" />
                                                                    </div>
                                                                </div>
                                                                <div className="arrival">
                                                                    <h4>Arrival</h4>
                                                                    <div>
                                                                        <h5>{utc_convert(segment.ArrivalDateTime)}</h5>
                                                                    </div>
                                                                    <h5>{date_convert(segment.ArrivalDateTime)}</h5>
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
                                                                        <h5>{utc_convert(segment.DepartureDateTime)}</h5>
                                                                        <h4>{date_convert(segment.DepartureDateTime)}</h4>
                                                                    </div>
                                                                    <div className="arrow">
                                                                        <div>
                                                                            <img src={BlueArrow} alt="arrow" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="arrival">
                                                                        <h4>Arrival</h4>
                                                                        <h5>{utc_convert(segment.ArrivalDateTime)}</h5>
                                                                        <h4>{date_convert(segment.ArrivalDateTime)}</h4>
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
                                                                                        <td>{pax.lastName + ', ' + pax.firstName + ' ' + pax.title + '.'}</td>
                                                                                        {
                                                                                            (Tickets[index].TicketDocumentNbr) ?
                                                                                                <td>{Tickets[index].TicketDocumentNbr}</td>
                                                                                            :
                                                                                                <td>----------</td>
                                                                                        }
                                                                                    </tr>
                                                                                );
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                            }
                                                            {/* <h4 className="service">Class of Service: <span>{cabin}</span></h4> */}
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
                                    <Document bookingData={bookingData} round={round} totalFlightTime={totalFlightTime} 
                                        firstSegment={firstSegment} lastSegment={lastSegment} Tickets={Tickets} ticketing={ticketing} />
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
        </ErrorBoundary>
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