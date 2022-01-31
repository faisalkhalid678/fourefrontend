import React, { useEffect, useState } from 'react';
import BlueArrow from '../../../assets/img/BlueArrow.png';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { Link } from 'react-router-dom';
import { toUpper } from 'lodash';
import { ConfirmParent, FailedBooking } from './wrapper/ConfirmPaymentStyle';
// import { pdf } from '@react-pdf/renderer';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import Document from './component/AirBlueTicketPDF';
import EasypaisaLogo from '../../../assets/img/Easypaisa.png';
import ComingSoon from '../../../assets/img/com.jpg'
// import date from '../../../data/dates.json';
import Axios from '../../../utils/service';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { diff_minutes, date_convert, utc_convert } from '../../../helper/ConvertFunctions';

export default function AirblueTicket({ bookingData, query })
{
    const creationDate = Date();
    const history = useHistory();

    const round = (query.legs[0].returnDate === undefined) ? false : true;
    let totalFlightTime = diff_minutes(bookingData.data.segments[0].DepartureDateTime, bookingData.data.segments[0].ArrivalDateTime);

    const cabin = query.cabinClass.label;
    const firstSegment = bookingData.data.segments[0];
    const lastSegment = bookingData.data.segments[0];

    const PNR = bookingData.data.BookingReferenceID.ID;
    const BookingInstance = bookingData.data.BookingReferenceID.Instance;
    const Price = bookingData.data.pricing_info.TotalFare.Amount;
    const LastName = bookingData.data.passenger_detail[0].lastName;

    let tickets = '';

    if (bookingData.data.ticket_details && bookingData.data.ticket_details.length > 0) {
        tickets = bookingData.data.ticket_details;
    }

    const [JazzAC, setJazzAC] = useState('');
    const [JazzPay, setJazzPay] = useState(false);
    const [PayType, setPayType] = useState('');
    const [PayResponse, setPayResponse] = useState('');
    const [TicketResponse, setTicketResponse] = useState('');
    const [Loading, setloading] = useState(true);
    const [SaleLoading, setSaleLoading] = useState(true);
    const [FailedTicketing, setFailedTicketing] = useState(false);

    useEffect(() => {
        // const PaymentAPI = '/paynow?pnr='+PNR+'&account_number='+JazzAC+'&account_type='+PayType+'&total_amount='+Price;
        const AirblueTicketAPI = '/issue-ticket-airblue?pnr=' + PNR + '&instance=' + BookingInstance + '&total_amount=' + Price;

        async function AirBlueGenerateTicket() {
            if (SaleLoading && PayResponse.status === '200') {
                Axios.get(AirblueTicketAPI)
                    .then((response) => {
                        const res = response.data;
                        setTicketResponse(res);
                        setSaleLoading(false);
                    });
            }
        }

        async function Payment() {
            if (JazzPay) {
                Axios.get('/paynow?pnr=' + PNR + '&account_number=' + JazzAC + '&account_type=' + PayType + '&total_amount=' + Price)
                    .then((response) => {
                        const res = response.data;
                        setPayResponse(res);
                        setloading(false);
                    });
            }
        }
        if (JazzPay)
        {
            Payment(JazzAC);
        }
        if (!Loading && PayResponse.status === '200')
        {
            AirBlueGenerateTicket();
        }
        if (!SaleLoading && TicketResponse.status === '200')
        {
            history.push({
                pathname: `/booking/pnr=${PNR}&last_name=${LastName}&pre=400`
            });
        }
        if ((!SaleLoading && TicketResponse.status === '400') || (!Loading && PayResponse.status === '400'))
        {
            setFailedTicketing(true);
            setJazzPay(false);
        }

    }, [JazzPay, Loading, SaleLoading]);

    const errorDivs = () => {
        if(!SaleLoading && TicketResponse.status === '400')
        {
            return (
                <>
                    <h4>Ticketing Error</h4>
                    <h4>{TicketResponse.message}</h4>
                </>
            );            
        }
        else if(!Loading && PayResponse.status === '400')
        {
            return (
                <>
                    <h4>Payment Error</h4>
                    <h4>{PayResponse.message}</h4>
                </>
            );
        }
    }

    const [PayNowChck, payNowCheck] = useState(false);
    const [PayLaterChck, payLaterCheck] = useState(true);
    const [JazzWallet, showJazzWallet] = useState(false);
    const [EasyWallet, showEasyWallet] = useState(false);
    const [card, showCard] = useState(false);

    function showPaymentFields(vals) {
        payNowCheck(vals[0]);
        payLaterCheck(vals[1]);
        showJazzWallet(vals[2]);
        showEasyWallet(vals[3]);
        showCard(vals[4]);
    }

    function JazzPaySubmit() {
        setJazzPay(true)
        setPayType('jazzcash');
    }

    let adults = (bookingData.data.PTC_FareBreakdowns[0].PassengerTypeQuantity.Code === 'ADT') ? Number(bookingData.data.PTC_FareBreakdowns[0].PassengerTypeQuantity.Quantity) : 0;
    let children = (bookingData.data.PTC_FareBreakdowns[1] && bookingData.data.PTC_FareBreakdowns[1].PassengerTypeQuantity.Code === 'CHD') ? Number(bookingData.data.PTC_FareBreakdowns[1].PassengerTypeQuantity.Quantity) : 0;
    let infants = (bookingData.data.PTC_FareBreakdowns[2] && bookingData.data.PTC_FareBreakdowns[2].PassengerTypeQuantity.Code === 'INF') ? Number(bookingData.data.PTC_FareBreakdowns[2].PassengerTypeQuantity.Quantity) : 0;

    const dueDate = date_convert(bookingData.data.ticketing[0].TicketTimeLimit) + ' ' + utc_convert(bookingData.data.ticketing[0].TicketTimeLimit);
    
    const InvoiceData = {
        invoice_id: Math.floor(100000 + Math.random() * 900000),
        invoice_date: creationDate,
        due_date: dueDate,
        pnr: PNR,
        customer_name: bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName,
        origin: firstSegment.Origin,
        destination: lastSegment.Destination,
        trip: (round) ? 'Round-Trip' : 'One-Way',
        flight: firstSegment.Carrier + '-' + firstSegment.FlightNumber,
        num_adult: adults,
        num_child: children,
        num_infant: infants,
        price: (bookingData.data.pricing_info) ? bookingData.data.pricing_info.TotalFare.CurrencyCode + ' ' + bookingData.data.pricing_info.TotalFare.Amount + '/-' : 'PKR 0',
    };

    // PDF Print Function
    function print()
    {
        savePdf(<Document bookingData={bookingData} creationDate={creationDate} round={round} totalFlightTime={totalFlightTime}
            firstSegment={firstSegment} lastSegment={lastSegment} cabin={cabin} tickets={tickets} InvoiceData={InvoiceData} />, 
            "4E - Ticket Information.pdf");
    }
    return (
        <ErrorBoundary>
            {
                (bookingData.status && bookingData.status != '400') ?
                    <ErrorBoundary>
                        <ConfirmParent>
                            {
                                (JazzPay) ?
                                    <div className="main">
                                        <div className="text-center">
                                            <h3>Please be Patient! We are Generating your Ticket</h3>
                                            <Loader type="Plane" color="#378edd" height={200} width={300} />
                                        </div>
                                    </div>
                                :
                                    (!FailedTicketing) ?
                                        <div className="main">
                                            {/* Payment Info Start */}
                                            <div className="foot container" style={{ border: '2px solid #378edd', padding: '25px' }}>
                                                <div className="PayInfo">
                                                    <h3>Payment Method</h3>
                                                    <h6 className="pt-2">Click on Pay Later to View Reservation</h6>
                                                    <div className="d-flex mt-3 mb-3 justify-content-center">
                                                        <div className="col-sm-6 col-md-3 col-lg-3">
                                                            <div className="d-flex flex-row">
                                                                <input type="radio" id="paynow" name="pay" value="PayNow" onChange={showPaymentFields.bind(this, [true, false, true, false, false])} checked={PayNowChck} />
                                                                <label htmlFor="paynow" className="pay-label">Pay Now</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-3 col-lg-3">
                                                            <div className="d-flex flex-row">
                                                                <input type="radio" id="paylater" name="pay" value="PayLater" onChange={showPaymentFields.bind(this, [false, true, false, false, false])} checked={PayLaterChck} />
                                                                <label htmlFor="paylater" className="pay-label">Pay Later</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (PayNowChck) &&
                                                            <div className="row justify-content-center mb-3">
                                                                <div className="col-sm-4 col-md-4 col-lg-4 d-flex">
                                                                    <div className="d-flex flex-row col-12">
                                                                        <input type="radio" id="jazzcash" name="method" value="Jazzcash" onChange={showPaymentFields.bind(this, [true, false, true, false, false])} checked={JazzWallet} />
                                                                        <label className="pay-label" htmlFor="jazzcash" >JazzCash</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-4 col-lg-4 d-flex">
                                                                    <div className="d-flex flex-row col-12">
                                                                        <input type="radio" id="easypaisa" name="method" value="Easypaisa" onChange={showPaymentFields.bind(this, [true, false, false, true, false])} />
                                                                        <label className="pay-label" htmlFor="easypaisa">EasyPaisa</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-4 col-lg-4 d-flex">
                                                                    <div className="d-flex flex-row col-12">
                                                                        <input type="radio" id="card" name="method" value="Card" onChange={showPaymentFields.bind(this, [true, false, false, false, true])} />
                                                                        <label className="pay-label" htmlFor="card">Credit / Debit Card</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                    {
                                                        (card && PayNowChck) &&
                                                            <>
                                                                {/* <div className="row justify-content-center">
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="ACTitle" className="label">Account Title</label>
                                                                        <input type="text" id="ACTitle" name="title" placeholder="Enter A/C Title" />
                                                                        {/* <label className="warning text-danger">* Account Title is required.</label> 
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="CardNmbr" className="">Credit / Debit Card Number</label>
                                                                        <input type="text" id="CardNmbr" name="card" placeholder="Enter Card Number" />
                                                                        {/* <label className="warning text-danger">* Card Number is required.</label> 
                                                                    </div>
                                                                </div>
                                                                <div className="row justify-content-center">
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="CVV" className="">CVV Number</label>
                                                                        <input type="number" id="CVV" name="CVV" placeholder="Enter CVV Number" />
                                                                        {/* <label className="warning text-danger">* CVV Name is required.</label> 
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label htmlFor="CVV" className="">Card Expiry</label>
                                                                        <div className="dates">
                                                                            <select name="card_exp_month" >
                                                                                <option value="">Month</option>
                                                                                {date.month.map((month) => <option value={month} key={Math.random()}>{month}</option>)}
                                                                            </select>
                                                                            <select name="card_exp_year" >
                                                                                <option value="">Year</option>
                                                                                {date.yearExpiry.map((expiry) => <option value={expiry} key={Math.random()}>{expiry}</option>)}
                                                                            </select>
                                                                        </div>
                                                                        {/* <label className="warning text-danger">* Card Expiry is required.</label> 
                                                                    </div>
                                                                </div> */}
                                                                <div className="row justify-content-center">
                                                                    <img src={ComingSoon} className="cmng-soon w-50" />
                                                                </div>
                                                            </>
                                                    }
                                                    {
                                                        (EasyWallet && PayNowChck) &&
                                                            <div className="row justify-content-center">
                                                                <img src={EasypaisaLogo} className="cmng-soon" />
                                                            </div>
                                                    }
                                                    {
                                                        (JazzWallet && PayNowChck) &&
                                                            <>
                                                                {/* <div className="row justify-content-center mb-3">
                                                                    <div className="col-md-6 pt-3 pb-3">
                                                                        <input type="text" className="form-control text-dark" id="JazzACNmbr" name="JazzAccount" onChange={(event) => { setJazzAC(event.target.value) }} placeholder="Enter Account Number" />
                                                                        <label className="warning text-danger">* Card Number is required.</label> 
                                                                    </div>
                                                                </div>
                                                                <div className="row justify-content-center">
                                                                    <a onClick={JazzPaySubmit} style={{color: 'white'}}>Pay Now</a>
                                                                </div> */}
                                                                <div className="row justify-content-center mb-3">
                                                                    <img src={ComingSoon} className="cmng-soon w-50" />
                                                                </div>
                                                            </>
                                                    }
                                                    {
                                                        (PayLaterChck) &&
                                                            <>
                                                                <div className="row justify-content-center mb-3">
                                                                    <h5 className="col-sm-12 col-md-12 col-lg-4 font-weight-bold">Ticketing Time Limit: </h5>
                                                                    <p className="col-sm-12 col-md-12 col-lg-4 text-dark">{dueDate}</p>
                                                                </div>
                                                                <div className="row justify-content-center">
                                                                    <a onClick={print} style={{color: 'white', marginBottom: '10px'}}>Download Reservation & Invoice</a>
                                                                    <Link to="/" style={{color: 'white', marginBottom: '10px'}}>Go to Home</Link>
                                                                </div>
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                            {/* Payment Method End */}
                                            {
                                                (PayLaterChck) &&
                                                    <div className="success">
                                                        <div className="success-head">
                                                            <div>
                                                                <h2>E-Ticket Reservation</h2>
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
                                                                    <h4>PNR Creation Date: </h4>
                                                                    <p>{creationDate.slice(0, 15)}</p>
                                                                </div>
                                                                <div className="PAX-inner-row">
                                                                    <h4>Issuing Agent: </h4>
                                                                    <p>Bukhari Travel Services</p>
                                                                </div>
                                                                {
                                                                    (bookingData.data.passenger_detail[0].passport_number && bookingData.data.passenger_detail[0].passport_number != null) &&
                                                                        <div className="PAX-inner-row">
                                                                            <h4>Passport Number: </h4>
                                                                            <p>{toUpper(bookingData.data.passenger_detail[0].passport_number)}</p>
                                                                        </div>
                                                                }
                                                            </div>
                                                            <div className="right">
                                                                {
                                                                    (bookingData.data.passenger_detail[0].nationality && bookingData.data.passenger_detail[0].nationality != null) &&
                                                                        <div className="PAX-inner-row">
                                                                            <h4>Nationality: </h4>
                                                                            <p>{toUpper(bookingData.data.passenger_detail[0].nationality)}</p>
                                                                        </div>
                                                                }
                                                                <div className="PAX-inner-row">
                                                                    <h4>Booking Reference (PNR): </h4>
                                                                    <p>{bookingData.data.BookingReferenceID.ID}</p>
                                                                </div>
                                                                <div className="PAX-inner-row">
                                                                    <h4>IATA Number: </h4>
                                                                    <p>27303054</p>
                                                                </div>
                                                                {
                                                                    (bookingData.data.passenger_detail[0].cnic && bookingData.data.passenger_detail[0].cnic != null && bookingData.data.passenger_detail[0].cnic != '_____-_______-_') &&
                                                                        <div className="PAX-inner-row">
                                                                            <h4>CNIC: </h4>
                                                                            <p>{bookingData.data.passenger_detail[0].cnic}</p>
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
                                                                        <p>{firstSegment.Destination_city_name}</p>
                                                                    </div>
                                                                    <div className="plane">
                                                                        <i className="fas fa-plane"></i>
                                                                    </div>
                                                                    <div className="depart">
                                                                        <h4>Departure</h4>
                                                                        <h5>{utc_convert(firstSegment.DepartureDateTime)}</h5>
                                                                        <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>{date_convert(firstSegment.DepartureDateTime)}</h5>
                                                                    </div>
                                                                    <div className="arrow">
                                                                        <div>
                                                                            <p>{(round) ? '2 Stops' : 'Direct Flight'}</p>
                                                                            <img src={BlueArrow} alt="arrow" />
                                                                            <p>{'Total Flight Time: ' + totalFlightTime}</p>
                                                                            <p>{(round) ? 'Round-Trip' : ''}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="arrival">
                                                                        <h4>Arrival</h4>
                                                                        <h5>{utc_convert(lastSegment.ArrivalDateTime)}</h5>
                                                                        <h5 style={{flexBasis: 'unset', fontSize: 'unset' }}>{date_convert(lastSegment.ArrivalDateTime)}</h5>
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
                                                                            <h4>{date_convert(firstSegment.DepartureDateTime)}</h4>
                                                                        </div>
                                                                        <div className="arrow">
                                                                            <div>
                                                                                <p>{(round) ? '2 Stops' : 'Direct Flight'}</p>
                                                                                <img src={BlueArrow} alt="arrow" />
                                                                                <p>{'Total Flight Time: ' + totalFlightTime}</p>
                                                                                <p>{(round) ? 'Round-Trip' : ''}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="arrival">
                                                                            <h4>Arrival</h4>
                                                                            <h5>{utc_convert(lastSegment.ArrivalDateTime)}</h5>
                                                                            <h4>{date_convert(lastSegment.ArrivalDateTime)}</h4>
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
                                                                                        <p><span style={{textTransform: 'capitalize'}}>{segment.airline_name}</span>{' (' + segment.Carrier + ') ' + segment.FlightNumber}</p>
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
                                                                                                            {
                                                                                                                (!(tickets && tickets.length > 0)) &&
                                                                                                                <td>{pax.lastName + ', ' + pax.firstName + ' ' + pax.title + '.'}</td>
                                                                                                            }
                                                                                                            {
                                                                                                                (tickets && tickets.length > 0) ?
                                                                                                                    <>
                                                                                                                        <td>{tickets[index].lastName + ', ' + tickets[index].firstName + ' ' + tickets[index].title + '.'}</td>
                                                                                                                        <td>{tickets[index].ticket_number}</td>
                                                                                                                    </>
                                                                                                                    :
                                                                                                                    <td>----------</td>
                                                                                                            }
                                                                                                        </tr>
                                                                                                    );
                                                                                                })}
                                                                                            </tbody>
                                                                                        </table>
                                                                                }
                                                                                <h4 className="service">Class of Service: <span>{query.cabinClass.label}</span></h4>
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
                                            }
                                            {/* <PDFViewer style={{width: '100%', height: '1300px'}}>
                                                <Document bookingData={bookingData} creationDate={creationDate} round={round} 
                                                    totalFlightTime={totalFlightTime} firstSegment={firstSegment} lastSegment={lastSegment}
                                                    cabin={cabin} tickets={tickets} InvoiceData={InvoiceData} />
                                            </PDFViewer> */}
                                        </div>
                                    :
                                        <FailedBooking className="d-flex flex-column ml-auto mr-auto">
                                            {errorDivs()}
                                            <h5>Reservation Details have been Emailed to you.</h5>
                                            <div className="foot">
                                                <Link to="/">Go to Home</Link>
                                            </div>
                                        </FailedBooking>
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