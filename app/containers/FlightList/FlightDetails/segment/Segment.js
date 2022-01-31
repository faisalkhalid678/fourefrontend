import React from 'react';
import { SegmentParent } from './../wrapper/FlightDetailsStyle';
import ErrorBoundary from './../../../../helper/ErrorBoundary';
import { time_convert, diff_minutes, date_convert, utc_convert, TimeZone } from '../../../../helper/ConvertFunctions';


export default function Segment({ segments, BaggageInfo, totalFlightTime, round, QueryCity }) {
  let cot = 0;
  let roundLast = (round) ? 
    segments.map((segment) => 
    {
      cot = 0;
      let SegmentCity = segment.destination_city_name.split(' ');
      const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      SegmentCity = SegmentCity.map((clean) => {return clean.replace(regex, '')});
      SegmentCity.map((city) => {return ( QueryCity[0].indexOf(city) > -1  && city != 'international' && city != 'International' && city != 'airport' && city != 'Airport' ) ? cot++ : ''})
      return (cot > 0) ? segment : ''
    }) 
  :
    '';
  roundLast = (round) ? roundLast.filter(function (rL) {return rL != '';}) : '';
  
  const firstSegment = segments[0];
  const lastSegment = (round) ? roundLast[0] : segments[segments.length - 1];
  
  const FlightSegments = () => {
    return segments.map((segment, index) => {
      return (
        <ErrorBoundary>
          <span key={Math.random()}>
            <i className="fa fa-plane plane-icon"></i>
            <li className="segment-section">
              <h6 id="sub-head">{date_convert(segment.DepartureTime)}</h6>
              <div className="flight-time-section">
                <p className="flight-time info"> <span title={TimeZone(segment.DepartureTime)}>{utc_convert(segment.DepartureTime)}</span>  &#8211; <span title={TimeZone(segment.ArrivalTime)}>{utc_convert(segment.ArrivalTime)}</span> </p>
                <div className="dotted-div"></div>
                <p className="flight-duration info">{time_convert(segment.FlightTime)}</p>
              </div>
              <p className="flight-cities info">{segment.origin_city_name}, {segment.Origin} &#8594; {segment.destination_city_name}, {segment.Destination} </p>
              <p className="segment-details info">Class of Service : {segment.cabin.CabinClass} &nbsp;&nbsp;&nbsp;&nbsp; Flight: {segment.Carrier}-{segment.FlightNumber}</p>
              {(BaggageInfo.Value && BaggageInfo.Unit) ? <p className="segment-details info">Baggage Info : {BaggageInfo.Value} {BaggageInfo.Unit} </p> : ''}
              {(segments.length > 1 && index != segments.length-1 && segment.destination_city_name.indexOf(QueryCity[0]) == -1 ) ? <p className="segment-details info">Waiting Time : {diff_minutes(segments[0].ArrivalTime,segments[1].DepartureTime)}</p>:''}
            </li>
          </span>
        </ErrorBoundary>
      );
    })
  };

  return (
    <ErrorBoundary>
      <SegmentParent>
        <div className="flight-routes">
          <div className="col-3">
            <h6 id="sub-head">DEPART</h6>
            <p className="flight-date info"><b>{date_convert(firstSegment.DepartureTime)}</b></p>
            <p className="flight-countries info">{firstSegment.origin_city_name} &#8594; {lastSegment.destination_city_name} </p>
            <p className="flight-countries info">Total Flight Time: {time_convert(totalFlightTime)} </p>
          </div>
          <div className="col-9">
            <ul className="flights d-flex flex-column">
              {FlightSegments()}
            </ul>
          </div>
        </div>
      </SegmentParent>
    </ErrorBoundary>
  );
}
