import React from 'react';
import { Document, Page, Text, Image, View } from '@react-pdf/renderer';
import BlueArrow from '../../../../assets/img/PDFBlueArrow.jpg';
import PlaneIcon from '../../../../assets/img/pdfPlane.jpg';
import Logo from '../../../../assets/img/logo.png';
import { styles } from './../wrapper/ConfirmPaymentStyle';
import Invoice from './PaymentInvoice';
import { time_convert, date_convert } from '../../../../helper/ConvertFunctions';

const MyDocument = ({ bookingData, firstSegment, lastSegment, originCity, destinationCity, creationDate, totalStops, totalFlightTime, query, round, InvoiceData}) => (
    <Document>
        <Invoice InvoiceData={InvoiceData} />
        <Page size="A4" style={{ paddingTop: 25, paddingBottom: 25, paddingLeft: 25, paddingRight: 25 }}>
            {/* Success Header */}
            <View style={styles.head}>
                <View style={styles.PDFHead}>
                    <Image style={styles.Logo} src={Logo} />
                    <Text style={styles.heading}>E-Ticket Reservation</Text>
                    <Text style={styles.link}>https://foureflights.com/</Text>
                </View>
                <Text style={styles.line} />
                {/* PAX Info */}
                <View style={styles.PAXInfo}>
                    <Text style={styles.left}>Passenger: {bookingData.data.passenger_detail[0].title + ". " + bookingData.data.passenger_detail[0].firstName + " " + bookingData.data.passenger_detail[0].lastName}</Text>
                    {
                        (bookingData.data.passenger_detail[0].cnic != null && bookingData.data.passenger_detail[0].cnic.trim().length > 0) ?
                            <>
                                <Text style={styles.right}>Nationality: PK</Text>
                                <Text style={styles.left}>PNR Creation Date: {creationDate.slice(0, 15)}</Text>
                                <Text style={styles.right}>Booking Reference (PNR): {bookingData.data.pnr}</Text>
                                <Text style={styles.left}>Issuing Agent: Bukhari Travel Services</Text>
                                <Text style={styles.right}>IATA Number: 27303054</Text>
                                <Text style={styles.left}>CNIC: {bookingData.data.passenger_detail[0].cnic}</Text>
                            </>
                            
                        :
                            <>
                                <Text style={styles.right}>PNR Creation Date: {creationDate.slice(0, 15)}</Text>
                                <Text style={styles.left}>Booking Reference (PNR): {bookingData.data.pnr}</Text>
                                <Text style={styles.right}>Issuing Agent: Bukhari Travel Services</Text>
                                <Text style={styles.left}>IATA Number: 27303054</Text>
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
                            <Text style={styles.ParentDeptTime}>{firstSegment.DEPARTURE_TIME}</Text>
                            <Text>{date_convert(firstSegment.DEPARTURE_DATE)}</Text>
                        </View>
                        <View style={styles.FlightInfo}>
                            <Text style={styles.ParentStops}>{(totalStops === 0) ? 'Direct Flight' : (totalStops === 1) ? '1 Stop' : totalStops + ' Stops'}</Text>
                            <Image style={styles.ParentArrow} src={BlueArrow} />
                            <Text>Total Flight Time:{' ' + time_convert(totalFlightTime)}</Text>
                            <Text style={{display: (round) ? 'block' : 'none'}}>{(round) ? 'Round-Trip' : ''}</Text>
                        </View>
                        <View style={styles.Arrival}>
                            <Text style={styles.ParentArrStatus}>Arrival</Text>
                            <Text style={styles.ParentArrTime}>{firstSegment.ARRIVAL_TIME}</Text>
                            <Text style={styles.ParentArrDate}>{date_convert(firstSegment.DEPARTURE_DATE)}</Text>
                        </View>
                    </View>
                </View>

                {
                    originCity = firstSegment.origin_city_name.split(','),
                    destinationCity = firstSegment.Destination_city_name.split(','),
                    <View style={styles.flightsParent}>
                        <View style={styles.RouteDateRow}>
                            <Text style={styles.dateTime}>
                                {firstSegment.DEPARTURE_TIME} - {originCity[0]}<Text style={{ color: '#FF9800' }}> To </Text>{destinationCity[0]}
                            </Text>
                        </View>

                        <View style={styles.flightDetails}>
                            <View style={styles.flightDetailsParent}>
                                <View style={styles.Carrier}>
                                    <Image style={styles.AirlineLogo} src={require('./../../../../assets/img/airline_logo/'+firstSegment.FlightNumber.slice(0, 2)+'.png')} />
                                    <Text>   </Text>
                                    <Text style={styles.AirlineName}>{firstSegment.airline_name + ' (' + firstSegment.FlightNumber.slice(0, 2) + ') ' + firstSegment.FlightNumber.slice(2)}</Text>
                                    <Text>     </Text>
                                </View>
                                <Image src={PlaneIcon} style={styles.Plane} />
                                <View style={styles.InnerDeparture}>
                                    <Text style={styles.DeptStatus}>Departure</Text>
                                    <Text style={styles.DeptTime}>{firstSegment.DEPARTURE_TIME}</Text>
                                    <Text>{date_convert(firstSegment.DEPARTURE_DATE)}</Text>
                                </View>
                                <View style={styles.InnerFlightInfo}>
                                    <Image src={BlueArrow} style={styles.arrow} />
                                </View>
                                <View style={styles.InnerArrival}>
                                    <Text style={styles.ArrStatus}>Arrival</Text>
                                    <Text style={styles.ArrTime}>{firstSegment.ARRIVAL_TIME}</Text>
                                    <Text>{date_convert(firstSegment.DEPARTURE_DATE)}</Text>
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
                                                    <Text style={styles.tableCell}>{pax.lastName + ', ' + pax.firstName + ' ' + pax.title + '.'}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCell}>----------</Text>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                            <Text style={styles.service}>Class of Service: {query.cabinClass.label}</Text>
                        </View>
                    </View>
                } 
                {
                    (round) ? 
                        <>
                            {
                                originCity = lastSegment.origin_city_name.split(','),
                                destinationCity = lastSegment.Destination_city_name.split(','),
                                <View style={styles.flightsParent}>
                                    <View style={styles.RouteDateRow}>
                                        <Text style={styles.dateTime}>
                                            {lastSegment.DEPARTURE_TIME} - {originCity[0]}<Text style={{ color: '#FF9800' }}> To </Text>{destinationCity[0]}
                                        </Text>
                                    </View>

                                    <View style={styles.flightDetails}>
                                        <View style={styles.flightDetailsParent}>
                                            <View style={styles.Carrier}>
                                                <Image style={styles.AirlineLogo} src={require('./../../../../assets/img/airline_logo/'+lastSegment.FlightNumber.slice(0, 2)+'.png')} />
                                                <Text>   </Text>
                                                <Text style={styles.AirlineName}>{lastSegment.airline_name + ' (' + lastSegment.FlightNumber.slice(0, 2) + ') ' + lastSegment.FlightNumber.slice(2)}</Text>
                                                <Text>     </Text>
                                            </View>
                                            <Image src={PlaneIcon} style={styles.Plane} />
                                            <View style={styles.InnerDeparture}>
                                                <Text style={styles.DeptStatus}>Departure</Text>
                                                <Text style={styles.DeptTime}>{lastSegment.DEPARTURE_TIME}</Text>
                                                <Text>{date_convert(lastSegment.DEPARTURE_DATE)}</Text>
                                            </View>
                                            <View style={styles.InnerFlightInfo}>
                                                <Image src={BlueArrow} style={styles.arrow} />
                                            </View>
                                            <View style={styles.InnerArrival}>
                                                <Text style={styles.ArrStatus}>Arrival</Text>
                                                <Text style={styles.ArrTime}>{lastSegment.ARRIVAL_TIME}</Text>
                                                <Text>{date_convert(lastSegment.DEPARTURE_DATE)}</Text>
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
                                                                <Text style={styles.tableCell}>{pax.lastName + ', ' + pax.firstName + ' ' + pax.title + '.'}</Text>
                                                            </View>
                                                            <View style={styles.tableCol}>
                                                                <Text style={styles.tableCell}>----------</Text>
                                                            </View>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>
                                        <Text style={styles.service}>Class of Service: {query.cabinClass.label}</Text>
                                    </View>
                                </View>
                            }
                        </> 
                    :
                        <Text></Text>
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