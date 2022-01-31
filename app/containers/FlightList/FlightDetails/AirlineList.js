import React, { useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import Airplane from '../../../assets/img/airplane.png';
import Segment from './segment/Segment';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { time_convert, utc_convert, date_convert, TimeZone } from '../../../helper/ConvertFunctions';

import {
  AirlineListMain,
  AirlineContainer,
  SegmentSection,
  Details,
} from './wrapper/FlightDetailsStyle';

const AirlineList = ({ flight, handleFlight, query }) => {
  const [segment, setSegment] = useState(false);
  const [key, setKey] = useState(false);

  const showSegment = () => (segment ? setSegment(false) : setSegment(true));
  const { segments, BaggageInfo, price } = flight;
  
  let QueryCity = query.to.slice(6);
  QueryCity = QueryCity.split(',');
  
  const round = (query.returnDate === 'undefined') ? false : true;
  
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

  const totalStops = segments.length - 1;
  
  let totalFlightTime = 0; 
  if(round)
  {
    let x = 0;
    
    segments.map((segment) => 
    {
      if (x == 0)
      {
        totalFlightTime += Number(segment.FlightTime);
      }
      
      if(segment.destination_city_name.indexOf(QueryCity[0]) > -1)
      {
        x++;
      }
    });
  }
  else
  {
    totalFlightTime = segments.reduce(
        (accumulator, segment) => accumulator + Number(segment.FlightTime),
        0,
      );
  }

  const handleFlightView = () => {
    setKey(firstSegment.Key);
    handleFlight(firstSegment.Key, flight.provider_type);
  }

  return (
    <ErrorBoundary>
      <AirlineListMain>
        <AirlineContainer>
          {/* Segment Section Start */}
          <SegmentSection>
            {/* Segment Start */}
            <div key={firstSegment.key} className="segment">
              <div className="logo-section">
                <img src={firstSegment.airline_logo} />
              </div>
              <div className="takeoff-time d">
                <img className="airplane-logo takeoff" src={Airplane} />
                <span title={TimeZone(firstSegment.DepartureTime)}>
                  {utc_convert(firstSegment.DepartureTime)}
                </span>
                <h5>
                  <span>
                    {firstSegment.origin_city_name}, {firstSegment.Origin}
                  </span>
                </h5>
                <span>
                  <h6>
                    {date_convert(firstSegment.DepartureTime)}
                  </h6>
                </span>
              </div>

              {/* Stop Details (Desktop View) */}
              <div className="stop-details">
                <div className="size-12">
                {
                    (totalStops > 1) ?
                      <>
                        {totalStops} Stops
                      </> 
                    :
                      (totalStops == 1)?
                        <>
                          {totalStops} Stop
                        </> 
                      :
                        'Direct Flight'
                  }
                </div>
                <h3 className="dotted-line" />
                <div className="flight-time">
                  <span>Total Flight Time: {time_convert(totalFlightTime)}</span>
                  <div>
                    {(query.returnDate === 'undefined') ? '' : 'Round-Trip'}
                  </div>
                </div>
              </div>
              {/* Stop Details (Mobile View) */}
              <div className="mobile-stop-details">
                <div className="size-12">
                  {
                    (totalStops > 1) ?
                      <>
                        {totalStops} Stops
                      </> 
                    :
                      (totalStops == 1)?
                        <>
                          {totalStops} Stop
                        </> 
                      :
                        'Direct Flight'
                  }
                </div>
                <div className="flight-time">
                  <span>Total Flight Time: {time_convert(totalFlightTime)}</span>
                  <div>
                    {(query.returnDate === 'undefined') ? '' : 'Round-Trip'}
                  </div>
                </div>
              </div>
              <div className="arrive-time">
                <img className="airplane-logo arrive" src={Airplane} />
                <span title={TimeZone(lastSegment.ArrivalTime)}>
                  {utc_convert(lastSegment.ArrivalTime)}
                </span>
                <h5>
                  <span>
                    {lastSegment.destination_city_name}, {lastSegment.Destination}
                  </span>
                </h5>
                <span>
                  <h6>{date_convert(lastSegment.ArrivalTime)}</h6>
                </span>
              </div>
            </div>
            {/* Segment End */}
          </SegmentSection>
          {/* Segment Section End */}
          <div className="price-section">
            <h3>{flight.price_info.TotalPrice.slice(0,3)+' '+price}</h3>
            <p>
              (incl.taxes & fees){' '}
            </p>
            <button onClick={handleFlightView}>
              Select <AiFillRightCircle />
            </button>
          </div>
          <Details>
            <a onClick={showSegment} to="/">
              View Details
            </a>
          </Details>
        </AirlineContainer>
        {
          (segment) &&
            <Segment
              segments={segments}
              BaggageInfo={BaggageInfo}
              totalFlightTime={totalFlightTime}
              QueryCity={QueryCity}
              round={round}
            />
        }
      </AirlineListMain>
    </ErrorBoundary>
  );
};

export default AirlineList;
