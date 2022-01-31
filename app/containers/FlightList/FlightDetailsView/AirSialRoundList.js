import React, { useState } from 'react';
import { AirlineDetailsView, AirlineContainer, SegmentSection, Details } from '../FlightDetails/wrapper/FlightDetailsStyle';
import { AiFillRightCircle } from 'react-icons/ai';
import Airplane from '../../../assets/img/airplane.png';
import AirSialSegment from '../FlightDetails/segment/AirSialSegment';
import ErrorBoundary from '../../../helper/ErrorBoundary';
import { time_convert, date_convert } from '../../../helper/ConvertFunctions';

export const AirSialRoundList = ({ flight, queryString, setAirsialFlightKey, key }) => {
    const [segment, setSegment] = useState(false);
    const showSegment = () => (segment ? setSegment(false) : setSegment(true));
    
    const { segments, price, availableFareTypes } = flight;
    const { cabin, returnDate } = queryString;
    const totalStops = (segments.inbound) ? segments.inbound.length - 1 : 0;

    const setAirSialKey = (key) => {
        setAirsialFlightKey(key);
    }
    return (
        <ErrorBoundary>
            <AirlineDetailsView key={key}>
                <AirlineContainer>
                    {/* Segment Section Start */}
                    <SegmentSection>
                        {/* Segment Start */}
                        <div className="segment">
                            <div className="logo-section">
                                <img src={segments.inbound[0].airline_logo} />
                            </div>
                            <div className="takeoff-time">
                                <img className="airplane-logo takeoff" src={Airplane} />
                                <span>{segments.inbound[0].DEPARTURE_TIME}</span>
                                <h5>
                                    <span>
                                        {segments.inbound[0].origin_city_name}, {segments.inbound[0].Origin}
                                    </span>
                                </h5>
                                <span>
                                    <h6>{date_convert(segments.inbound[0].DEPARTURE_DATE)}</h6>
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
                                            (totalStops == 1) ?
                                                <>
                                                    {totalStops} Stop
                                                </>
                                                :
                                                'Direct Flight'
                                    }
                                </div>
                                <h3 className="dotted-line" />
                                <div className="flight-time">
                                    <span>Total Flight Time: {time_convert(segments.inbound[0].FlightTime)}</span>
                                    <div>
                                        {(returnDate === 'undefined') ? '' : 'Round-Trip'}
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
                                            (totalStops == 1) ?
                                                <>
                                                    {totalStops} Stop
                                                </>
                                                :
                                                'Direct Flight'
                                    }
                                </div>
                                <div className="flight-time">
                                    <span>Total Flight Time: {time_convert(segments.inbound[0].FlightTime)}
                                    </span>
                                </div>
                            </div>
                            <div className="arrive-time">
                                <img className="airplane-logo arrive" src={Airplane} />
                                <span>{segments.inbound[0].ARRIVAL_TIME}</span>
                                <h5>
                                    <span>
                                        {segments.inbound[0].Destination_city_name}, {segments.inbound[0].Destination}
                                    </span>
                                </h5>
                                <span>
                                    <h6>{date_convert(segments.inbound[0].DEPARTURE_DATE)}</h6>
                                </span>
                            </div>
                        </div>
                        {/* Segment End */}
                    </SegmentSection>
                    {/* Segment Section End */}
                    <div className="price-section">
                        <h3>PKR {Number(price)}</h3>
                        <p>(incl.taxes & fees){' '}</p>
                        <button onClick={() => setAirSialKey(flight.key)} >
                            Select <AiFillRightCircle />
                        </button>
                    </div>
                    <Details>
                        <a onClick={showSegment} to="/"> View Details</a>
                    </Details>
                </AirlineContainer>
                {
                    (segment) &&
                        <AirSialSegment
                            segments={segments}
                            baggage={availableFareTypes[1].DESCRIPTION}
                            cabin={cabin}
                        />
                }
            </AirlineDetailsView>
        </ErrorBoundary>
    );
};