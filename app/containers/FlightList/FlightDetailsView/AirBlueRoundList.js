import React, { useState } from 'react';
import { AirlineDetailsView, AirlineContainer, SegmentSection, Details } from '../FlightDetails/wrapper/FlightDetailsStyle';
import { AiFillRightCircle } from 'react-icons/ai';
import Airplane from '../../../assets/img/airplane.png';
import Airbluesegment from '../FlightDetails/segment/Airbluesegment';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { diff_minutes, date_convert, utc_convert } from '../../../helper/ConvertFunctions';

export const AirBlueRoundList = ({ flight, queryString, setAirblueFlightKey, key }) => {
    const [segment, setSegment] = useState(false);
    const showSegment = () => (segment ? setSegment(false) : setSegment(true));

    const { cabin } = queryString;

    const setAirBlueKey = (key) =>
    {
        setAirblueFlightKey(key);
    }
    
    return (
        <AirlineDetailsView key={key}>
            <ErrorBoundary>
                <AirlineContainer>
                    {/* Segment Section Start */}
                    <SegmentSection>
                        {/* Segment Start */}
                        <div key={flight.key} className="segment">
                            <div className="logo-section">
                                <img src={flight.segments.airline_logo} />
                            </div>
                            <div className="takeoff-time">
                                <img className="airplane-logo takeoff" src={Airplane} />
                                <span>
                                    {utc_convert(new Date(flight.segments.DepartureDateTime).toString())}
                                </span>
                                <h5>
                                    <span>
                                        {flight.segments.origin_city_name}, {flight.segments.Origin}
                                    </span>
                                </h5>
                                <span>
                                    <h6>{date_convert(flight.segments.DepartureDateTime)}</h6>
                                </span>
                            </div>

                            {/* Stop Details (Desktop View) */}
                            <div className="stop-details">
                                <div className="size-12">Direct Flight</div>
                                <h3 className="dotted-line" />
                                <div className="flight-time">
                                    <span>Flight Time: {diff_minutes(flight.segments.DepartureDateTime, flight.segments.ArrivalDateTime)}</span>
                                    <div>
                                        {(queryString.returnDate === 'undefined') ? '' : 'Round-Trip'}
                                    </div>
                                </div>
                            </div>
                            {/* Stop Details (Mobile View) */}
                            <div className="mobile-stop-details">
                                <div className="size-12">Direct Flight</div>
                                <div className="flight-time">
                                    <span>Flight Time: {diff_minutes(flight.segments.DepartureDateTime, flight.segments.ArrivalDateTime)}</span>
                                    <div>
                                        {(queryString.returnDate === 'undefined') ? '' : 'Round-Trip'}
                                    </div>
                                </div>
                            </div>
                            <div className="arrive-time">
                                <img className="airplane-logo arrive" src={Airplane} />
                                <span>
                                    {utc_convert(new Date(flight.segments.ArrivalDateTime).toString())}
                                </span>
                                <h5>
                                    <span>
                                        {flight.segments.Destination_city_name}, {flight.segments.Destination}
                                    </span>
                                </h5>
                                <span>
                                    <h6>{date_convert(flight.segments.ArrivalDateTime)}</h6>
                                </span>
                            </div>
                        </div>
                        {/* Segment End */}
                    </SegmentSection>
                    {/* Segment Section End */}
                    <div className="price-section">
                        <h3>PKR {Number(flight.price)}</h3>
                        <p>(incl.taxes & fees){' '}</p>
                        <button onClick={() => setAirBlueKey(flight.key)} >
                            Select <AiFillRightCircle />
                        </button>
                    </div>
                    <Details>
                        <a onClick={showSegment} to="/">View Details</a>
                    </Details>
                </AirlineContainer>
                {
                    (segment) &&
                        <Airbluesegment
                            flight={flight}
                            cabin={cabin}
                            segments={flight.segments}
                        />
                }
            </ErrorBoundary>
        </AirlineDetailsView>
    );
};