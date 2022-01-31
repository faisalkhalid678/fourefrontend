/**
 *
 * FlightDetailsView
 *
 */

import React, { memo, useState } from 'react';
import MetaTags from "react-meta-tags";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFlightDetailsView from './selectors';
import {requestSingle, addQuery } from './actions';
import reducer from './reducer';
import saga from './saga';
import FareRulesmodal from './FareRulesmodal';
import TravelportDetailsView from './TravelportDetailsView.js';
import ErrorBoundary from './../../../helper/ErrorBoundary';
import ModifySearch from '../FlightDetails/ModifySearch';

import HititDetailsView from './HititDetailsView';
import AirBlueDetailsView from './AirBlueDetailsView';
import AirSialDetailsView from './AirSialDetailsView';

import {
  FlightDetailsParent,
} from '../FlightDetails/wrapper/FlightDetailsStyle';


export function FlightDetailsView({requestSingle, queryString, addQuery, flights, flightKey, round}) {
  useInjectReducer({ key: 'flightDetailsView', reducer });
  useInjectSaga({ key: 'flightDetailsView', saga });
  const history = useHistory();
  window.scrollTo(0, 0);

  const pagelocation = queryString.from.slice(0,3) + ' - ' + queryString.to.slice(0,3);

  // get selected flight from flight lists
  
  let singleFlight = '';
  if (flightKey) {
      singleFlight= flights.result.flights.map((Flight) => {
        if (Flight.provider_type === 'hitit' || Flight.provider_type === 'airblue' || Flight.provider_type === 'airsial')
        {
          if (Flight.key === flightKey)
          {
            return Flight;
          }
        }
        else if (Flight.provider_type === 'travelport')
        {
          if(Flight.segments.some((segment) => segment.Key === flightKey ))
          {
            return Flight
          }
        }
      })
  }
  
  singleFlight = singleFlight.filter(Boolean);

  const [show, setShow] = useState(false);
  const [disp, setDisp] = useState(false);
  const showModal = () => {
    setShow(true);
    setDisp(true);
  };

  const navigateTo = () => {
    requestSingle(singleFlight);
    addQuery(queryString);
    history.push('/traveller/?key='+flightKey);
  };
  return (
    <React.Fragment>
      <MetaTags>
        <title>{pagelocation} | Four-E</title>
        <meta
          name="description"
          content="#"
        />
      </MetaTags>
      {
        (flights.result  != null) ? 
          <>
            {/* Modify Search Bar Div Start */}
            <div className="d-flex flex-column flex-grow-1 pl-2 pr-2">
              <ModifySearch query={queryString} round={round} />
            </div>
            {/* Modify Search Bar Div End */}
            <FlightDetailsParent>
              <ErrorBoundary>
                {
                  singleFlight.map((flight) => {
                    if(flight.provider_type === 'travelport')
                    {
                      return <TravelportDetailsView navigateTo={navigateTo} showModal={showModal} queryString={queryString} singleFlight={singleFlight[0]} key={Math.random()} />
                    }
                    else if (flight.provider_type === 'hitit')
                    {
                      return <HititDetailsView navigateTo={navigateTo} showModal={showModal} queryString={queryString} singleFlight={singleFlight[0]} key={Math.random()} />
                    }
                    else if (flight.provider_type === 'airblue')
                    {
                      return <AirBlueDetailsView 
                        navigateTo={navigateTo} 
                        showModal={showModal} 
                        queryString={queryString} 
                        singleFlight={singleFlight} 
                        flights={flights}
                        key={Math.random()} />
                    }
                    else if (flight.provider_type === 'airsial')
                    {
                      return <AirSialDetailsView 
                        navigateTo={navigateTo} 
                        showModal={showModal}
                        queryString={queryString}
                        singleFlight={singleFlight}
                        flights={flights}
                        key={Math.random()} />
                    }
                  })
                }
              </ErrorBoundary>
            </FlightDetailsParent>
            {/* modal start from here */}
            <FareRulesmodal singleFlight={singleFlight} disp={disp} queryString={queryString} show={show} flightKey={flightKey} setShow={setShow} setDisp={setDisp}/>
          </>
        : 
          ''
      }
    </React.Fragment>
    
  );
}


const container = document.createElement('div');
document.body.appendChild(container);
FlightDetailsView.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  flightDetailsView: makeSelectFlightDetailsView(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({requestSingle,addQuery}, dispatch)
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FlightDetailsView);
