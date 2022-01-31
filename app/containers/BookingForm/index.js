/**
 *
 * BookingForm
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectBookingForm from './selectors';
import Tabs from './Tabs';
import Flights from './Flights/Flights';
import Ride from './Ride/Ride';
import Earn from './Earn/Earn';
import BusBooking from './BusBooking/BusBooking';
import Bike from './Bike/Bike';
import CityToCity from './CityToCity/CityToCity';
export class BookingForm extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <Tabs>
          <div label="Flight">
            <Flights />
          </div>
          <div label="Ride">
            <Ride />
          </div>
          <div label="Earn">
            <Earn />
          </div>
          <div label="Bus Booking">
            <BusBooking />
          </div>
          <div label="Bike">
            <Bike />
          </div>
          <div label="City To City">
            <CityToCity />
          </div>
        </Tabs>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bookingForm: makeSelectBookingForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookingForm);
