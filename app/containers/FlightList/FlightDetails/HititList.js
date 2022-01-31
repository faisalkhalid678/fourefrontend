import React, { useState } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import Airplane from '../../../assets/img/airplane.png';
import Hititsegment from './segment/Hititsegment';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { time_convert, date_convert, utc_convert, TimeZone} from '../../../helper/ConvertFunctions';
import { AirlineListMain, AirlineContainer, SegmentSection, Details } from './wrapper/FlightDetailsStyle';

const HititList = ({ flight, handleFlight, query }) => {
  const [segment, setSegment] = useState(false);
  const [key, setKey] = useState(false);

  const showSegment = () => (segment ? setSegment(false) : setSegment(true));
  const { segments, price_info, price } = flight;
  
  let lengthOut = segments.Outbound.length;
  let lengthIn = (segments.Inbound) ? segments.Inbound.length : 0;
  const firstSegment = segments.Outbound[0].segment_data;
  const lastSegment = segments.Outbound[lengthOut - 1].segment_data;

  const totalStops = (segments.Inbound) ? lengthIn + lengthOut-1 : lengthOut - 1;

  let TotalTime = 0;
  segments.Outbound.map((outbound) => {TotalTime+=outbound.segment_data.FlightTime});

  const handleFlightView = () => {
    setKey(flight.key);
    handleFlight(flight.key, flight.provider_type);
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
              <div className="takeoff-time">
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
                  <h6>{date_convert(firstSegment.DepartureTime)}</h6>
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
                  <span>Total Flight Time: {time_convert(TotalTime)}</span>
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
                  <span>Total Flight Time: {time_convert(TotalTime)}</span>
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
            <h3>PKR {Number(price)}</h3>
            <p>(incl.taxes & fees){' '}</p>
            <button onClick={handleFlightView}> Select <AiFillRightCircle /> </button>
          </div>
          <Details>
            <a
            onClick={showSegment}
              to="/">
              View Details
            </a>
          </Details>
        </AirlineContainer>
        {
          (segment) &&
            <Hititsegment
              segments={segments}
              price_info={price_info}
            />
        }
      </AirlineListMain>
    </ErrorBoundary>
  );
};

export default HititList;
