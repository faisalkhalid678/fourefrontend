/**
 *
 * FlightList
 *
 */

import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import useQueryString from 'use-query-string';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'react-loader-spinner';
import {
  makeSelectFlightList,
  makeSelectQuery,
  makeSelectAirlineCodes,
} from './selectors';
import reducer from './reducer';

import saga from './saga';
import Sidebar from './Sidebar';
import FlightDetails from './FlightDetails';
import FlightDetailsView from './FlightDetailsView';
import Navigation from '../../components/Navigation';
import Footer from './../../components/Footer';
import { requestApiData } from './actions';
import ErrorBoundary from './../../helper/ErrorBoundary';
import ModifySearch from './FlightDetails/ModifySearch';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function updateQ(path) {
  window.history.pushState(null, document.title, path);
}

export function FlightList({
  historyQuery,
  requestApiData,
  flightlist,
  flightCodes,
}) {
  useInjectReducer({ key: 'flightList', reducer });
  useInjectSaga({ key: 'flightList', saga });
  const [flightView, setFlightView] = useState(true);
  const [flightKey, setFlightKey] = useState();
  const [providerType, setProviderType] = useState();
  const [all, setAll] = useState(false);
  const [direct, setDirect] = useState(false);
  const [oneStop, setOneStop] = useState(false);
  const [twoStop, setTwoStop] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [cabin, setCabin] = useQueryString(window.location, updateQ);
  const pagelocation = 'Search Results';
  window.scrollTo(0, 0);

  const { flights, loading } = flightlist;
  const round = (historyQuery.query && historyQuery.query.legs[0].returnDate === undefined) ? false : true;

  let sortFlts = [];
  let tempRound = [];
  let sortedFlights = {};

  useEffect(() => {
    requestApiData(historyQuery);
    setCabin({
      adult: "" + historyQuery.query.travelerCount.numAdult,
      cabin: historyQuery.query.cabinClass.label,
      children: "" + historyQuery.query.travelerCount.numChild,
      departDate: "" + historyQuery.query.legs[0].departureDate,
      from: historyQuery.query.legs[0].origin.iataCode + "|" + historyQuery.query.legs[0].origin.city,
      infant: "" + historyQuery.query.travelerCount.numInfant,
      returnDate: "" + historyQuery.query.legs[0].returnDate,
      to: historyQuery.query.legs[0].destination.iataCode + "|" + historyQuery.query.legs[0].destination.city,
    });
  }, [historyQuery.query, cabin.cabin]);

  const handleChange = e => {
    const filter = e.target.name;
    // if (filter === 'all') {
    //   setAll(!all);
    // } else 
    if (filter == 'direct') {
      (direct) ? setDirect(false) : setDirect(true);
    } else if (filter === 'one-stop') {
      (oneStop) ? setOneStop(false) : setOneStop(true);
    } else {
      (twoStop) ? setTwoStop(false) : setTwoStop(true);
    }

  };

  const handleAirlineChange = event => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFlightKey = (key, provider_type) => {
    setFlightKey(key);
    setFlightView(!flightView);
    setProviderType(provider_type);
  };

  const handleCabinClass = e => {
    let x = e.target.value;
    setCabin({ cabin: x });
    historyQuery.query.cabinClass.label = x;
  };

  // Airline Carousel Filter Activation
  const checks = event => {
    const ids = event.currentTarget.id;
    document.querySelector('#' + ids).checked
      ? ((document.querySelector('#' + ids).checked = false),
        setCheckedItems({
          ...checkedItems,
          [event.currentTarget.id]: document.querySelector('#' + ids).checked,
        }))
      : ((document.querySelector('#' + ids).checked = true),
        setCheckedItems({
          ...checkedItems,
          [event.currentTarget.id]: document.querySelector('#' + ids).checked,
        }));
  };

  if (round && flights.status === "200")
  {
    let airBlueOutCounter = 0;
    let airBlueInCounter = 0;
    let airSialCounter = 0;
    let tempCodes = flightCodes;
    tempRound = flights.result.flights;
    
    tempRound.map((flight) =>
    {
      if (flight.provider_type === 'airblue')
      {
        if(flight.segments.boundType === 'outbound')
        {
          airBlueOutCounter++;
        }
        else if (flight.segments.boundType === 'inbound')
        {
          airBlueInCounter++;
        }
      }
      else if (flight.provider_type === 'airsial' && (flight.segments.inbound && flight.segments.inbound.length > 0))
      {
        airSialCounter++;
      }
    })

    if (airBlueOutCounter == 0 || airBlueInCounter == 0)
    {
      let count = 0;
      for (const x of Array.from(tempRound))
      {
        if (x.provider_type === 'airblue')
        {
          delete tempRound[count];
        }
        count++;
      }
      count = 0;
      for (const y of Array.from(tempCodes))
      {
        if (y.code === 'PA')
        {
          delete tempCodes[count];
        }
        count++;
      }
    }
    tempRound = tempRound.filter(Boolean);
    tempCodes = tempCodes.filter(Boolean);
    if (airSialCounter == 0)
    {
      let count = 0;
      for (const x of Array.from(tempRound))
      {
        if (x.provider_type === 'airsial' &&
        (x.segments.outbound && x.segments.outbound.length > 0))
        {
          delete tempRound[count];
        }
        count++;
      }
      count = 0;
      for (const y of Array.from(tempCodes))
      {
        if (y.code === 'PF')
        {
          delete tempCodes[count];
        }
        count++;
      }
    }
    tempRound = tempRound.filter(Boolean);
    tempCodes = tempCodes.filter(Boolean);

    flightCodes = tempCodes;
    flights.result.flights = tempRound;
  }

  // Flights Sorting
  if (flights.status === "200" && loading === false) {
    let tempFlight = [];
    tempFlight = flights.result.flights;
    sortedFlights.message = flights.message;
    sortedFlights.status = flights.status;
    sortedFlights.result = {};
    sortedFlights.result.api_type = flights.result.api_type;
    sortedFlights.result.flight_type = flights.result.flight_type;

    for (const i of Array.from(tempFlight)) {
      let loc = i;
      let price = 10000000;
      if (tempFlight.length > 0) {
        tempFlight.map((flight, index) => {
          if (flight.price < price) {
            loc = index;
            price = flight.price;
          }
        })
        sortFlts.push(tempFlight[loc]);
        delete tempFlight[loc];
      }
    }
    flights.result.flights = sortFlts;
  }
  
  return (
    <React.Fragment>
      <MetaTags>
        <title>{pagelocation} | Four-E</title>
        <meta name="description" content="#" />
      </MetaTags>
      {loading === true ? (
        <div className="flightlist-loader">
          <h3>Please be patient we are finding best solution for you!</h3>
          <Loader type="Plane" color="#378edd" height={200} width={300} />
        </div>
      ) : (
        <>
          <Navigation />
          <div className="row pt-15 pl-3 pr-3 pb-3 mb-115 mr-0">
            {
              (!flightKey) ?
                <div className="d-flex flex-column w-100 pl-3 pr-3">
                  {/* Modify Search Bar Div Start */}
                  <div className="d-flex flex-column flex-grow-1 mb-1">
                    <ModifySearch query={cabin} round={round} />
                  </div>
                  {/* Modify Search Bar Div End */}
                  <div className="flightlist">
                    <ErrorBoundary>
                      <Sidebar
                        direct={direct}
                        oneStop={oneStop}
                        twoStop={twoStop}
                        cabinClass={cabin}
                        handleAirlineChange={handleAirlineChange}
                        handleChange={handleChange}
                        handleCabinClass={handleCabinClass}
                        airlineDetails={flightCodes}
                        airlines={flights}
                        round={round} 
                      />
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <FlightDetails
                        query={cabin}
                        direct={direct}
                        oneStop={oneStop}
                        twoStop={twoStop}
                        handleFlightKey={handleFlightKey}
                        selectedAirlines={checkedItems}
                        airlineDetails={flightCodes}
                        airlines={flights}
                        checks={checks}
                      />
                    </ErrorBoundary>
                  </div>
                </div>
                :
                <>
                  <ErrorBoundary>
                    <FlightDetailsView queryString={cabin} flights={flights} handleAirlineChange={handleAirlineChange} flightKey={flightKey} round={round}/>
                  </ErrorBoundary>
                </>
            }
          </div>
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  flightlist: makeSelectFlightList(),
  flightCodes: makeSelectAirlineCodes(),
  historyQuery: makeSelectQuery(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestApiData }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FlightList);
