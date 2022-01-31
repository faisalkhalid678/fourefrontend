import React from 'react';
import { PDFViewer, Document, Page, Text, Image, View } from '@react-pdf/renderer';
import Logo from '../assets/img/logo.png';
import Easypaisa from '../assets/img/easypaisaLogo.png';
import JazzCash from '../assets/img/jazzCashLogo.png';
import { InvoiceStyles } from './FlightList/PaymentConfirmation/wrapper/ConfirmPaymentStyle';

const Invoice = () => {
    const data = {
        invoice_id: '123456',
        invoice_date: '08 October 2021',
        due_date: '08 October 2021',
        PNR: 'A1B2C3',
        customer_name: 'Mr' + '. '+ 'Usama Bin' + ' ' + 'Israr',
        Origin: 'ISB',
        Destination: 'KHI',
        trip: 'One Way',
        flight: 'PK'+'-'+'123',
        adult: 1,
        child: 0,
        infant: 0,
        price: 'PKR'+' '+'1234567890'+'/-',
    }
    return (
        <PDFViewer style={{ width: '100%', height: '1300px' }}>
            <Document>
                <Page size="A4" orientation="portrait" style={InvoiceStyles.page}>
                    <View style={InvoiceStyles.InvoiceHead}>
                        <View style={InvoiceStyles.head}>
                            <View style={InvoiceStyles.PDFHead}>
                                <Image style={InvoiceStyles.FoureLogo} src={Logo} />
                                <Text style={InvoiceStyles.heading}>Payment Invoice</Text>
                                <Text style={InvoiceStyles.HeadLink}>https://foureflights.com/</Text>
                            </View>
                            <View style={InvoiceStyles.PAXInfo}>
                                <Text style={InvoiceStyles.left}>Invoice #:</Text>
                                <Text style={InvoiceStyles.right}>{data.invoice_id}</Text>
                                <Text style={InvoiceStyles.left}>Invoice Date:</Text>
                                <Text style={InvoiceStyles.right}>{data.invoice_date}</Text>
                                <Text style={InvoiceStyles.left}>Due Date</Text>
                                <Text style={InvoiceStyles.right}>{data.due_date}</Text>
                            </View>
                            <Text style={InvoiceStyles.line} />
                            {/* PAX Info */}
                            <View style={InvoiceStyles.PAXInfo}>
                                <Text style={InvoiceStyles.left}>Booking Refrence (PNR):</Text>
                                <Text style={InvoiceStyles.right}>{data.PNR}</Text>
                                <Text style={InvoiceStyles.left}>Customer Name:</Text>
                                <Text style={InvoiceStyles.right}>{data.customer_name}</Text>
                            </View>
                            <View style={InvoiceStyles.line}>
                                <Text style={InvoiceStyles.flightDetailsHead}>Flight Details</Text>
                            </View>
                            <View style={InvoiceStyles.PAXInfo}>
                                <Text style={InvoiceStyles.left}>Origin:</Text>
                                <Text style={InvoiceStyles.right}>{data.Origin}</Text>
                                <Text style={InvoiceStyles.left}>Destination:</Text>
                                <Text style={InvoiceStyles.right}>{data.Destination}</Text>
                                <Text style={InvoiceStyles.left}>Trip:</Text>
                                <Text style={InvoiceStyles.right}>{data.trip}</Text>
                                <Text style={InvoiceStyles.left}>Flight:</Text>
                                <Text style={InvoiceStyles.right}>{data.flight}</Text>
                                <Text style={InvoiceStyles.left}>No. of Adults:</Text>
                                <Text style={InvoiceStyles.right}>{data.adult}</Text>
                                <Text style={InvoiceStyles.left}>No. of Children:</Text>
                                <Text style={InvoiceStyles.right}>{data.child}</Text>
                                <Text style={InvoiceStyles.left}>No. of Infants:</Text>
                                <Text style={InvoiceStyles.right}>{data.infant}</Text>
                            </View>
                            <View style={InvoiceStyles.line}>
                                <Text style={InvoiceStyles.flightDetailsHead}>Payment Details</Text>
                            </View>
                            <View style={InvoiceStyles.PAXInfo}>
                                <Text style={InvoiceStyles.left}>Payable Amount:</Text>
                                <Text style={InvoiceStyles.right}>{data.price}</Text>
                            </View>
                            <View style={InvoiceStyles.line}>
                                <Text style={InvoiceStyles.flightDetailsHead}>Account Information</Text>
                            </View>
                            <View style={InvoiceStyles.PAXInfo}>
                                <View style={InvoiceStyles.ACRow}>
                                    <Text style={InvoiceStyles.left}>A/C Title:</Text>
                                    <Text style={InvoiceStyles.ACTitle}>Bukhari Travel Services Pvt. Ltd.</Text>
                                </View>
                                <Image style={InvoiceStyles.Logo} src={Easypaisa} />
                                <Text style={InvoiceStyles.right}>0301-5438343</Text>
                                <Image style={InvoiceStyles.Logo} src={JazzCash} />
                                <Text style={InvoiceStyles.right}>0326-8949336</Text>
                            </View>
                            <View style={InvoiceStyles.line}>
                                <Text style={InvoiceStyles.flightDetailsHead}>Note</Text>
                            </View>
                            <View>
                                <Text style={InvoiceStyles.agent_address}>Failure of Complete Payment by 8 October 2021 will result in cancellation of reservation.</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}

export default Invoice;