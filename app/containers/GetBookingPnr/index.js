/**
 *
 * GetBookingPnr
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGetBookingPnr from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestPnrFlight } from './actions';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// Ticket Imports
import TravelportTicket from './TravelportTicket';
import HititTicket from './HititTicket';
import AirblueTicket from './AirblueTicket';
import AirSialTicket from './AirSialTicket';

import { FailedBooking } from './wrapper/GetBookingStyle';

import MetaTags from "react-meta-tags";
import Navigation from './../../components/Navigation';
import Footer from './../../components/Footer';
import { useParams } from 'react-router-dom';

export function GetBookingPnr({ getBookingPnr, requestPnrFlight }) {
  useInjectReducer({ key: 'getBookingPnr', reducer });
  useInjectSaga({ key: 'getBookingPnr', saga });

  const { booking, loading} = getBookingPnr;
  const pagelocation = 'My Booking';
  const params = useParams();
  let obj = {};

  let split = params.pnr.split('&');
  let pnr = split[0].split('=');
  let lastName = split[1].split('=');
  let page = split[2].split('=');
  
  obj.pnr = pnr[1];
  obj.last_name = lastName[1];
  if (page[1] === '200')
  {
    obj.endpoint = '/get-booking-by-pnr';
  }
  else
  {
    obj.endpoint = '/get-booking-by-pnr-db';
  }
  
  useEffect(() => {
    try {
      requestPnrFlight(obj);
    } catch (error) {

    }
    // return () => {
    //   requestPnrFlight(obj);
    // }
  }, [])

  const getBooking = () => {
    let provider_type = (loading == false && booking.status === '200') ? booking.data.provider_type : '400';
    
    if (provider_type === 'travelport')
    {
      return <TravelportTicket bookingData={booking} />;
    }
    else if (provider_type === 'hitit')
    {
      return <HititTicket bookingData={booking} />
    }
    else if (provider_type === 'airblue')
    {
      return <AirblueTicket bookingData={booking} />
    }
    else if (provider_type === 'airsial')
    {
      return <AirSialTicket bookingData={booking} />
    }
    else if (provider_type === '400')
    {
      return  <FailedBooking className="d-flex flex-column">
                <h4>Booking Not Found.</h4>
                <div className="foot">
                  <Link to="/">Go Back to Homepage</Link>
                </div>
              </FailedBooking>;
    }
  }

  return (
    <>
      <MetaTags>
        <title>{pagelocation} | Four-E</title>
        <meta
          name="description"
          content="#"
        />
      </MetaTags>
      <Navigation />
      {
        (loading) ?
          <div className="flightlist-loader">
            <h3>Please wait. We Are Retrieving Your Information!</h3>
            <Loader type="Plane" color="#378edd" height={200} width={300} />
          </div>
        :
          getBooking()
      }
      <Footer />
    </>
  );
}

// GetBookingPnr.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  getBookingPnr: makeSelectGetBookingPnr(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { requestPnrFlight },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(GetBookingPnr);
