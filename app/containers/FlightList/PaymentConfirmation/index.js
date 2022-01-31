/**
 *
 * PaymentConfirmation
 *
 */

import React, { memo } from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPaymentConfirmation from './selectors';
import reducer from './reducer';
import saga from './saga';
import Navigation from '../../../components/Navigation';
import Loader from 'react-loader-spinner';
import Footer from './../../../components/Footer';
import TravelportTicket from './TravelportTicket';
import HititTicket from './HititTicket';
import AirblueTicket from './AirblueTicket';
import AirSialTicket from './AirSialTicket';

import { LoaderMain, FailedBooking } from './wrapper/ConfirmPaymentStyle';

import ErrorBoundary from './../../../helper/ErrorBoundary';

export function PaymentConfirmation({ paymentConfirmation }) {
  window.onbeforeunload = function () {
    return "Your Booking Details Have Been Emailed to You";
  }
  useInjectReducer({ key: 'paymentConfirmation', reducer });
  useInjectSaga({ key: 'paymentConfirmation', saga });

  const bookingData = (paymentConfirmation.travellerDetails) ? paymentConfirmation.travellerDetails.bookingResponse : { statuss: '400' };
  const query = paymentConfirmation.search.query;
  window.scrollTo(0, 0);

  // Airline Filter Function
  const airlineFilter = (bookingData) => {

    if (bookingData.status === '400') {
      return (
        <FailedBooking className="d-flex flex-column">
          <h4>Booking Unsuccessful. Please Try Again.</h4>
          <div className="foot">
            <Link to="/">Go Back to Homepage</Link>
          </div>
        </FailedBooking>
      );
    }
    else if (bookingData.data.provider_type === 'travelport') {
      return <TravelportTicket bookingData={bookingData} query={query} />
    }
    else if (bookingData.data.provider_type === 'hitit') {
      return <HititTicket bookingData={bookingData} query={query} />
    }
    else if (bookingData.data.provider_type === 'airblue') {
      return <AirblueTicket bookingData={bookingData} query={query} />
    }
    else if (bookingData.data.provider_type === 'airsial' || bookingData.data.validTill) {
      return <AirSialTicket bookingData={bookingData} query={query} />
    }

  }

  return (
    <>
      <MetaTags>
        <title>
          {
            (paymentConfirmation.travellerDetails && paymentConfirmation.travellerDetails.loading === true) ?
              'Loading | '
              :
              (bookingData.statuss === '400') ?
                ''
                :
                (!paymentConfirmation.travellerDetails || bookingData.status === '400') ?
                  'Booking Unsuccessful | '
                  :
                  'Booking Successful | '
          }Four-E
        </title>
        <meta
          name="description"
          content="#"
        />
      </MetaTags>
      <Navigation />
      {
        (paymentConfirmation.travellerDetails && paymentConfirmation.travellerDetails.loading) ?
          <LoaderMain>
            <h3>Please be patient. Your Details are being retrieved!</h3>
            <Loader type="Plane" color="#378edd" height={200} width={300} />
          </LoaderMain>
          :
          <>
            <ErrorBoundary>
              {
                (bookingData.statuss === '400') ?
                  <FailedBooking className="d-flex flex-column">
                    <h4>Your Booking Details Have Been Emailed to You.</h4>
                    <div className="foot">
                      <Link to="/">Go Back to Homepage</Link>
                    </div>
                    {/* {window.onbeforeunload} */}
                  </FailedBooking>
                  :
                  (bookingData.data) ?
                    airlineFilter(bookingData)
                    :
                    <FailedBooking className="d-flex flex-column">
                      <h4>Booking Unsuccessful. Please Try Again.</h4>
                      <div className="foot">
                        <Link to="/">Go Back to Homepage</Link>
                      </div>
                    </FailedBooking>
              }
            </ErrorBoundary>
          </>
      }
      <Footer />
    </>
  );

}

// PaymentConfirmation.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  paymentConfirmation: makeSelectPaymentConfirmation(),
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

export default compose(
  withConnect,
  memo,
)(PaymentConfirmation);
