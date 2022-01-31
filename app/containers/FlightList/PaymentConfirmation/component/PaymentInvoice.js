import React from 'react';
import { Page, Text, Image, View } from '@react-pdf/renderer';
import Logo from '../../../../assets/img/logo.png';
import Easypaisa from '../../../../assets/img/easypaisaLogo.png';
import JazzCash from '../../../../assets/img/jazzCashLogo.png';
import { InvoiceStyles } from '../wrapper/ConfirmPaymentStyle';
import { date_convert } from '../../../../helper/ConvertFunctions';

export default function PaymentInvoice({ InvoiceData }) {
    return (
        <Page size="A4" style={InvoiceStyles.page}>
            <View style={InvoiceStyles.InvoiceHead}>
                <View style={InvoiceStyles.head}>
                    <Image style={InvoiceStyles.FoureLogo} src={Logo} />
                    <View style={InvoiceStyles.PDFHead}>
                        <Text style={InvoiceStyles.heading} />
                        <Text style={InvoiceStyles.heading}>Payment Invoice</Text>
                        <Text style={InvoiceStyles.HeadLink}>https://foureflights.com/</Text>
                    </View>
                    <View style={InvoiceStyles.PAXInfo}>
                        <Text style={InvoiceStyles.left}>Invoice #:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.invoice_id}</Text>
                        <Text style={InvoiceStyles.left}>Invoice Date:</Text>
                        <Text style={InvoiceStyles.right}>{date_convert(InvoiceData.invoice_date)}</Text>
                        <Text style={InvoiceStyles.left}>Due Date</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.due_date}</Text>
                    </View>
                    <Text style={InvoiceStyles.line} />
                    {/* PAX Info */}
                    <View style={InvoiceStyles.PAXInfo}>
                        <Text style={InvoiceStyles.left}>Booking Refrence (PNR):</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.pnr}</Text>
                        <Text style={InvoiceStyles.left}>Customer Name:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.customer_name}</Text>
                    </View>
                    <View style={InvoiceStyles.line}>
                        <Text style={InvoiceStyles.flightDetailsHead}>Flight Details</Text>
                    </View>
                    <View style={InvoiceStyles.PAXInfo}>
                        <Text style={InvoiceStyles.left}>Origin:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.origin}</Text>
                        <Text style={InvoiceStyles.left}>Destination:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.destination}</Text>
                        <Text style={InvoiceStyles.left}>Trip:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.trip}</Text>
                        <Text style={InvoiceStyles.left}>Flight:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.flight}</Text>
                        <Text style={InvoiceStyles.left}>No. of Adults:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.num_adult}</Text>
                        <Text style={InvoiceStyles.left}>No. of Children:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.num_child}</Text>
                        <Text style={InvoiceStyles.left}>No. of Infants:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.num_infant}</Text>
                    </View>
                    <View style={InvoiceStyles.line}>
                        <Text style={InvoiceStyles.flightDetailsHead}>Payment Details</Text>
                    </View>
                    <View style={InvoiceStyles.PAXInfo}>
                        <Text style={InvoiceStyles.left}>Payable Amount:</Text>
                        <Text style={InvoiceStyles.right}>{InvoiceData.price}</Text>
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
                        <Text style={InvoiceStyles.agent_address}>Failure of Complete Payment by {InvoiceData.due_date} will result in cancellation of reservation.</Text>
                    </View>
                </View>
            </View>
        </Page>
    );
}