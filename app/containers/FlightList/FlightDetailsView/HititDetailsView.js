import React from 'react';
import { AirlineDetailsView, AirlineContainer, SegmentSection, FlightDetailsParent, Details } from '../FlightDetails/wrapper/FlightDetailsStyle';
import Airplane from '../../../assets/img/airplane.png';
import Hititsegment from '../FlightDetails/segment/Hititsegment';
import DetailsViewSidebar from './DetailsViewSidebar';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { time_convert, date_convert, utc_convert, TimeZone} from '../../../helper/ConvertFunctions';

export const HititDetailsView = ({ navigateTo, showModal, singleFlight, queryString }) => {
  const { segments, price_info } = singleFlight;
  const { cabin } = queryString;
  
  const lengthOut = segments.Outbound.length;
  const lengthIn = (segments.Inbound) ? segments.Inbound.length : 0;
  
  let OutTime = 0;
  let InTime = 0;
  segments.Outbound.map((outbound) => {OutTime+=outbound.segment_data.FlightTime});
  (segments.Inbound) ? segments.Inbound.map((inbound) => {InTime+=inbound.segment_data.FlightTime}) : 0;

  return singleFlight.segments != null &&
  (
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
                    (segments.Inbound)? 
                      [
                        segments.Outbound.map((outbound) => 
                          <div key={Math.random()} className="segment">
                            <div className="logo-section">
                              <img src={outbound.segment_data.airline_logo} />
                            </div>
                            <div className="takeoff-time">
                              <img className="airplane-logo takeoff" src={Airplane} />
                              <span title={TimeZone(outbound.segment_data.DepartureTime)}>
                                {utc_convert(outbound.segment_data.DepartureTime)}
                              </span>
                              <h5>
                                <span>
                                  {outbound.segment_data.origin_city_name}, {outbound.segment_data.Origin}
                                </span>
                              </h5>
                              <span>
                                <h6>{date_convert(outbound.segment_data.DepartureTime)}</h6>
                              </span>
                            </div>
                            {/* Stop Details (Desktop View) */}
                            <div className="stop-details">
                              <div className="size-12">
                                {
                                  (lengthOut == 1) ?
                                    'Direct Flight'   
                                  : 
                                    lengthOut+' Stops'
                                }
                              </div>
                              <h3 className="dotted-line" />
                              <div className="flight-time">
                                <div>
                                  Flight # {outbound.segment_data.Carrier}-{outbound.segment_data.FlightNumber}
                                </div>
                                <span>
                                  Flight Time: {time_convert(outbound.segment_data.FlightTime)}
                                </span>
                                <div>
                                  {(segments.Inbound) ? 'Round-Trip' : ''}
                                </div>
                              </div>
                            </div>
                            {/* Stop Details (Mobile View) */}
                            <div className="mobile-stop-details">
                              <div className="size-12">
                                {
                                  (lengthOut == 1) ?
                                    'Direct Flight'   
                                  : 
                                    lengthOut+' Stops'
                                }
                              </div>
                              <div className="flight-time">
                                <div>
                                  Flight # {outbound.segment_data.Carrier}-{outbound.segment_data.FlightNumber}
                                </div>
                                <span>
                                  Flight Time: {time_convert(outbound.segment_data.FlightTime)}
                                </span>
                                <div>
                                  {(segments.Inbound) ? 'Round-Trip' : ''}
                                </div>
                              </div>
                            </div>
                            <div className="arrive-time">
                              <img className="airplane-logo arrive" src={Airplane} />
                              <span title={TimeZone(outbound.segment_data.ArrivalTime)}>
                                {utc_convert(outbound.segment_data.ArrivalTime)}
                              </span>
                              <h5>
                                <span>
                                  {outbound.segment_data.destination_city_name},{' '}
                                  {outbound.segment_data.Destination}
                                </span>
                              </h5>
                              <span>
                                <h6>{date_convert(outbound.segment_data.ArrivalTime)}</h6>
                              </span>
                            </div>
                          </div>
                        ),
                        segments.Inbound.map((inbound) => 
                          <div key={Math.random()} className="segment">
                            <div className="logo-section">
                              <img src={inbound.segment_data.airline_logo} />
                            </div>
                            <div className="takeoff-time">
                              <img className="airplane-logo takeoff" src={Airplane} />
                              <span title={TimeZone(inbound.segment_data.DepartureTime)}>
                                {utc_convert(inbound.segment_data.DepartureTime)}
                              </span>
                              <h5>
                                <span>
                                  {inbound.segment_data.origin_city_name}, {inbound.segment_data.Origin}
                                </span>
                              </h5>
                              <span>
                                <h6>{date_convert(inbound.segment_data.DepartureTime)}</h6>
                              </span>
                            </div>
                            {/* Stop Details (Desktop View) */}
                            <div className="stop-details">
                              <div className="size-12">
                                {
                                  (lengthIn == 1) ?
                                    'Direct Flight'   
                                  : 
                                    lengthIn+' Stops'
                                }
                              </div>
                              <h3 className="dotted-line" />
                              <div className="flight-time">
                                <div>
                                  Flight # {inbound.segment_data.Carrier}-{inbound.segment_data.FlightNumber}
                                </div>
                                <span>
                                  Flight Time: {time_convert(inbound.segment_data.FlightTime)}
                                </span>
                                <div>
                                  {(segments.Inbound) ? 'Round-Trip' : ''}
                                </div>
                              </div>
                            </div>
                            {/* Stop Details (Mobile View) */}
                            <div className="mobile-stop-details">
                              <div className="size-12">
                                {
                                  (lengthIn == 1) ?
                                    'Direct Flight'   
                                  : 
                                    lengthIn+' Stops'
                                }
                              </div>
                              <div className="flight-time">
                                <div>
                                  Flight # {inbound.segment_data.Carrier}-{inbound.segment_data.FlightNumber}
                                </div>
                                <span>
                                  Flight Time: {time_convert(inbound.segment_data.FlightTime)}
                                </span>
                                <div>
                                  {(segments.Inbound) ? 'Round-Trip' : ''}
                                </div>
                              </div>
                            </div>
                            <div className="arrive-time">
                              <img className="airplane-logo arrive" src={Airplane} />
                              <span title={TimeZone(inbound.segment_data.ArrivalTime)}>
                                {utc_convert(inbound.segment_data.ArrivalTime)}
                              </span>
                              <h5>
                                <span>
                                  {inbound.segment_data.destination_city_name},{' '}
                                  {inbound.segment_data.Destination}
                                </span>
                              </h5>
                              <span>
                                <h6>{date_convert(inbound.segment_data.ArrivalTime)}</h6>
                              </span>
                            </div>
                          </div>
                        )
                      ]
                    : 
                      segments.Outbound.map((outbound) => 
                        <div key={Math.random()} className="segment">
                          <div className="logo-section">
                            <img src={outbound.segment_data.airline_logo} />
                          </div>
                          <div className="takeoff-time">
                            <img className="airplane-logo takeoff" src={Airplane} />
                            <span title={TimeZone(outbound.segment_data.DepartureTime)}>
                                {utc_convert(outbound.segment_data.DepartureTime)}
                            </span>
                            <h5>
                              <span>
                                {outbound.segment_data.origin_city_name}, {outbound.segment_data.Origin}
                              </span>
                            </h5>
                            <span>
                              <h6>{date_convert(outbound.segment_data.DepartureTime)}</h6>
                            </span>
                          </div>
                          {/* Stop Details (Desktop View) */}
                          <div className="stop-details">
                            <div className="size-12">
                              {
                                (lengthOut == 1) ?
                                  'Direct Flight'   
                                : 
                                  lengthOut+' Stops'
                              }
                            </div>
                            <h3 className="dotted-line" />
                            <div className="flight-time">
                              <div>
                                Flight # {outbound.segment_data.Carrier}-{outbound.segment_data.FlightNumber}
                              </div>
                              <span>
                                Flight Time: {time_convert(outbound.segment_data.FlightTime)}
                              </span>
                              <div>
                                {(segments.Inbound) ? 'Round-Trip' : ''}
                              </div>
                            </div>
                          </div>
                          {/* Stop Details (Mobile View) */}
                          <div className="mobile-stop-details">
                            <div className="size-12">
                              {
                                (lengthOut == 1) ?
                                  'Direct Flight'   
                                : 
                                  lengthOut+' Stops'
                              }
                            </div>
                            <div className="flight-time">
                              <div>
                                Flight # {outbound.segment_data.Carrier}-{outbound.segment_data.FlightNumber}
                              </div>
                              <span>
                                Flight Time: {time_convert(outbound.segment_data.FlightTime)}
                              </span>
                              <div>
                                {(segments.Inbound) ? 'Round-Trip' : ''}
                              </div>
                            </div>
                          </div>
                          <div className="arrive-time">
                            <img className="airplane-logo arrive" src={Airplane} />
                            <span title={TimeZone(outbound.segment_data.ArrivalTime)}>
                              {utc_convert(outbound.segment_data.ArrivalTime)}
                            </span>
                            <h5>
                              <span>
                                {outbound.segment_data.destination_city_name},{' '}
                                {outbound.segment_data.Destination}
                              </span>
                            </h5>
                            <span>
                              <h6>{date_convert(outbound.segment_data.ArrivalTime)}</h6>
                            </span>
                          </div>
                        </div>
                      )
                  }
                  {/* Segment End */}
                </SegmentSection>
                {/* Segment Section End */}
                <div className="price-section">
                  <h3>
                    {`${singleFlight.price_info.pricingOverview.totalAmount.currency.code} ${Number(singleFlight.price)}`}
                  </h3>
                  <p>
                    (incl.taxes & fees)
                  </p>
                </div>
              </AirlineContainer>
              <Hititsegment
                cabin={cabin}
                segments={segments}
                price_info={price_info}
              />
          </AirlineDetailsView>
        </div>
      </ErrorBoundary>
    </FlightDetailsParent>
  );
};

export default HititDetailsView;
