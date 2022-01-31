import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';
import BlueArrow from '../../../../assets/img/PDFBlueArrow.jpg';
import PlaneIcon from '../../../../assets/img/pdfPlane.jpg';
import Logo from '../../../../assets/img/logo.png';
import { toUpper } from 'lodash';
import {styles} from './../wrapper/ConfirmPaymentStyle';
import Invoice from './PaymentInvoice';
import { date_convert, utc_convert } from '../../../../helper/ConvertFunctions';

const MyDocument = ({bookingData, creationDate, round, totalFlightTime, firstSegment, lastSegment, cabin, InvoiceData}) => (
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
                    {
                        (bookingData.data.passenger_detail[0].nationality && bookingData.data.passenger_detail[0].nationality != null) ?
                            <>
                                <Text style={styles.left}>Passenger: {bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</Text>
                                <Text style={styles.right}>Nationality: {toUpper(bookingData.data.passenger_detail[0].nationality)}</Text>
                                <Text style={styles.left}>PNR Creation Date: {creationDate.slice(0,15)}</Text>
                                <Text style={styles.right}>Booking Reference (PNR): {bookingData.data.BookingReferenceID.ID}</Text>
                                <Text style={styles.left}>Issuing Agent: Bukhari Travel Services</Text>
                                <Text style={styles.right}>IATA Number: 27303054</Text>
                                {
                                    (bookingData.data.passenger_detail[0].passport_number != null) &&
                                        <Text style={styles.left}>Passport Number: {toUpper(bookingData.data.passenger_detail[0].passport_number)}</Text>
                                }
                                {
                                    (bookingData.data.passenger_detail[0].cnic != null) &&
                                        <Text style={styles.left}>CNIC: {toUpper(bookingData.data.passenger_detail[0].cnic)}</Text>
                                }
                            </>
                        :
                            <>
                                <Text style={styles.left}>Passenger: {bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</Text>
                                <Text style={styles.right}>PNR Creation Date: {creationDate.slice(0,15)}</Text>
                                <Text style={styles.left}>Booking Reference (PNR): {bookingData.data.BookingReferenceID.ID}</Text>
                                <Text style={styles.right}>Issuing Agent: Bukhari Travel Services</Text>
                                <Text style={styles.left}>IATA Number: 27303054</Text>
                                {
                                    (bookingData.data.passenger_detail[0].passport_number != null) &&
                                        <Text style={styles.right}>Passport Number: {toUpper(bookingData.data.passenger_detail[0].passport_number)}</Text>
                                }
                                {
                                    (bookingData.data.passenger_detail[0].cnic != null) &&
                                        <Text style={styles.right}>CNIC: {toUpper(bookingData.data.passenger_detail[0].cnic)}</Text>
                                }
                            </>
                    }
                </View>
                <View style={styles.line}>
                    <Text style={styles.flightDetailsHead}>Flight Details</Text>
                </View>
                <View>
                    <View style={styles.flightDetailsParent}>
                        <View style={styles.flight}>
                            <Text>{firstSegment.origin_city_name}</Text>
                            <Text>To</Text>
                            <Text>{firstSegment.Destination_city_name}</Text>
                        </View>
                        <Image src={PlaneIcon} style={styles.Plane} />
                        <View style={styles.Departure}>
                            <Text style={styles.ParentDeptStatus}>Departure</Text>
                            <Text style={styles.ParentDeptTime}>{utc_convert(firstSegment.DepartureDateTime)}</Text>
                            <Text>{date_convert(firstSegment.DepartureDateTime)}</Text>
                        </View>
                        <View style={styles.FlightInfo}>
                            <Text style={styles.ParentStops}>{(round) ? '2 Stops' : 'Direct Flight'}</Text>
                            <Image style={styles.ParentArrow} src={BlueArrow}  />
                            <Text>Total Flight Time:{' ' + totalFlightTime }</Text>
                            <Text style={{display: (round) ? 'block' : 'none'}}>{(round) ? 'Round-Trip' : ''}</Text>
                        </View>
                        <View style={styles.Arrival}>
                            <Text style={styles.ParentArrStatus}>Arrival</Text>
                            <Text style={styles.ParentArrTime}>{utc_convert(lastSegment.ArrivalDateTime)}</Text>
                            <Text style={styles.ParentArrDate}>{date_convert(lastSegment.ArrivalDateTime)}</Text>
                        </View>
                    </View>
                </View>                

                {
                    bookingData.data.segments.map((segment) => {
                        let originCity = segment.origin_city_name.split(',');
                        let destinationCity = segment.Destination_city_name.split(',');
                        return(
                            <View key={Math.random()} style={styles.flightsParent}>
                                <View style={styles.RouteDateRow}>
                                    <Text style={styles.dateTime}>
                                        {date_convert(segment.DepartureDateTime)} - {originCity[0]}<Text style={{color: '#FF9800'}}> To </Text>{destinationCity[0]}
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
                                            <Text style={styles.DeptTime}>{utc_convert(segment.DepartureDateTime)}</Text>
                                            <Text>{date_convert(segment.DepartureDateTime)}</Text>
                                        </View>
                                        <View style={styles.InnerFlightInfo}>
                                            <Image src={BlueArrow} style={styles.arrow} />
                                        </View>
                                        <View style={styles.InnerArrival}>
                                            <Text style={styles.ArrStatus}>Arrival</Text>
                                            <Text style={styles.ArrTime}>{utc_convert(segment.ArrivalDateTime)}</Text>
                                            <Text>{date_convert(segment.ArrivalDateTime)}</Text>
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
                                    <Text style={styles.service}>Class of Service: {cabin}</Text>
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