import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';
import BlueArrow from '../../../../assets/img/PDFBlueArrow.jpg';
import PlaneIcon from '../../../../assets/img/pdfPlane.jpg';
import Logo from '../../../../assets/img/logo.png';
import { toUpper } from 'lodash';
import {styles} from './../wrapper/ConfirmPaymentStyle';
import Invoice from './PaymentInvoice';
import { diff_minutes, time_convert, date_convert, utc_convert, TimeZone } from '../../../../helper/ConvertFunctions';

const MyDocument = ({bookingData, creationDate, totalStops, totalFlightTime, firstSegment, lastSegment, round, QueryCity, InvoiceData}) => (
    <Document>
        <Invoice InvoiceData={InvoiceData} />
        <Page size="A4" style={{paddingTop: 25, paddingBottom: 25, paddingLeft: 25, paddingRight: 25,}}>
            {/* Success Header */}
            <View style={styles.head}>
                <View style={styles.PDFHead}>
                    <Image style={styles.Logo} src={Logo} />
                    <Text style={styles.heading}>E-Ticket Reservation</Text>
                    <Text style={styles.link}>https://foureflights.com/</Text>
                </View>
                <Text style={styles.line}/>
                {/* PAX Info */}
                <View style={styles.PAXInfo}>
                    <Text style={styles.left}>Passenger: {bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</Text>
                    <Text style={styles.right}>Nationality: {toUpper(bookingData.data.passenger_detail[0].nationality)}</Text>
                    <Text style={styles.left}>PNR Creation Date: {creationDate.slice(0, 15)}</Text>
                    <Text style={styles.right}>Booking Reference (PNR): {bookingData.data.galilo_pnr}</Text>
                    <Text style={styles.left}>Issuing Agent: Bukhari Travel Services</Text>
                    <Text style={styles.right}>IATA Number: 27303054</Text>
                    <Text style={styles.left}>Passport Number: {toUpper(bookingData.data.passenger_detail[0].passport_number)}</Text>
                    <Text style={styles.right}>Passport Expiry: {bookingData.data.passenger_detail[0].exp_day + ' ' + bookingData.data.passenger_detail[0].exp_month + ' ' + bookingData.data.passenger_detail[0].exp_year }</Text>
                    <Text style={styles.left}>Fare: {InvoiceData.price}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.flightDetailsHead}>Flight Details</Text>
                </View>
                <View>
                    <View style={styles.flightDetailsParent}>
                        <View style={styles.flight}>
                            <Text>{firstSegment.origin_city_name}</Text>
                            <Text>To</Text>
                            <Text>{lastSegment.destination_city_name}</Text>
                        </View>
                        <Image src={PlaneIcon} style={styles.Plane} />
                        <View style={styles.Departure}>
                            <Text style={styles.ParentDeptStatus}>Departure</Text>
                            <Text style={styles.ParentDeptTime}>{utc_convert(firstSegment.DepartureTime)}</Text>
                            <Text>{TimeZone( firstSegment.DepartureTime)}</Text>
                            <Text>{date_convert( firstSegment.DepartureTime)}</Text>
                        </View>
                        <View style={styles.FlightInfo}>
                            <Text style={styles.ParentStops}>{(totalStops === 0) ? 'Direct Flight' : (totalStops > 1 ) ? totalStops + ' Stops' : totalStops + ' Stop'}</Text>
                            <Image style={styles.ParentArrow} src={BlueArrow}  />
                            <Text>Total Flight Time:{' ' + time_convert(totalFlightTime) }</Text>
                            <Text style={{display: (round) ? 'block' : 'none'}}>{(round) ? 'Round-Trip' : ''}</Text>
                        </View>
                        <View style={styles.Arrival}>
                            <Text style={styles.ParentArrStatus}>Arrival</Text>
                            <Text style={styles.ParentArrTime}>{utc_convert(lastSegment.ArrivalTime)}</Text>
                            <Text style={styles.ParentArrDate}>{TimeZone(lastSegment.ArrivalTime)}</Text>
                            <Text style={styles.ParentArrDate}>{date_convert(lastSegment.ArrivalTime)}</Text>
                        </View>
                    </View>
                </View>                

                {
                    bookingData.data.segments.map((segment, index) => {
                        let originCity = segment.origin_city_name.split(',');
                        let destinationCity = segment.destination_city_name.split(',');
                        return(
                            <View style={styles.flightsParent} key={Math.random()}>
                                <View style={styles.RouteDateRow}>
                                    <Text style={styles.dateTime}>
                                        {date_convert(segment.DepartureTime)} - {originCity[0]}<Text style={{color: '#FF9800'}}> To </Text>{destinationCity[0]}
                                    </Text>
                                </View>
                                <View style={styles.flightDetails}>
                                    <View style={styles.flightDetailsParent}>
                                        <View style={styles.Carrier}>
                                            <Image style={styles.AirlineLogo} src={require('./../../../../assets/img/airline_logo/'+segment.Carrier+'.png')} />
                                            <Text>   </Text>
                                            <Text style={styles.AirlineName}>{segment.airline_name + ' (' + segment.Carrier + ') ' + segment.FlightNumber}</Text>
                                            <Text>     </Text>
                                        </View>
                                        <Image src={PlaneIcon} style={styles.Plane} />
                                        <View style={styles.InnerDeparture}>
                                            <Text style={styles.DeptStatus}>Departure</Text>
                                            <Text style={styles.DeptTime}>{utc_convert(segment.DepartureTime)}</Text>
                                            <Text>{TimeZone(segment.DepartureTime)}</Text>
                                            <Text>{date_convert(segment.DepartureTime)}</Text>
                                        </View>
                                        <View style={styles.InnerFlightInfo}>
                                            <Image src={BlueArrow} style={styles.arrow} />
                                        </View>
                                        <View style={styles.InnerArrival}>
                                            <Text style={styles.ArrStatus}>Arrival</Text>
                                            <Text style={styles.ArrTime}>{utc_convert(segment.ArrivalTime)}</Text>
                                            <Text>{TimeZone(segment.ArrivalTime)}</Text>
                                            <Text>{date_convert(segment.ArrivalTime)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.PAXTable}>
                                    <Text style={styles.PAXTableHead}>Passengers</Text>
                                </View>
                                <View style={styles.tableParent}>
                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell, styles.tableHead}>Name</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell, styles.tableHead}>eTicket Number</Text>
                                            </View>
                                        </View>
                                        {
                                            bookingData.data.passenger_detail.map((pax) => {
                                                return (
                                                    <View style={styles.tableRow} key={Math.random()}>
                                                        <View style={styles.tableCol}>
                                                            <Text style={styles.tableCell}>{pax.lastName+', '+pax.firstName+' '+pax.title+'.'}</Text>
                                                         </View>
                                                         <View style={styles.tableCol}>
                                                            <Text style={styles.tableCell}>----------</Text>
                                                         </View>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                    <Text style={styles.service}>Class of Service: {(segment.CabinClass) ? segment.CabinClass : bookingData.data.cabinClass.cabin}</Text>
                                    <View style={{display: (bookingData.data.segments.length > 1 && bookingData.data.segments.length-1!=index) ? 'block': 'none'}}>
                                        <Text style={styles.service}>
                                            {
                                                (bookingData.data.segments.length > 1 && bookingData.data.segments.length-1!=index && segment.destination_city_name.indexOf(QueryCity[0]) == -1) ?
                                                    'Waiting Time: '+ diff_minutes(segment.ArrivalTime, bookingData.data.segments[(index+1 == bookingData.data.segments.length) ? bookingData.data.segments.length-1 : index+1].DepartureTime)
                                                : 
                                                    <Text />
                                        }
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        );
                    })
                }
                <View>
                    <Text style={styles.greeting}>We wish you a safe journey.</Text>
                </View>
                <View>
                    <Text style={styles.agent_head}>Agent Details</Text>
                    <Text style={styles.agent_address}>BUKHARI TRAVEL SERVICES</Text>
                    <Text style={styles.agent_address}>2-Mohammadi Plaza, Blue Area, Islamabad</Text>
                    <Text style={styles.agent_address}>Pakistan</Text>
                    <Text style={styles.agent_address}>Phone: +92-51-28282562</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
