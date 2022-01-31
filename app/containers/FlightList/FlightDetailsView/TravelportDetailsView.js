import React, { useState } from 'react';
import { AirlineDetailsView, AirlineContainer, SegmentSection, FlightDetailsParent, Details } from '../FlightDetails/wrapper/FlightDetailsStyle';
import Airplane from '../../../assets/img/airplane.png';
import Segment from '../FlightDetails/segment/Segment';
import DetailsViewSidebar from './DetailsViewSidebar';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { time_convert, date_convert, utc_convert, TimeZone } from '../../../helper/ConvertFunctions';

export const TravelportDetailsView = ({ navigateTo, showModal, singleFlight, queryString }) => {
  const [segment, setSegment] = useState(false);
  const { segments, BaggageInfo, price } = singleFlight;
  const showSegment = () => (segment ? setSegment(false) : setSegment(true));

  let QueryCity = queryString.to.slice(6);
  QueryCity = QueryCity.split(',');

  const round = (queryString.returnDate === 'undefined') ? false : true;

  let totalFlightTime = 0;
  if (round) {
    let x = 0;

    segments.map((segment) => {
      if (x == 0) {
        totalFlightTime += Number(segment.FlightTime);
      }

      if (segment.destination_city_name.indexOf(QueryCity[0]) > -1) {
        x++;
      }
    });
  }
  else {
    totalFlightTime = segments.reduce(
      (accumulator, segment) => accumulator + Number(segment.FlightTime),
      0,
    );
  }

  return singleFlight.segments != null ? (
    <FlightDetailsParent key={Math.random()}>
      <ErrorBoundary>
        <DetailsViewSidebar
          queryString={queryString}
          showModal={showModal}
          singleFlight={singleFlight}
          navigateTo={navigateTo}
        />
        <div className="main">
          <AirlineDetailsView>
            <AirlineContainer>
              {/* Segment Section Start */}
              <SegmentSection>
                {/* Segment Start */}
                {
                  (singleFlight) &&
                    singleFlight.segments.map((segment) => (
                      <div key={Math.random()} className="segment">
                        <div className="logo-section">
                          <img src={segment.airline_logo} />
                        </div>
                        <div className="takeoff-time">
                          <img className="airplane-logo takeoff" src={Airplane} />
                          <span title={TimeZone(segment.DepartureTime)}>
                            {utc_convert(segment.DepartureTime)}
                          </span>
                          <h5>
                            <span>
                              {segment.origin_city_name}, {segment.Origin}
                            </span>
                          </h5>
                          <span>
                            <h6>{date_convert(segment.DepartureTime)}</h6>
                          </span>
                        </div>

                        {/* Stop Details (Desktop View) */}
                        <div className="stop-details">
                          <div className="size-12">Direct Flight</div>
                          <h3 className="dotted-line" />
                          <div className="flight-time">
                            <div>
                              Flight # {segment.Carrier}-{segment.FlightNumber}
                            </div>
                            <span>Flight Time: {time_convert(segment.FlightTime)}</span>
                            <div>
                              {(queryString.returnDate === 'undefined') ? '' : 'Round-Trip'}
                            </div>
                          </div>

                        </div>
                        {/* Stop Details (Mobile View) */}
                        <div className="mobile-stop-details">
                          <div className="size-12">Direct Flight</div>
                          <div className="flight-time">
                            <div>
                              Flight # {segment.Carrier}-{segment.FlightNumber}
                            </div>
                            <span>
                              Flight Time: {time_convert(segment.FlightTime)}
                            </span>
                          </div>
                        </div>
                        <div className="arrive-time">
                          <img className="airplane-logo arrive" src={Airplane} />
                          <span title={TimeZone(segment.ArrivalTime)}>
                            {utc_convert(segment.ArrivalTime)}
                          </span>
                          <h5>
                            <span>
                              {segment.destination_city_name},{' '}
                              {segment.Destination}
                            </span>
                          </h5>
                          <span>
                            <h6>{date_convert(segment.ArrivalTime)}</h6>
                          </span>
                        </div>
                      </div>
                    ))
                }
                {/* Segment End */}
              </SegmentSection>
              {/* Segment Section End */}
              <div className="price-section">
                <h3>
                  {`${singleFlight.price_info.TotalPrice.slice(0, 3)} ${price}`}
                </h3>
                <p>
                  (incl.taxes & fees){' '}
                </p>
              </div>
            </AirlineContainer>
            <Segment
              segments={segments}
              BaggageInfo={BaggageInfo}
              totalFlightTime={totalFlightTime}
              QueryCity={QueryCity}
              round={round}
            />
          </AirlineDetailsView>
        </div>
      </ErrorBoundary>
    </FlightDetailsParent>
  ) : (
    ''
  );
};

export default TravelportDetailsView;
