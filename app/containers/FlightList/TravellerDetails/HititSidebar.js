import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import { SidebarTravellerDetails } from './wrapper/TravelerDetailsStyle';
import { time_convert } from '../../../helper/ConvertFunctions';

export function HititSidebar ({flight}){
    
    const {price, segments} = flight;

    const lengthOut = segments.Outbound.length;
    // const lengthIn = (segments.Inbound) ? segments.Inbound.length : 0;
    const firstSegment = segments.Outbound[0].segment_data;
    const lastSegment = segments.Outbound[lengthOut - 1].segment_data;
    
    return(
      <SidebarTravellerDetails>
        <ErrorBoundary>
          <div className="additional-info"  >
            <h3>Your Booking</h3>
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>From: </p></div>
                  <div className="col-7"><span className="address">{firstSegment.origin_city_name}</span></div>
                </div>
              </div>
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>To: </p></div>
                  <div className="col-7"><span className="address">{lastSegment.destination_city_name}</span></div>
                </div>
              </div>
              <div className="location" style={{display: (segments.Inbound) ? 'block' : 'none'}}>
                <div className="loc-inner">
                  <div className="text-center">
                    <span className="address bound">{(segments.Inbound) ? 'Round-Trip' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>Total Flight Time: </p></div>
                  <div className="col-7"><span className="flight-info">{time_convert(firstSegment.FlightTime)}</span></div>
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
                  <div className="col-7"><span className="address">{'PKR '+ price}</span></div>
                </div>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="add-sec">
              <div className="location">
                <div className="loc-inner row">
                  <div className="col-5"><p>Price You Pay </p></div>
                  <div className="col-7"><span className="address">{'PKR '+ price}</span></div>
                </div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </SidebarTravellerDetails>
    );
}

export default HititSidebar;