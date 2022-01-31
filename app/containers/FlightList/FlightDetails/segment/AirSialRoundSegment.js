import React from 'react';
import ErrorBoundary from '../../../../helper/ErrorBoundary';
import { SegmentParent } from '../wrapper/FlightDetailsStyle';
import { time_convert, date_convert } from '../../../../helper/ConvertFunctions';

export default function AirSialRoundSegment({ cabin, singleFlight }) {
  const Outbound = singleFlight[0];
  const Inbound = singleFlight[1];
  
  let OutTime = 0;

  const firstSegment = Outbound.segments.outbound[0];

  Outbound.segments.outbound.map((outbound) => {OutTime+=outbound.FlightTime});
  
  const TotalTime = OutTime;
  
  const outboundSegments = () => {
    return (
      <ErrorBoundary>
        {
          Outbound.segments.outbound.map((outbound) => {
            return (
              <span key={Math.random()}>
                <i className="fa fa-plane plane-icon"></i>
                <li className="segment-section">
                  <h6 id="sub-head">{date_convert(outbound.DEPARTURE_DATE)}</h6>
                  <div className="flight-time-section">
                    <p className="flight-time info"> {outbound.DEPARTURE_TIME}  &#8211; {outbound.ARRIVAL_TIME} </p>
                    <div className="dotted-div"></div>
                    <p className="flight-duration info">{time_convert(outbound.FlightTime)}</p>
                  </div>
                  <p className="flight-cities info">{outbound.origin_city_name}, {outbound.Origin} &#8594; {outbound.Destination_city_name}, {outbound.Destination} </p>
                  <p className="segment-details info">Class of Service : {cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {outbound.FlightNumber.slice(0,2)}-{outbound.FlightNumber.slice(2)}</p>
                  <p className="segment-details info">Baggage Info : {Outbound.availableFareTypes[1].DESCRIPTION} </p>
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
          Inbound.segments.inbound.map((inbound) => {
            return (
              <span key={Math.random()}>
                <i className="fa fa-plane plane-icon"></i>
                <li className="segment-section">
                  <h6 id="sub-head">{date_convert(inbound.DEPARTURE_DATE)}</h6>
                  <div className="flight-time-section">
                    <p className="flight-time info"> {inbound.DEPARTURE_TIME}  &#8211; {inbound.ARRIVAL_TIME} </p>
                    <div className="dotted-div"></div>
                    <p className="flight-duration info">{time_convert(inbound.FlightTime)}</p>
                  </div>
                  <p className="flight-cities info">{inbound.origin_city_name}, {inbound.Origin} &#8594; {inbound.Destination_city_name}, {inbound.Destination} </p>
                  <p className="segment-details info">Class of Service : {cabin} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {inbound.FlightNumber.slice(0,2)}-{inbound.FlightNumber.slice(2)}</p>
                  <p className="segment-details info">Baggage Info : {Inbound.availableFareTypes[1].DESCRIPTION}</p>
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
            <p className="flight-date info"><b>{date_convert(firstSegment.DEPARTURE_DATE)}</b></p>
            <p className="flight-countries info">{firstSegment.origin_city_name} &#8594; {firstSegment.Destination_city_name} </p>
            <p className="flight-countries info">Total Flight Time: {time_convert(TotalTime)} </p>
          </div>
          <div className="col-9">
            <ul className="flights d-flex flex-column">
              {(Outbound.segments.outbound) && outboundSegments()}
              {(Inbound.segments.inbound) && InboundSegments()}
            </ul>
          </div>
        </div>
      </SegmentParent>
    </ErrorBoundary>
  );
}
