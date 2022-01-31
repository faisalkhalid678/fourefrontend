/**
 *
 * Ride
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

import { BookingForm } from '../BookingForm';
import Testimonials from '../../components/HomepageSections/Testimonials';
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';

export function Ride() {
  useInjectSaga({ key: 'ride', saga });

  return (
    <React.Fragment>
      <Navigation service="Cab" />
      <BookingForm />
      <Testimonials />
      <Footer />
    </React.Fragment>
  );
}

Ride.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Ride);
