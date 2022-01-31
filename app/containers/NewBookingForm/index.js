/**
 *
 * NewBookingForm
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNewBookingForm from './selectors';
import reducer from './reducer';
import saga from './saga';

import BackgroundSlider from 'react-background-slider';
import { Slider } from './wrapper/NewBookingFormStyle';
import Tabs from './Tabs';
import BookingForm from './Flights/Flights';
import MyBooking from './MyBooking';

// Slider Images
import S1 from '../../assets/img/slider/s1.png';
import S2 from '../../assets/img/slider/s2.png';
import S3 from '../../assets/img/slider/s3.png';
import S4 from '../../assets/img/slider/s4.png';
import S5 from '../../assets/img/slider/s5.png';
import S6 from '../../assets/img/slider/s6.png';
import S7 from '../../assets/img/slider/s7.png';
import S8 from '../../assets/img/slider/s8.png';

export function NewBookingForm() {
  useInjectReducer({ key: 'newBookingForm', reducer });
  useInjectSaga({ key: 'newBookingForm', saga });

  return (
    <Slider id="slider">
      <BackgroundSlider images={[S1, S2, S3, S4, S5, S6, S7, S8]} duration={5} transition={2} />
      <Tabs>
        <div label="Flight">
          <BookingForm padding={true} />
        </div>
        <div label="My Booking">
          <MyBooking/>
        </div>
        <div label="Hotels">
          <div className="New-Booking-Coming-Soon d-flex">
            <img src="/com.jpg" className="justify-content-center align-self-center" />
          </div>
        </div>
        {/* <div label="Tours">
          <div className="New-Booking-Coming-Soon">
            <img src="/com.jpg" />
          </div>
        </div> */}
      </Tabs>
    </Slider>
  );
}

NewBookingForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newBookingForm: makeSelectNewBookingForm(),
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

export default compose(withConnect)(NewBookingForm);
