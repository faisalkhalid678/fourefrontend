import React from 'react';

import AirlineCarousel from './AirlineCarousel';
import AirlineList from './AirlineList';
import HititList from './HititList';
import AirblueList from './AirblueList';
import AirSialList from './AirSialList';

import { Link } from 'react-router-dom';
import ErrorBoundary from './../../../helper/ErrorBoundary';

function index({ airlines, airlineDetails, direct, oneStop, twoStop, handleFlightKey, selectedAirlines, query, checks }) {
  let flights;
  let outLength;
  let inLength;
  let totalLength;
  window.scrollTo(0, 0);

  const round = (query.returnDate === "undefined") ? false : true;
  
  if (airlines.status == "200") {
    const { api_type } = airlines.result;
    flights = airlines.result.flights;
    if (oneStop && direct && twoStop) {
      flights = flights.filter(function (singleFlight) {
        return singleFlight.segments.length - 1 === 1 ||
          singleFlight.segments.length - 1 >= 2 ||
          singleFlight.segments.length - 1 === 0
      });
    }
  }
  if (direct) {
    if (round) {

      flights = flights.map((singleFlight) => {

        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length === 1) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
          outLength = singleFlight.segments.Outbound.length;
          inLength = singleFlight.segments.Inbound.length;
          totalLength = inLength + outLength;
          
          return (totalLength === 1) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'airblue') {
          return singleFlight
        }
      })

    } else {
      flights = flights.map((singleFlight) => {

        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length === 1) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
       
          return (singleFlight.segments.Outbound.length === 1) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'airblue') {
          return singleFlight
        }
      })
    }

  }
  else if (oneStop) {
    if (round) {

      flights = flights.map((singleFlight) => {
        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length === 2) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
          outLength = singleFlight.segments.Outbound.length;
          inLength = singleFlight.segments.Inbound.length;
          totalLength = inLength + outLength;

          return (totalLength === 2) ? singleFlight : ''
        }
      })

    } else {
      flights = flights.map((singleFlight) => {
        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length === 2) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
          return (singleFlight.segments.Outbound.length === 2) ? singleFlight : ''
        }
      })
    }
  }
  else if (twoStop) {
    if (round) {

      flights = flights.map((singleFlight) => {
        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length >= 3) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
          outLength = singleFlight.segments.Outbound.length;
          inLength = singleFlight.segments.Inbound.length;
          totalLength = inLength + outLength;
          return (totalLength >= 3) ? singleFlight : ''
        }
      })

    } else {
      flights = flights.map((singleFlight) => {
        if (singleFlight.provider_type === 'travelport') {
          return (singleFlight.segments.length >= 3) ? singleFlight : ''
        }
        else if (singleFlight.provider_type === 'hitit') {
          return (singleFlight.segments.Outbound.length >= 3) ? singleFlight : ''
        }
      })
    }
  }

  // filter based on checked airlines
  // convert javascript object to array to filter using includes function
  const selectedAir = [];

  for (const element in selectedAirlines) {
    if (selectedAirlines[element] === true) {
      selectedAir.push(element);
    }
  }
  if (selectedAir.length) {
    flights = flights.map((singleFlight) => {
      if (singleFlight.provider_type === 'travelport') {
        if (singleFlight.segments.every((segment) => selectedAir.includes(segment.Carrier))) {
          return singleFlight;
        }
      }
      else if (singleFlight.provider_type === 'hitit') {
        let singleHitit = singleFlight.segments.Outbound.map((outbound) => {
          let OutCarrier = outbound.segment_data.Carrier;
          if (selectedAir.includes(OutCarrier)) {
            return singleFlight;
          }
        });
        return singleHitit[0];
      }
      else if (singleFlight.provider_type === 'airblue') {
        if (selectedAir.includes(singleFlight.segments.Carrier)) {
          return singleFlight;
        }
      }
      else if (singleFlight.provider_type === 'airsial' && singleFlight.segments.outbound) {
        let singleAirSial = singleFlight.segments.outbound.map((outbound) => {
          let OutCarrier = outbound.Carrier;
          if (selectedAir.includes(OutCarrier)) {
            return singleFlight;
          }
        });
        return singleAirSial[0];
      }
    })
  }

  if (flights) {
    flights = flights.filter(Boolean);
  }
  return (
    <div className="col-md-9 pr-0 flightdetails">
      <AirlineCarousel airlines={airlineDetails} checks={checks} />
      <ErrorBoundary>
        {
          (airlines.status == "200" && flights) ?
            flights.map((flight) => {
              if (flight.provider_type === 'travelport') {
                return <AirlineList query={query} handleFlight={handleFlightKey} key={Math.random()} flight={flight} />
              }
              else if (flight.provider_type === 'hitit') {
                return <HititList query={query} handleFlight={handleFlightKey} key={Math.random()} flight={flight} />
              }
              else if (flight.provider_type === 'airblue') {
                return <AirblueList query={query} handleFlight={handleFlightKey} key={Math.random()} flight={flight} />
              }
              else if (flight.provider_type === 'airsial') {
                return <AirSialList query={query} handleFlight={handleFlightKey} key={Math.random()} flight={flight} />
              }
            })
          :
            (airlines.status == "400" || !flights) &&
              <div style={{ width: '100%', textAlign: 'center' }}>
                <span style={{ color: '#fcb040', fontSize: '30px' }}>No Result Found. Please Try Again</span>
                <div className="flightListBackToHome">
                  <Link to="/">Go Back to Homepage</Link>
                </div>
              </div>
        }
      </ErrorBoundary>
    </div>
  );
}

export default index;
