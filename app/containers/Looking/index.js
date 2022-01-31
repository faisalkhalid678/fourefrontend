/**
 *
 * Looking
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLooking from './selectors';
import reducer from './reducer';
import saga from './saga';
import GoogleMap from './wrappers/GoogleMap';
import Navigation from './Navigation';
import LookingForm from './LookingForm';
import './look.css';

export function Looking() {
  useInjectReducer({ key: 'looking', reducer });
  useInjectSaga({ key: 'looking', saga });

  useEffect(()=> {
    // setSchedule
  },[]);

 const  mapProps = {
    options: {
      center: { lat: 33.7269229, lng: 73.0849311 },
      zoom: 10,
    },
  }
  return (
    <>
      <Helmet>
        <title>Book a Fourecab</title>
        <meta name="description" content="Description of Looking" />
      </Helmet>
      <Navigation />
      <GoogleMap {...mapProps} />
      <LookingForm  /> :
    </>
  );
}

const BookingSectionStyle ={
  transition: '0.5s ease-out',
}

Looking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  looking: makeSelectLooking(),
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

export default compose(withConnect)(Looking);
