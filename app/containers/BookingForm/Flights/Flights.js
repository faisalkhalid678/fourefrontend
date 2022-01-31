import React, { useState } from 'react';
import OneWay from './OneWay';
import ErrorBoundary from '../../../helper/ErrorBoundary';

export const Flights = ({query, round}) => {
  let state;
  let retDate;
  let depDate;
  
  if (round)
  {
    state = 'round-trip';
    retDate = new Date(query.returnDate);
    depDate = new Date(query.departDate);
  }
  else
  {
    state = 'one-way';
    retDate = '';
    depDate = new Date(query.departDate);
  }

  const [status, setStatus] = useState(state);
  const [fromAirport, setFromAirport] = useState(query.from);
  const [toAirport, setToAirport] = useState(query.to);
  const [departureDate, setDepartureDate] = useState(depDate);
  const [returnDate, setReturnDate] = useState(retDate);

  const onChangeFrom = async (event, { newValue, method }) => {
    setFromAirport(newValue);
  };
  const onChangeTo = async (event, { newValue, method }) => {
    setToAirport(newValue);
  };

  const radioHandler = e => {
    setStatus(e.target.value);
  };

  return (
    <ErrorBoundary>
      <div className="flight-radio-btns">
        <input
          type="radio"
          name="flight"
          value="one-way"
          onChange={radioHandler}
          checked={status === 'one-way'}
          id="one"
          style={{ width: '2%', height: '15px' }}
        />
        <label htmlFor="one">One Way</label>
        <input
          type="radio"
          name="flight"
          value="round-trip"
          onChange={radioHandler}
          checked={status === 'round-trip'}
          id="round"
          style={{ width: '2%', height: '15px' }}
        />
        <label htmlFor="round">Round Trip</label>
        {/* <input type="radio" name="flight" onChange={radioHandler} checked={status === 'multi-trip'} value="multi-trip" /><span>Multi Trip</span> */}
      </div>
      {status === 'one-way' ? (
        <div label="Flight" className="Flight">
          <ErrorBoundary>
            <OneWay
              oneway
              round={false}
              multiple={false}
              fromAirport={fromAirport}
              toAirport={toAirport}
              onChangeFrom={onChangeFrom}
              onChangeTo={onChangeTo}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              adult={Number(query.adult)}
              child={Number(query.children)}
              infant={Number(query.infant)}
              cabin={query.cabin}
            />
          </ErrorBoundary>
        </div>
      ) : (
        ''
      )}
      {status === 'round-trip' ? (
        <div label="Flight" className="Flight">
          <ErrorBoundary>
            <OneWay
              oneway={false}
              round
              multiple={false}
              fromAirport={fromAirport}
              toAirport={toAirport}
              onChangeFrom={onChangeFrom}
              onChangeTo={onChangeTo}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              adult={Number(query.adult)}
              child={Number(query.children)}
              infant={Number(query.infant)}
              cabin={query.cabin}
            />
          </ErrorBoundary>
        </div>
      ) : (
        ''
      )}
      {/* {status === 'multi-trip' ? (
        <div label="Flight" className="Flight">
          <center>
            <h2>Multi-Trip</h2>
            <br />
          </center>
          <OneWay oneway={false} round={false} multiple={true} />
        </div>
      ) : (
        ''
      )} */}
    </ErrorBoundary>
  );
};

export default Flights;
