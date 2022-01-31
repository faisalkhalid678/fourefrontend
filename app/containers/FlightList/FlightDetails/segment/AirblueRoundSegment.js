import React from 'react';
import { SegmentParent } from './../wrapper/FlightDetailsStyle';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
import { diff_minutes, date_convert, utc_convert } from '../../../../helper/ConvertFunctions';

export default function AirblueRoundSegment({ singleFlight, cabin }) 
{
    const BaggageInfo = {
        "Value": (singleFlight[0].PTC_FareBreakdowns[0].FareInfo2.PassengerFare) ? singleFlight[0].PTC_FareBreakdowns[0].FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasureQuantity : '',
        "Unit": (singleFlight[0].PTC_FareBreakdowns[0].FareInfo2.PassengerFare) ? 
                  (singleFlight[0].PTC_FareBreakdowns[0].FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasure === 'KGS') ? 
                    'Kilograms'
                  :
                    singleFlight[0].PTC_FareBreakdowns.FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasure
                :
                  ''
      };
    return (
        <ErrorBoundary>
            <SegmentParent>
                <div className="flight-routes">
                    <div className="col-3">
                        <h6 id="sub-head">DEPART</h6>
                        <p className="flight-date info"><b>{date_convert(singleFlight[0].segments.DepartureDateTime)}</b></p>
                        <p className="flight-countries info">{singleFlight[0].segments.origin_city_name} &#8594; {singleFlight[0].segments.Destination_city_name} </p>
                        <p className="flight-countries info">Total Flight Time: {diff_minutes(singleFlight[0].segments.ArrivalDateTime, singleFlight[0].segments.DepartureDateTime)} </p>
                    </div>
                    <div className="col-9">
                        <ul className="flights d-flex flex-column">
                            {
                                singleFlight.map((flt) => {
                                    return <span key={Math.random()}>
                                        <i className="fa fa-plane plane-icon"></i>
                                        <li className="segment-section">
                                            <h6 id="sub-head">{date_convert(flt.segments.DepartureDateTime)}</h6>
                                            <div className="flight-time-section">
                                                <p className="flight-time info"> 
                                                    <span>{utc_convert(new Date(flt.segments.DepartureDateTime).toString())}</span>  &#8211; 
                                                    <span>{utc_convert(new Date(flt.segments.ArrivalDateTime).toString())}</span> 
                                                </p>
                                                <div className="dotted-div"></div>
                                                <p className="flight-duration info">{diff_minutes(flt.segments.ArrivalDateTime, flt.segments.DepartureDateTime)}</p>
                                            </div>
                                            <p className="flight-cities info">{flt.segments.origin_city_name}, {flt.segments.Origin} &#8594; {flt.segments.Destination_city_name}, {flt.segments.Destination} </p>
                                            <p className="segment-details info">Class of Service : {cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight #: {flt.segments.Carrier}-{flt.segments.FlightNumber}</p>
                                            {
                                                (BaggageInfo.Value == '' && BaggageInfo.Unit == '') ?
                                                    ''
                                                :
                                                    <p className="segment-details info">Baggage Info : {BaggageInfo.Value} {BaggageInfo.Unit} </p>
                                            }
                                        </li>
                                    </span>
                                })
                            }

                        </ul>
                    </div>
                </div>
            </SegmentParent>
        </ErrorBoundary>
    );
}