import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { SidebarTravellerDetails } from './wrapper/TravelerDetailsStyle';
import { diff_minutes } from '../../../helper/ConvertFunctions';

export default function AirblueSidebar({ flight, query }) {
    const round = (query.returnDate === 'undefined') ? false : true;
    
    let totalPrice = 0;
    let CurrencyCode = flight[0].pricing_info.TotalPrice.CurrencyCode;
    
    flight.map((flt) => {
        totalPrice += Number(flt.price);
    });
    return (
        <SidebarTravellerDetails>
            <ErrorBoundary>
                <div className="additional-info"  >
                    <h3>Your Booking</h3>
                    <div className="add-sec">
                        <div className="location">
                            <div className="loc-inner row">
                                <div className="col-5"><p>From: </p></div>
                                <div className="col-7"><span className="address">{flight[0].segments.origin_city_name}</span></div>
                            </div>
                        </div>
                        <div className="location">
                            <div className="loc-inner row">
                                <div className="col-5"><p>To: </p></div>
                                <div className="col-7"><span className="address">{flight[0].segments.Destination_city_name}</span></div>
                            </div>
                        </div>
                        <div className="location" style={{ display: (round) ? 'block' : 'none' }}>
                            <div className="loc-inner">
                                <div className="text-center">
                                    <span className="address bound">{(round) ? 'Round-Trip' : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="add-sec">
                        <div className="location">
                            <div className="loc-inner row">
                                <div className="col-5"><p>Total Flight Time: </p></div>
                                <div className="col-7"><span className="flight-info">{diff_minutes(flight[0].segments.DepartureDateTime, flight[0].segments.ArrivalDateTime)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="additional-info">
                    <h3>Summary</h3>
                    <div className="add-sec">
                        <div className="location">
                            <div className="loc-inner row">
                                <div className="col-5"><p>Four-E Flight </p></div>
                                <div className="col-7"><span className="address">{CurrencyCode + ' ' + totalPrice}</span></div>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="add-sec">
                        <div className="location">
                            <div className="loc-inner row">
                                <div className="col-5"><p>Price You Pay </p></div>
                                <div className="col-7"><span className="address">{CurrencyCode + ' ' + totalPrice}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </SidebarTravellerDetails>
    );
}