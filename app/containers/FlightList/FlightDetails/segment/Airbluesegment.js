import React from 'react';
import { SegmentParent } from './../wrapper/FlightDetailsStyle';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
import { diff_minutes, date_convert, utc_convert } from '../../../../helper/ConvertFunctions';

export default function Airbluesegment({ flight, segments, cabin }) {
  const BaggageInfo = {
    "Value": (flight.PTC_FareBreakdowns[0].FareInfo2.PassengerFare) ? flight.PTC_FareBreakdowns[0].FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasureQuantity : '',
    "Unit": (flight.PTC_FareBreakdowns[0].FareInfo2.PassengerFare) ? 
              (flight.PTC_FareBreakdowns[0].FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasure === 'KGS') ? 
                'Kilograms'
              :
                flight.PTC_FareBreakdowns.FareInfo2.PassengerFare.FareBaggageAllowance.UnitOfMeasure
            :
              ''
  };
  return (
    <ErrorBoundary>
      <SegmentParent>
        <div className="flight-routes">
          <div className="col-3">
            <h6 id="sub-head">DEPART</h6>
            <p className="flight-date info"><b>{date_convert(segments.DepartureDateTime)}</b></p>
            <p className="flight-countries info">{segments.origin_city_name} &#8594; {segments.Destination_city_name} </p>
            <p className="flight-countries info">Total Flight Time: {diff_minutes(segments.ArrivalDateTime, segments.DepartureDateTime)} </p>
          </div>
          <div className="col-9">
            <ul className="flights d-flex flex-column">
              <span>
                <i className="fa fa-plane plane-icon"></i>
                <li className="segment-section">
                  <h6 id="sub-head">{date_convert(segments.DepartureDateTime)}</h6>
                  <div className="flight-time-section">
                    <p className="flight-time info"> 
                      <span>{utc_convert(new Date(segments.DepartureDateTime).toString())}</span>  &#8211; 
                      <span>{utc_convert(new Date(segments.ArrivalDateTime).toString())}</span> 
                    </p>
                    <div className="dotted-div"></div>
                    <p className="flight-duration info sd">{diff_minutes(segments.ArrivalDateTime, segments.DepartureDateTime)}</p>
                  </div>
                  <p className="flight-cities info">{segments.origin_city_name}, {segments.Origin} &#8594; {segments.Destination_city_name}, {segments.Destination} </p>
                  <p className="segment-details info">Class of Service : {cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {segments.Carrier}-{segments.FlightNumber}</p>
                  {
                    (BaggageInfo.Value == '' && BaggageInfo.Unit == '') ?
                      ''
                    :
                      <p className="segment-details info">Baggage Info : {BaggageInfo.Value} {BaggageInfo.Unit} </p>
                  }
                </li>
              </span>
            </ul>
          </div>
        </div>
      </SegmentParent>
    </ErrorBoundary>
  );
}
