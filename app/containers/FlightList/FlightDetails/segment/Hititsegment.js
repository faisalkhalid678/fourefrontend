import React from 'react';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
import { SegmentParent } from './../wrapper/FlightDetailsStyle';
import { time_convert, diff_minutes, date_convert, utc_convert, TimeZone} from '../../../../helper/ConvertFunctions';


export default function Hititsegment({ segments, price_info }) {
  
  const lengthOut = segments.Outbound.length;
  const lengthIn = (segments.Inbound) ? segments.Inbound.length : 0;
  const firstSegment = segments.Outbound[0].segment_data;
  const lastSegment = segments.Outbound[lengthOut - 1].segment_data;
  let OutTime = 0;
  let InTime = 0;
  segments.Outbound.map((outbound) => {OutTime+=outbound.segment_data.FlightTime});
  (segments.Inbound) ? segments.Inbound.map((inbound) => {InTime+=inbound.segment_data.FlightTime}) : 0;
  
  const TotalTime = OutTime + InTime;
  const BaggageInfo = {
    "Value": (typeof price_info.fareInfoList === Object) ?
        (price_info.fareInfoList.fareBaggageAllowance.allowanceType === 'WEIGHT') ? price_info.fareInfoList.fareBaggageAllowance.maxAllowedWeight.weight : '1'
      :
        (price_info.fareInfoList[0].fareBaggageAllowance.allowanceType === 'WEIGHT') ? price_info.fareInfoList[0].fareBaggageAllowance.maxAllowedWeight.weight : '1',
    "Unit": (typeof price_info.fareInfoList === Object) ? 
        (price_info.fareInfoList.fareBaggageAllowance.allowanceType === 'WEIGHT') ? price_info.fareInfoList.fareBaggageAllowance.maxAllowedWeight.unitOfMeasureCode : 'Piece'
      :
        (price_info.fareInfoList[0].fareBaggageAllowance.allowanceType === 'WEIGHT') ? price_info.fareInfoList[0].fareBaggageAllowance.maxAllowedWeight.unitOfMeasureCode : 'Piece'
  };
  const OutboundSegments = () => {
    return (
      <ErrorBoundary>
        {
          segments.Outbound.map((outbound, index) => {
            return (
              <span key={Math.random()}>
                <i className="fa fa-plane plane-icon"></i>
                <li className="segment-section">
                  <h6 id="sub-head">{date_convert(outbound.segment_data.DepartureTime)}</h6>
                  <div className="flight-time-section">
                    <p className="flight-time info"> <span title={TimeZone(outbound.segment_data.DepartureTime)}>{utc_convert(outbound.segment_data.DepartureTime)}</span>  &#8211; <span title={TimeZone(outbound.segment_data.ArrivalTime)}>{utc_convert(outbound.segment_data.ArrivalTime)}</span> </p>
                    <div className="dotted-div"></div>
                    <p className="flight-duration info">{time_convert(outbound.segment_data.FlightTime)}</p>
                  </div>                  
                  <p className="flight-cities info">{outbound.segment_data.origin_city_name}, {outbound.segment_data.Origin} &#8594; {outbound.segment_data.destination_city_name}, {outbound.segment_data.Destination} </p>
                  <p className="segment-details info">Class of Service : {outbound.bookingClassList[0].cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {outbound.segment_data.Carrier}-{outbound.segment_data.FlightNumber}</p>
                  <p className="segment-details info">Baggage Info : {BaggageInfo.Value}  {(BaggageInfo.Unit === 'KG') ? 'Kilograms' : BaggageInfo.Unit}</p>
                  {
                    (lengthOut > 1 || segments.Inbound ) &&
                      (index+1 != lengthOut) &&
                        <p className="segment-details info">
                          Waiting Time: {diff_minutes(outbound.segment_data.ArrivalTime, segments.Outbound[index+1].segment_data.DepartureTime)}
                        </p>
                  }
                </li>
              </span>
            )
          })
        }
      </ErrorBoundary>
    )
  };

  const InboundSegments = () => {
    return (
      <ErrorBoundary>
        {
          segments.Inbound.map((inbound, index) => {
            return (
              <span key={Math.random()}>
                <i className="fa fa-plane plane-icon"></i>
                <li className="segment-section">
                  <h6 id="sub-head">{date_convert(inbound.segment_data.DepartureTime)}</h6>
                  <div className="flight-time-section">
                    <p className="flight-time info"> <span title={TimeZone(inbound.segment_data.DepartureTime)}>{utc_convert(inbound.segment_data.DepartureTime)}</span>  &#8211; <span title={TimeZone(inbound.segment_data.ArrivalTime)}>{utc_convert(inbound.segment_data.ArrivalTime)}</span> </p>
                    <div className="dotted-div"></div>
                    <p className="flight-duration info">{time_convert(inbound.segment_data.FlightTime)}</p>
                  </div>
                  <p className="flight-cities info">{inbound.segment_data.origin_city_name}, {inbound.segment_data.Origin} &#8594; {inbound.segment_data.destination_city_name}, {inbound.segment_data.Destination} </p>
                  <p className="segment-details info">Class of Service : {inbound.bookingClassList[0].cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {inbound.segment_data.Carrier}-{inbound.segment_data.FlightNumber}</p>
                  <p className="segment-details info">Baggage Info : {BaggageInfo.Value}  {(BaggageInfo.Unit === 'KG') ? 'Kilograms' : BaggageInfo.Unit}</p>
                  {
                    (lengthIn > 1 ) &&
                      (index+1 != lengthIn) &&
                        <p className="segment-details info">
                          Waiting Time: {diff_minutes(inbound.segment_data.ArrivalTime, segments.Inbound[index+1].segment_data.DepartureTime)}
                        </p>
                  }
                </li>
              </span>
            )
          })
        }
      </ErrorBoundary>
    )
  };

  return (
    <ErrorBoundary>
      <SegmentParent>
        <div className="flight-routes">
          <div className="col-3">
            <h6 id="sub-head">DEPART</h6>
            <p className="flight-date info"><b>{date_convert(firstSegment.DepartureTime)}</b></p>
            <p className="flight-countries info">{firstSegment.origin_city_name} &#8594; {lastSegment.Destination_city}, {lastSegment.Destination_country} </p>
            <p className="flight-countries info">Total Flight Time: {time_convert(TotalTime)} </p>
          </div>
          <div className="col-9">
            <ul className="flights d-flex flex-column">
              {OutboundSegments()}
              {(segments.Inbound) && InboundSegments()}
            </ul>
          </div>
        </div>
      </SegmentParent>
    </ErrorBoundary>
  );
}
