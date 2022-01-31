import React, { useState } from 'react';
import { AirlineDetailsView, AirlineContainer, SegmentSection, FlightDetailsParent } from '../FlightDetails/wrapper/FlightDetailsStyle';
import Airplane from '../../../assets/img/airplane.png';
import AirSialSegment from '../FlightDetails/segment/AirSialSegment';
import AirSialRoundSegment from '../FlightDetails/segment/AirSialRoundSegment';
import { AirSialRoundList } from './AirSialRoundList';
import DetailsViewSidebar from './DetailsViewSidebar';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { time_convert, date_convert } from '../../../helper/ConvertFunctions';


export const AirSialDetailsView = ({ navigateTo,  showModal,  singleFlight,  queryString,  flights }) => {
  const { cabin, returnDate } = queryString;
  const [airSialKey, setAirsialFlightKey] = useState(null);
  
  let airSialInbound = [];
  flights.result.flights.map((flt) => {
    if (flt.provider_type === 'airsial' && flt.segments.inbound && returnDate !== 'undefined') {
      airSialInbound.push(flt);
    }
  });

  if (airSialKey !== null) {
    airSialInbound.map((Flight) => {
      if (Flight.provider_type === 'airsial' && Flight.segments.inbound && Flight.key === airSialKey) {
        singleFlight.push(Flight);
      }
    })
  }

  if (returnDate === 'undefined')
  {
    const { segments, price, availableFareTypes } = singleFlight[0];
    const lengthOut = segments.outbound.length;

    let OutTime = 0;
    segments.outbound.map((outbound) => { OutTime += outbound.FlightTime });

    return segments != null ?
        <FlightDetailsParent key={Math.random()}>
          <ErrorBoundary>
            <DetailsViewSidebar
              queryString={queryString}
              showModal={showModal}
              singleFlight={singleFlight[0]}
              navigateTo={navigateTo}
            />
            <div className="main">
              <AirlineDetailsView>
                <AirlineContainer>
                  {/* Segment Section Start */}
                  <SegmentSection>
                    {/* Segment Start */}
                    {
                      segments.outbound.map((outbound) =>
                        <div key={Math.random()} className="segment">
                          <div className="logo-section">
                            <img src={outbound.airline_logo} />
                          </div>
                          <div className="takeoff-time">
                            <img className="airplane-logo takeoff" src={Airplane} />
                            <span>
                              {outbound.DEPARTURE_TIME}
                            </span>
                            <h5>
                              <span>
                                {outbound.origin_city_name}, {outbound.Origin}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(outbound.DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                          {/* Stop Details (Desktop View) */}
                          <div className="stop-details">
                            <div className="size-12">
                              {
                                (lengthOut == 1) ?
                                  'Direct Flight'
                                  :
                                  lengthOut + ' Stops'
                              }
                            </div>
                            <h3 className="dotted-line" />
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(outbound.FlightTime)}
                              </span>
                            </div>
                          </div>
                          {/* Stop Details (Mobile View) */}
                          <div className="mobile-stop-details">
                            <div className="size-12">
                              {
                                (lengthOut == 1) ?
                                  'Direct Flight'
                                  :
                                  lengthOut + ' Stops'
                              }
                            </div>
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(outbound.FlightTime)}
                              </span>
                            </div>
                          </div>
                          <div className="arrive-time">
                            <img className="airplane-logo arrive" src={Airplane} />
                            <span>
                              {outbound.ARRIVAL_TIME}
                            </span>
                            <h5>
                              <span>
                                {outbound.Destination_city_name},{' '}
                                {outbound.Destination}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(outbound.DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                        </div>
                      )
                    }
                    {/* Segment End */}
                  </SegmentSection>
                  {/* Segment Section End */}
                  <div className="price-section">
                    <h3>{`PKR ${Number(price)}`}</h3>
                    <p>(incl.taxes & fees)</p>
                  </div>
                </AirlineContainer>
                <AirSialSegment
                  cabin={cabin}
                  baggage={availableFareTypes[1].DESCRIPTION}
                  segments={segments}
                />
              </AirlineDetailsView>
            </div>
          </ErrorBoundary>
        </FlightDetailsParent>
      :
        '';
  }
  else if (returnDate !== 'undefined' && airSialKey === null)
  {
    const { segments, availableFareTypes, price } = singleFlight[0];
    const lengthOut = segments.outbound.length;

    return segments != null ?
      <FlightDetailsParent >
        <ErrorBoundary>
          <DetailsViewSidebar
            queryString={queryString}
            showModal={showModal}
            singleFlight={singleFlight[0]}
            navigateTo={navigateTo}
            airSialKey={airSialKey}
          />
          <div className="main">
            <h3 className="text-center mt-30 mb-30 font-weight-bold" style={{ color: '#378EDD' }}>Your Selected Outgoing Flight</h3>
            <AirlineDetailsView>
              <AirlineContainer>
                {/* Segment Section Start */}
                <SegmentSection>
                  {/* Segment Start */}
                  {
                    <div className="segment">
                      <div className="logo-section">
                        <img src={segments.outbound[0].airline_logo} />
                      </div>
                      <div className="takeoff-time">
                        <img className="airplane-logo takeoff" src={Airplane} />
                        <span>
                          {segments.outbound[0].DEPARTURE_TIME}
                        </span>
                        <h5>
                          <span>
                            {segments.outbound[0].origin_city_name}, {segments.outbound[0].Origin}
                          </span>
                        </h5>
                        <span>
                          <h6>
                            {date_convert(segments.outbound[0].DEPARTURE_DATE)}
                          </h6>
                        </span>
                      </div>
                      {/* Stop Details (Desktop View) */}
                      <div className="stop-details">
                        <div className="size-12">
                          {
                            (lengthOut == 1) ?
                              'Direct Flight'
                              :
                              lengthOut + ' Stops'
                          }
                        </div>
                        <h3 className="dotted-line" />
                        <div className="flight-time">
                          <span>
                            Flight Time: {time_convert(segments.outbound[0].FlightTime)}
                          </span>
                        </div>
                      </div>
                      {/* Stop Details (Mobile View) */}
                      <div className="mobile-stop-details">
                        <div className="size-12">
                          {
                            (lengthOut == 1) ?
                              'Direct Flight'
                              :
                              lengthOut + ' Stops'
                          }
                        </div>
                        <div className="flight-time">
                          <span>
                            Flight Time: {time_convert(segments.outbound[0].FlightTime)}
                          </span>
                        </div>
                      </div>
                      <div className="arrive-time">
                        <img className="airplane-logo arrive" src={Airplane} />
                        <span>
                          {segments.outbound[0].ARRIVAL_TIME}
                        </span>
                        <h5>
                          <span>
                            {segments.outbound[0].Destination_city_name},{' '}
                            {segments.outbound[0].Destination}
                          </span>
                        </h5>
                        <span>
                          <h6>
                            {date_convert(segments.outbound[0].DEPARTURE_DATE)}
                          </h6>
                        </span>
                      </div>
                    </div>
                  }
                  {/* Segment End */}
                </SegmentSection>
                {/* Segment Section End */}
                <div className="price-section">
                  <h3>{`PKR ${Number(price)}`}</h3>
                  <p>(incl.taxes & fees)</p>
                </div>
              </AirlineContainer>
            </AirlineDetailsView>
            <h3 className="text-center mt-30 mb-30 font-weight-bold" style={{ color: '#378EDD' }}>Choose Your Incoming Flight</h3>
            <ErrorBoundary>
              {
                airSialInbound.map((ASInbound) =>
                  <AirSialRoundList
                    flight={ASInbound}
                    queryString={queryString}
                    setAirsialFlightKey={setAirsialFlightKey}
                    key={Math.random()}
                  />
                )
              }
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      </FlightDetailsParent>
      :
      '';
  }
  else if (returnDate !== 'undefined' && airSialKey !== null)
  {
    return (
      <FlightDetailsParent key={Math.random()}>
        <ErrorBoundary>
          <DetailsViewSidebar
            queryString={queryString}
            showModal={showModal}
            singleFlight={singleFlight}
            navigateTo={navigateTo}
            airSialKey={singleFlight[0].key}
          />
          <div className="main">
            <AirlineDetailsView>
              {
                singleFlight.map((singleAirSial) => {
                  if (singleAirSial.segments.outbound)
                  {
                    return <AirlineContainer key={Math.random()}>
                      {/* Segment Section Start */}
                      <SegmentSection>
                        {/* Segment Start */}
                        <div className="segment">
                          <div className="logo-section">
                            <img src={singleAirSial.segments.outbound[0].airline_logo} />
                          </div>
                          <div className="takeoff-time">
                            <img className="airplane-logo takeoff" src={Airplane} />
                            <span>
                              {singleAirSial.segments.outbound[0].DEPARTURE_TIME}
                            </span>
                            <h5>
                              <span>
                                {singleAirSial.segments.outbound[0].origin_city_name}, {singleAirSial.segments.outbound[0].Origin}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(singleAirSial.segments.outbound[0].DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                          {/* Stop Details (Desktop View) */}
                          <div className="stop-details">
                            <div className="size-12">
                              {
                                (singleAirSial.segments.outbound.length == 1) ?
                                  'Direct Flight'
                                :
                                  singleAirSial.segments.outbound.length + ' Stops'
                              }
                            </div>
                            <h3 className="dotted-line" />
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(singleAirSial.segments.outbound[0].FlightTime)}
                              </span>
                            </div>
                          </div>
                          {/* Stop Details (Mobile View) */}
                          <div className="mobile-stop-details">
                            <div className="size-12">
                              {
                                (singleAirSial.segments.outbound.length == 1) ?
                                  'Direct Flight'
                                  :
                                  singleAirSial.segments.outbound.length + ' Stops'
                              }
                            </div>
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(singleAirSial.segments.outbound[0].FlightTime)}
                              </span>
                            </div>
                          </div>
                          <div className="arrive-time">
                            <img className="airplane-logo arrive" src={Airplane} />
                            <span>
                              {singleAirSial.segments.outbound[0].ARRIVAL_TIME}
                            </span>
                            <h5>
                              <span>
                                {singleAirSial.segments.outbound[0].Destination_city_name},{' '}
                                {singleAirSial.segments.outbound[0].Destination}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(singleAirSial.segments.outbound[0].DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                        </div>
                        {/* Segment End */}
                      </SegmentSection>
                      {/* Segment Section End */}
                      <div className="price-section">
                        <h3>{`PKR ${Number(singleFlight[0].price)}`}</h3>
                        <p>(incl.taxes & fees)</p>
                      </div>
                    </AirlineContainer>
                  }
                  else if (singleAirSial.segments.inbound)
                  {
                    return <AirlineContainer key={Math.random()}>
                      {/* Segment Section Start */}
                      <SegmentSection>
                        {/* Segment Start */}
                        <div className="segment">
                          <div className="logo-section">
                            <img src={singleAirSial.segments.inbound[0].airline_logo} />
                          </div>
                          <div className="takeoff-time">
                            <img className="airplane-logo takeoff" src={Airplane} />
                            <span>
                              {singleAirSial.segments.inbound[0].DEPARTURE_TIME}
                            </span>
                            <h5>
                              <span>
                                {singleAirSial.segments.inbound[0].origin_city_name}, {singleAirSial.segments.inbound[0].Origin}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(singleAirSial.segments.inbound[0].DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                          {/* Stop Details (Desktop View) */}
                          <div className="stop-details">
                            <div className="size-12">
                              {
                                (singleAirSial.segments.inbound.length == 1) ?
                                  'Direct Flight'
                                  :
                                  singleAirSial.segments.inbound.length + ' Stops'
                              }
                            </div>
                            <h3 className="dotted-line" />
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(singleAirSial.segments.inbound[0].FlightTime)}
                              </span>
                            </div>
                          </div>
                          {/* Stop Details (Mobile View) */}
                          <div className="mobile-stop-details">
                            <div className="size-12">
                              {
                                (singleAirSial.segments.inbound.length == 1) ?
                                  'Direct Flight'
                                  :
                                  singleAirSial.segments.inbound.length + ' Stops'
                              }
                            </div>
                            <div className="flight-time">
                              <span>
                                Flight Time: {time_convert(singleAirSial.segments.inbound[0].FlightTime)}
                              </span>
                            </div>
                          </div>
                          <div className="arrive-time">
                            <img className="airplane-logo arrive" src={Airplane} />
                            <span>
                              {singleAirSial.segments.inbound[0].ARRIVAL_TIME}
                            </span>
                            <h5>
                              <span>
                                {singleAirSial.segments.inbound[0].Destination_city_name},{' '}
                                {singleAirSial.segments.inbound[0].Destination}
                              </span>
                            </h5>
                            <span>
                              <h6>
                                {date_convert(singleAirSial.segments.inbound[0].DEPARTURE_DATE)}
                              </h6>
                            </span>
                          </div>
                        </div>
                        {/* Segment End */}
                      </SegmentSection>
                      {/* Segment Section End */}
                      <div className="price-section">
                        <h3>{`PKR ${Number(singleFlight[1].price)}`}</h3>
                        <p>(incl.taxes & fees)</p>
                      </div>
                    </AirlineContainer>
                  }
                })
              }
              <AirSialRoundSegment
                cabin={cabin}
                singleFlight={singleFlight}
              />
            </AirlineDetailsView>
          </div>
        </ErrorBoundary>
      </FlightDetailsParent>
    )
  }
};

export default AirSialDetailsView;
