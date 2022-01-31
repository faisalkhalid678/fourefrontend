import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { SidebarTravellerDetails } from './wrapper/TravelerDetailsStyle';
import { time_convert } from '../../../helper/ConvertFunctions';

export function AirSialSidebar ({flight, query}){
    
    const firstSegment = flight[0];
    
    let totalTime = firstSegment.segments.outbound[0].FlightTime;
    let totalPrice = 0;

    flight.map((flt) => { 
      if (flt.segments.outbound)
      {
        totalPrice += Number(flt.price);
      }
      else if (flt.segments.inbound)
      {
        totalPrice += Number(flt.price);
      }
    });
    
    return(
      <SidebarTravellerDetails>
        <ErrorBoundary>
          <div className="additional-info">
            <h3>Your Booking</h3>
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>From: </p></div>
                  <div className="col-7"><span className="address">{firstSegment.segments.outbound[0].origin_city_name}</span></div>
                </div>
              </div>
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>To: </p></div>
                  <div className="col-7"><span className="address">{firstSegment.segments.outbound[0].Destination_city_name}</span></div>
                </div>
              </div>
              <div className="location" style={{display: (query.returnDate !== 'undefined') ? 'block' : 'none'}}>
                <div className="loc-inner">
                  <div className="text-center">
                    <span className="address bound">{(query.returnDate !== 'undefined') ? 'Round-Trip' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>Total Flight Time: </p></div>
                  <div className="col-7"><span className="flight-info">{time_convert(totalTime)}</span></div>
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
                  <div className="col-7"><span className="address">{'PKR '+ totalPrice}</span></div>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>Price You Pay </p></div>
                  <div className="col-7"><span className="address">{'PKR '+ totalPrice}</span></div>
                </div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </SidebarTravellerDetails>
    );
}

export default AirSialSidebar;