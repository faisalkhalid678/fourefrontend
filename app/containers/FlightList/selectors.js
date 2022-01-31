import React from 'react';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import ErrorBoundary from './../../helper/ErrorBoundary';

/**
 * Direct selector to the flightList state domain
 */

const selectFlightListDomain = state => state.flightList || initialState;

/**
 * Other specific selectors
 */
const selectAirlineCodes = state => state.flightList || initialState;
const selectQuery = state => state.search || initialState;

/**
 * Default selector used by FlightList
 */


const makeSelectFlightList = () =>
  createSelector(
    selectFlightListDomain,
    substate => substate,
  );

let Aircodes = [];
let counter = 0;
let length = 0;
let newFlights = [];
let flightType = '';
let sortedAirlines = [];
let tempAir = [];
  
const makeSelectAirlineCodes = () =>
  createSelector(
    selectAirlineCodes,
    selectQuery,
    (airlist, query) => {
      if (airlist.flights.status != "200")
      {
        return [];
      }
      else
      {
        newFlights = [];
        Aircodes = [];
        sortedAirlines = [];
        tempAir = [];
        flightType = '';
        flightType = airlist.flights.result.flight_type;
        let round = (typeof query.query.legs[0].returnDate == 'undefined') ? false : true;
        <>
          {/* For Flights */}
          <ErrorBoundary>
            {
              airlist.flights.result.flights.map((flt) => {
                counter = 0;
                length = 0;
                flt.flight_type = flightType;
                if(flt.provider_type === 'travelport')
                {
                  let TravelportPrice = Number(flt.price_info.TotalPriceWithCommission);
                  flt.price = TravelportPrice;
                }
                else if (flt.provider_type === 'hitit')
                {
                  let HititPrice = Number(flt.price_info.pricingOverview.TotalPriceWithCommission);
                  flt.price = HititPrice;
                }
                else if (flt.provider_type === 'airblue')
                {
                  let AirbluePrice = Number(flt.pricing_info.TotalPriceWithCommission);
                  flt.price = AirbluePrice;
                }
                else if (flt.provider_type === 'airsial')
                {
                  let AirSialPrice = flt.pricing_info.TotalPriceWithCommission;
                  flt.price = AirSialPrice;
                }
                
                newFlights.push(flt);
              })
            }
          </ErrorBoundary>
          {newFlights = newFlights.filter(Boolean)}
          {/* For Airline Carousel */}
          <ErrorBoundary>
            {
              newFlights.map((flight, index) => {
                if (flight.provider_type === 'travelport')
                {
                  let TravelportPrice = Number(flight.price_info.TotalPriceWithCommission);
                  Aircodes.push({ "code": flight.segments[0].Carrier, "airline_logo": flight.segments[0].airline_logo, "air_name": flight.segments[0].airline_name, "price": TravelportPrice });
                }
                else if (flight.provider_type === 'hitit')
                {
                  let HititPrice = Number(flight.price_info.pricingOverview.TotalPriceWithCommission);
                  
                  Aircodes.push({"code": flight.segments.Outbound[0].segment_data.Carrier, "airline_logo": flight.segments.Outbound[0].segment_data.airline_logo, "air_name": flight.segments.Outbound[0].segment_data.airline_name, "price": HititPrice})
                }
                else if (flight.provider_type === 'airblue')
                {
                  let AirbluePrice = Number(flight.pricing_info.TotalPriceWithCommission);
                  Aircodes.push({"code": flight.segments.Carrier, "airline_logo": flight.segments.airline_logo, "air_name": flight.segments.airline_name, "price": AirbluePrice})
                }
                else if (flight.provider_type === 'airsial')
                {
                  let AirSialPrice = flight.pricing_info.TotalPriceWithCommission;
                  if (flight.segments.outbound)
                  {
                    Aircodes.push({"code": flight.segments.outbound[0].Carrier, "airline_logo": flight.segments.outbound[0].airline_logo, "air_name": flight.segments.outbound[0].airline_name, "price": AirSialPrice})
                  }
                  
                }
              })
            }
          </ErrorBoundary>
        </>
        Aircodes = Aircodes.filter(Boolean);
        tempAir = Aircodes;
        for (const i of Aircodes)
        {
          let loc = i;
          let price = -10000000;
          if(tempAir.length > 0 )
          {
            tempAir.map((air, index) => {
              if(air.price > price)
              {
                loc = index;
                price = air.price;
              }
            })
            sortedAirlines.push(tempAir[loc]);
            delete tempAir[loc];
          }
        }
        sortedAirlines = sortedAirlines.filter(Boolean);
        let codes = sortedAirlines.map(o => o.code);
    
        return sortedAirlines.filter(({ code }, index) => !codes.includes(code, index + 1))
      }
    }
  );

  const makeSelectQuery = () =>
  createSelector(
    selectQuery,
    substate => substate,
  );

// export default makeSelectFlightList;
export {
  makeSelectFlightList,
  makeSelectAirlineCodes,
  selectFlightListDomain,
  selectAirlineCodes,
  selectQuery,
  makeSelectQuery,

};
