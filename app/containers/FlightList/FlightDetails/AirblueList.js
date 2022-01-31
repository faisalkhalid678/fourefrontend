import React, { useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import Airplane from '../../../assets/img/airplane.png';
import Airbluesegment from './segment/Airbluesegment';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { date_convert, diff_minutes, utc_convert } from '../../../helper/ConvertFunctions';

import {
  AirlineListMain,
  AirlineContainer,
  SegmentSection,
  Details,
} from './wrapper/FlightDetailsStyle';

const AirblueList = ({ flight, handleFlight, query }) => {
  const [segment, setSegment] = useState(false);
  const [key, setKey] = useState(false);

  const showSegment = () => (segment ? setSegment(false) : setSegment(true));
  const { segments, pricing_info, price } = flight;
  const { cabin } = query;

  const handleFlightView = () => {
    setKey(flight.key);
    handleFlight(flight.key, flight.provider_type);
  }
  return (
    (segments.boundType !== 'inbound') &&
      <ErrorBoundary>
        <AirlineListMain>
          <AirlineContainer>
            {/* Segment Section Start */}
            <SegmentSection>
              {/* Segment Start */}
              <div key={segments.key} className="segment">
                <div className="logo-section">
                  <img src={segments.airline_logo} />
                </div>
                <div className="takeoff-time">
                  <img className="airplane-logo takeoff" src={Airplane} />
                  <span>
                    {utc_convert(new Date(segments.DepartureDateTime).toString())}
                  </span>
                  <h5>
                    <span>{segments.origin_city_name}, {segments.Origin}</span>
                  </h5>
                  <span>
                    <h6>{date_convert(segments.DepartureDateTime)}</h6>
                  </span>
                </div>

                {/* Stop Details (Desktop View) */}
                <div className="stop-details">
                  <div className="size-12">Direct Flight</div>
                  <h3 className="dotted-line" />
                  <div className="flight-time">
                    <span>Total Flight Time: {diff_minutes(segments.DepartureDateTime, segments.ArrivalDateTime)}</span>
                    <div>
                      {(query.returnDate === 'undefined') ? '' : 'Round-Trip'}
                    </div>
                  </div>
                </div>
                {/* Stop Details (Mobile View) */}
                <div className="mobile-stop-details">
                  <div className="size-12">Direct Flight</div>
                  <div className="flight-time">
                    <span>Total Flight Time: {diff_minutes(segments.DepartureDateTime, segments.ArrivalDateTime)}</span>
                    <div>
                      {(query.returnDate === 'undefined') ? '' : 'Round-Trip'}
                    </div>
                  </div>
                </div>
                <div className="arrive-time">
                  <img className="airplane-logo arrive" src={Airplane} />
                  <span>
                    {utc_convert(new Date(segments.ArrivalDateTime).toString())}
                  </span>
                  <h5>
                    <span>{segments.Destination_city_name}, {segments.Destination}</span>
                  </h5>
                  <span>
                    <h6>{date_convert(segments.ArrivalDateTime)}</h6>
                  </span>
                </div>
              </div>
              {/* Segment End */}
            </SegmentSection>
            {/* Segment Section End */}
            <div className="price-section">
              <h3>PKR {Number(price)}</h3>
              <p>(incl.taxes & fees){' '}</p>
              <button onClick={handleFlightView}> Select <AiFillRightCircle /></button>
            </div>
            <Details>
              <a onClick={showSegment} to="/">View Details</a>
            </Details>
          </AirlineContainer>
          {
            (segment) &&
              <Airbluesegment
                flight={flight}
                segments={segments}
                cabin={cabin}
              />
          }
        </AirlineListMain>
      </ErrorBoundary>
  );
};

export default AirblueList;