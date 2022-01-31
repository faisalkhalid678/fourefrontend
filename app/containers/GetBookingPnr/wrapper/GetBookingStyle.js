import styled from 'styled-components';
import { StyleSheet } from '@react-pdf/renderer';

export const ConfirmParent = styled.div`
    width: 100%;
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    overflow: hidden;
    margin-top: 5%;
    .main
    {
        flex-basis: 100%;
        padding: 10px;
        .success, .failure
        {
            width: 60%;
            text-align: center;
            margin: auto;
        }
        
        .success
        {
            padding: 0px 5%;
            width: 100% !important;
            hr
            {
                margin: 30px 0px 30px 0px;
            }
            h3
            {
                font-size: 25px;
                margin-bottom: 30px;
            }
            .success-head
            {
                display: flex;
                flex-direction: row;
                width: 100%;
                *
                {
                    margin: auto;
                }
                img
                {
                    width: 15%;
                    @media(max-width: 800px)
                    {
                        width: calc(5% + 45px);
                    }
                }
                h2
                {
                    padding-top: 20px;
                    @media(max-width: 800px)
                    {
                        font-size: 16px;
                    }
                }
                .PDF
                {
                    margin: auto;
                    a
                    {
                        font-size: 30px;
                        cursor: pointer;
                        span
                        {
                            font-size: 20px;
                            @media (max-width: 800px)
                            {
                                font-size: calc(5% + 15px);
                            }
                        }
                        @media(max-width: 800px)
                        {
                            display: flex;
                            flex-direction: column;
                            font-size: 20px;
                        }
                    }
                    // PDF Icon
                    .fas
                    {
                        color: #DD4C4C;
                    }
                }
            }
            .PAX-info, .flight-info
            {
                display: flex;
                width: 100%;
                text-align: left;
                margin-bottom: 30px;
            }
            .PAX-info
            {
                flex-direction: row;
                .left, .right
                {
                    flex-basis: 50%;
                    flex-direction: column;
                    .PAX-inner-row
                    {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 10px;
                        h4,p 
                        {
                            color: black;
                            font-size: 16px;
                        }
                        h4
                        {
                            font-weight: bold;
                        }
                        *
                        {
                            flex-basis: 50%;
                            margin-top: auto;
                            margin-bottom: auto;
                        }
                    }
                    @media(max-width: 800px)
                    {
                        flex-basis: 100%;
                    }
                }
                @media(max-width: 800px)
                {
                    flex-direction: column;
                    padding-left: 10%;
                }
            }
            .flight-info-head
            {
                padding: 15px;
                justify-content: center;
                text-align: center;
                .inner-head-desktop
                {
                    display: flex;
                    flex-direction: row;
                    .plane, .arrow 
                    {
                        flex-basis: 20%;
                    }
                    .flight
                    {
                        flex-basis: 30%;
                        font-weight: bold;
                        *
                        {
                            margin-bottom: 5px;
                        }
                    }
                    .plane
                    {
                        text-align: center;
                        i
                        {
                            font-size: 50px;
                            color: #FCB040;
                        }
                    }
                    .depart, .arrival
                    {
                        flex-basis: 15%;
                        text-align: left;
                        h5
                            {
                                flex-basis: 45%;
                                font-size: 40px;
                            }
                    }
                    .arrow
                    {
                        text-align: center;
                        p
                        {
                            margin-left: 5px;
                        }
                        img
                        {
                            width: 50%;
                        }
                    }
                    @media(max-width: 800px)
                    {
                        display: none;
                    }
                }
                .inner-head-mobile
                {
                    display: none;
                    flex-direction: column;
                    .flight
                    {
                        flex-basis: 100%;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 30px;
                        *
                        {
                            margin-bottom: 5px;
                        }
                    }
                    .depart-arrive
                    {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        .depart, .arrival
                        {
                            flex-basis: 30%;
                            text-align: center;
                            h4
                            {
                                font-size: calc(5% + 15px);
                            }
                            h5
                            {
                                font-size: calc(5% + 28px);
                            }
                        }
                    }
                    .arrow
                    {
                        flex-basis: 40%;
                        text-align: center;
                        p
                        {
                            margin-left: 5px;
                        }
                        img
                        {
                            width: calc(5% + 90px);
                        }
                    }
                    @media(max-width: 800px)
                    {
                        display: flex;
                    }
                }
            }
            .flight-info
            {
                flex-direction: column;
                border: 2px solid #378cdd;
                padding: 15px;
                .flight-inner-row
                {
                    display: flex;
                    flex-direction: row;
                    text-align: left;
                    flex-basis: 100%;
                    margin-bottom: 20px;
                    *
                    {
                        margin-top: auto;
                        margin-bottom: auto;
                    }
                    .flight-status
                    {
                        color: green;
                    }
                    p
                    {
                        color: black;
                        font-size: 20px;
                        @media (max-width: 800px)
                        {
                            font-size: 17px;
                        }
                    }
                    .flight-inner-row-desktop
                    {
                        display: flex;
                        flex-direction: row;
                        text-align: left;
                        flex-basis: 100%;
                        margin-bottom: 20px;
                        .airline
                        {
                            display: flex;
                            flex-basis: 30%;
                            flex-direction: row;
                            p
                            {
                                font-size: 15px;
                                font-weight: bold;
                                padding-left: 15px;
                            }
                        }
                        .plane
                        {
                            flex-basis: 11%;
                            text-align: center;
                            i
                            {
                                font-size: 50px;
                                color: #FCB040;
                            }
                        }
                        .arrow
                        {
                            flex-basis: 25%;
                            text-align: center;
                            p
                            {
                                margin-left: 5px;
                            }
                            img
                            {
                                width: 40%;
                            }
                        }
                        .depart, .arrival
                        {
                            flex-basis: 16%;
                            div
                            {
                                display: flex;
                                flex-direction: row;
                                h5
                                {
                                    font-size: 40px;
                                }
                                div
                                {
                                    display: flex;
                                    flex-direction: column;
                                    margin-top: 5px;
                                    margin-left: 5px;
                                }
                            }
                        }
                        @media(max-width: 800px)
                        {
                            display: none;
                        }
                    }
                    .flight-inner-row-mobile
                    {
                        display: none;
                        .airline
                        {
                            display: flex;
                            flex-basis: 100%;
                            flex-direction: row;
                            text-align: center;
                            img
                            {
                                flex-basis: 15%;
                            }
                            p
                            {
                                font-size: calc(5px + 10px);
                                font-weight: bold;
                                flex-basis: 42.5%;
                            }
                        }
                        .flight-inner-depart-arrive
                        {
                            display: flex;
                            flex-direction: row;
                            .arrow
                            {
                                flex-basis: 40%;
                                text-align: center;
                                p
                                {
                                    margin-left: 5px;
                                }
                                img
                                {
                                    width: 40%;
                                }
                            }
                            .depart, .arrival
                            {
                                flex-basis: 30%;
                                text-align: center;
                                h4
                                {
                                    font-size: calc(5% + 15px);
                                }
                                h5
                                {
                                    font-size: calc(5% + 28px);
                                }
                           }
                        }
                        @media(max-width: 800px)
                        {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                    
                    .PAX-head, .ticket-info, .service, .airport-head, .airport-info
                    {
                        flex-basis: 100%;
                    }
                    .ticket-info
                    {
                        *
                        {
                            border: 2px solid black;
                            padding: 5px;
                        }
                        thead
                        {
                            font-weight: bold;
                            color: black;
                        }
                        tbody
                        {
                            color: #141111;
                        }
                        
                    }
                    .service
                    {
                        span
                        {
                            font-weight: 100;
                        }
                    }
                    .airport-info
                    {
                        display: flex;
                        flex-direction: row;
                        *
                        {
                            flex-basis: 33%;
                            margin-top: auto;
                            margin-bottom: auto;
                        }
                        .to
                        {
                            text-align: center;
                        }
                    }
                }
                .flights
                {
                    flex-direction: column;
                    
                    *
                    {
                        margin-bottom: 15px;
                    }
                }
            }
            .agent
            {
                text-align: left;
                margin-bottom: 50px;
                p
                {
                    font-weight: bold; 
                }
            }
            @media (max-width: 800px)
            {
                margin: 0px;
                padding: 5px;
                width: 100%;
            }
        }
        .foot
        {
            text-align: center;
            margin-bottom: 20px;
            .foot-btn
            {
                margin-left: 5px;
                border-radius: 3px;
                text-shadow: 0px 0px 2px #776565;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                background: #378edd;
                color: #ffffff;
                padding: 12px 10px;
                border: none;
                transition: backgroung 0.5s;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
                &: hover
                {
                    background: #fcb040;
                }
                @media(max-width: 410px)
                {
                    margin-bottom: 5px;
                }
            }
            .cancel
            {
                margin-left: 5px;
                border-radius: 3px;
                // text-shadow: 0px 0px 2px #776565;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                padding: 12px 10px;
                border: none;
                transition: backgroung 0.5s;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
                @media(max-width: 410px)
                {
                    margin-bottom: 5px;
                }
            }
            @media(max-width: 410px)
            {
                display: flex;
                flex-direction: column;
            }
            .PDF
            {
                margin: auto;
                font-size: 16px;
                width: 10%;
                cursor: pointer;
                span
                {
                    font-size: 20px;
                    @media (max-width: 800px)
                    {
                        font-size: calc(5% + 15px);
                    }
                }
                @media(max-width: 800px)
                {
                    display: flex;
                    flex-direction: column;
                    font-size: 20px;
                }
                // PDF Icon
                .fas
                {
                    color: #DD4C4C;
                }
            }
        }
    }
`;
export const FailedBooking = styled.div`
    text-align: center;
    justify-content: center;
    margin-top: 15%;
    margin-bottom: 12.5%;
    overflow: auto;
    *
    {
        margin-bottom: 30px;
    }
    .foot
    {
        text-align: center;
        margin-bottom: 20px;
        a
        {
            margin-left: 5px;
            border-radius: 3px;
            text-shadow: 0px 0px 2px #776565;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            background: #378edd;
            color: #ffffff;
            padding: 12px 10px;
            border: none;
            transition: backgroung 0.5s;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
            &: hover
            {
                background: #fcb040;
            }
        }
    }
`;
export const LoaderMain = styled.div`
  text-align: center;
  margin-top: 149px;
  margin-bottom: 150px;
`;

