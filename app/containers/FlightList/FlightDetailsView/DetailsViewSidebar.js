import React from 'react';

import { SidebarDetailsView } from '../FlightDetails/wrapper/FlightDetailsStyle';
import ErrorBoundary from './../../../helper/ErrorBoundary';

export const DetailsViewSidebar = ({ queryString, showModal, singleFlight, navigateTo, airBlueKey, airSialKey }) => {

  const flightPrice = (singleFlight) => {
    if (singleFlight.provider_type === 'travelport') {
      return (
        <>
          <ErrorBoundary>
            <div className="additional-info">
              <h3>Summary</h3>
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                  </div>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="continue-btn">
              <button onClick={navigateTo}>Continue Booking</button>
            </div>
          </ErrorBoundary>
        </>
      )
    }
    else if (singleFlight.provider_type === 'hitit') {
      return (
        <>
          <ErrorBoundary>
            <div className="additional-info">
              <h3>Summary</h3>
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                  </div>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="continue-btn">
              <button onClick={navigateTo}>Continue Booking</button>
            </div>
          </ErrorBoundary>
        </>
      )
    }
    else if (singleFlight.provider_type === 'airblue') {
      if (queryString.returnDate === 'undefined') {
        return (
          <>
            <ErrorBoundary>
              <div className="additional-info">
                <h3>Summary</h3>
                <div className="add-sec">
                  <div className="location">
                    <div className="loc-inner row">
                      <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                      <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{singleFlight.pricing_info.TotalPrice.CurrencyCode + ' ' + singleFlight.price}</span></div>
                    </div>
                  </div>
                </div>
                <hr className="mt-0" />
                <div className="add-sec">
                  <div className="location">
                    <div className="loc-inner row">
                      <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                      <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{singleFlight.pricing_info.TotalPrice.CurrencyCode + ' ' + singleFlight.price}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="continue-btn">
                <button onClick={navigateTo}>Continue Booking</button>
              </div>
            </ErrorBoundary>
          </>
        )
      }
      else if (queryString.returnDate !== 'undefined' && airBlueKey === null) {
        return ('')
      }
    }
    else if (singleFlight.provider_type === 'airsial') {
      if (queryString.returnDate === 'undefined')
      {
        return (
          <>
            <ErrorBoundary>
              <div className="additional-info">
                <h3>Summary</h3>
                <div className="add-sec">
                  <div className="location">
                    <div className="loc-inner row">
                      <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                      <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                    </div>
                  </div>
                </div>
                <hr className="mt-0" />
                <div className="add-sec">
                  <div className="location">
                    <div className="loc-inner row">
                      <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                      <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + singleFlight.price}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="continue-btn">
                <button onClick={navigateTo}>Continue Booking</button>
              </div>
            </ErrorBoundary>
          </>
        )
      }
      else if (queryString.returnDate !== 'undefined' && airSialKey === null)
      {
        return ('');
      }
    }
    else if (singleFlight[0].provider_type === 'airblue' && queryString.returnDate !== 'undefined' && airBlueKey !== null) {
      let CurrencyCode = 'PKR';
      let totalPrice = 0;
      singleFlight.map((flt) => { totalPrice += Number(flt.price) });
      return (
        <>
          <ErrorBoundary>
            <div className="additional-info">
              <h3>Summary</h3>
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{CurrencyCode + ' ' + totalPrice}</span></div>
                  </div>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{CurrencyCode + ' ' + totalPrice}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="continue-btn">
              <button onClick={navigateTo}>Continue Booking</button>
            </div>
          </ErrorBoundary>
        </>
      );
    }
    else if (singleFlight[0].provider_type === 'airsial' && queryString.returnDate !== 'undefined' && airSialKey !== null) {
      let totalPrice = 0;
      singleFlight.map((flt) => { totalPrice += Number(flt.price) });
      return (
        <>
          <ErrorBoundary>
            <div className="additional-info">
              <h3>Summary</h3>
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Four-E Flight </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + totalPrice}</span></div>
                  </div>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>Price You Pay </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{'PKR ' + totalPrice}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="continue-btn">
              <button onClick={navigateTo}>Continue Booking</button>
            </div>
          </ErrorBoundary>
        </>
      );
    }
  };
  return (
    <ErrorBoundary>
      <SidebarDetailsView>
        <div className="additional-info">
          <h3>Additional Information</h3>
          {
            (!queryString) ?
              ''
              :
              <div className="add-sec">
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>From: </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{queryString.from.slice(5)}</span></div>
                  </div>
                </div>
                <div className="location">
                  <div className="loc-inner row">
                    <div className="col-7"><p style={{fontSize: '14px !important'}}>To: </p></div>
                    <div className="col-5"><span className="address" style={{fontSize: '14px !important'}}>{queryString.to.slice(5)}</span></div>
                  </div>
                </div>
              </div>
          }
          <span>
            <h3>Fare Rules</h3>
            <p>
              Any cancellation or changes made to this booking may be subject
              to airline fees, please check fare rules before requesting for a
              refund.
            </p>
            <a type="button" onClick={showModal}> Check Fare Rules </a>
          </span>

        </div>
        {flightPrice(singleFlight)}
      </SidebarDetailsView>
    </ErrorBoundary>
  )
}

export default DetailsViewSidebar;