import React, { useState } from 'react';
import OneWay from './OneWay';
import ErrorBoundary from '../../../helper/ErrorBoundary';

export const Flights = ({padding}) => {
  const [status, setStatus] = useState('one-way');
  let date = '';
  if (window.location.pathname === "/cheap-flight-finder")
  {
    date = new Date().setDate(new Date().getDate() + 7);
  }
  else
  {
    date = new Date().setDate(new Date().getDate() + 1);
  }
  
  date = new Date (date);
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [departureDate, setDepartureDate] = useState(date);
  
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
      <div className="flight-radio-btns d-flex justify-content-center">
        <div className="d-flex mt-2 justify-content-center col-6">
          <input
            type="radio"
            name="flight"
            value="one-way"
            onChange={radioHandler}
            checked={status === 'one-way'}
            id="one"
            style={{ width: '15%', height: '15px', marginTop: '4px' }}
          />
          <label htmlFor="one">One Way</label>
        </div>
        <div className="d-flex mt-2 justify-content-center col-6">
          <input
            type="radio"
            name="flight"
            value="round-trip"
            onChange={radioHandler}
            checked={status === 'round-trip'}
            id="round"
            style={{ width: '15%', height: '15px', marginTop: '4px' }}
          />
          <label htmlFor="round">Round Trip</label>
        </div>

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
              padding={padding}
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
              padding={padding}
            />
          </ErrorBoundary>
        </div>
      ) : (
        ''
      )}
    </ErrorBoundary>
  );
};

export default Flights;