export const styles = StyleSheet.create({
    line: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: '#000000',
    },
    PDFHead: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        textAlign: 'center',
    },
    Logo: {
        maxWidth: '100%',
        width: 100,
    },
    head: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        fontSize: 13,
        marginTop: 15,
        marginLeft: 285,
        flexBasis: '25%'
    },
    greeting: {
        fontSize: 18,
        marginLeft: 150,
        fontWeight: '900'
    },
    heading: {
        fontSize: 25,
        fontWeight: '800',
        marginTop: 5,
        marginLeft: 25,
        flexBasis: '55%'
    },
    PAXInfo: {
        marginLeft: 10,
        marginTop: 0,
        fontSize: 10,
    },
    left: {
        marginBottom: 5,
        marginLeft: 1,
    },
    right: {
        marginLeft: 265,
        marginTop: -15,
        marginBottom: 5,
    },
    flightDetailsHead: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 0,
        marginTop: 10
    },
    flightsParent: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderWidth: 2,
        borderColor: '#378cdd',
        marginBottom: 20
    },
    flight: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        fontSize: 12,
        fontWeight: 'bold',
    },
    Departure: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 15
    },
    InnerDeparture: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
    Arrival: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '15',
    },
    InnerArrival: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
    dateTime: {
        fontSize: 12,
        paddingTop: 2,
    },
    confirmed: {
        width: '12%',
    },
    flightDetails: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 10,
        marginTop: 10,
    },
    PAXTable: {
        marginTop: 5,
    },
    PAXTableHead: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    flightDetailsParent: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 10,
        marginTop: 0,
        marginBottom: 10,
    },
    Carrier: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '40%',
        margin: 0,
    },
    AirlineLogo: {
        width: '50px',
        height: '50px'
    },
    AirlineName: {
        margin: 'auto',
        maxWidth: '80px',
        wordWrap: 'break-word',
    },
    Confirm: {
        margin: 'auto',
        maxWidth: '70px',
        wordWrap: 'break-word'
    },
    Plane: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: 10
    },
    ParentStops: {
        fontSize: 13,
    },
    arrow: {
        width: '60px',
        height: '15px'
    },
    ParentArrow: {
        width: '100px',
        height: '15px'
    },
    RouteDateRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    DeptStatus: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    DeptTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ParentDeptStatus: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    FlightInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '15',
        maxWidth: '17%',
        justifyContent: 'center',
        textAlign: 'center'
    },
    InnerFlightInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10',
        maxWidth: '17%',
        justifyContent: 'center',
        textAlign: 'center'
    },
    ParentDeptTime: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    ArrStatus: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    ArrTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ParentArrStatus: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    ParentArrTime: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    tableParent: {
        marginTop: 12,
    },
    table: {
        display: "table",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginLeft: 0,
    },
    tableRow: {
        flexDirection: "row"
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        marginTop: 5,
        fontSize: 10,
        paddingLeft: 5,
    },
    tableHead: {
        fontWeight: 'bold',
        fontSize: 13,
        paddingLeft: 5,
    },
    service: {
        paddingTop: 10,
        fontSize: 13,
        fontWeight: 'bold',
    },
    routes: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        fontSize: 12,
    },
    routeCity: {
        marginRight: 20
    },
    agent_head: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    agent_address: {
        fontSize: 10
    },
});