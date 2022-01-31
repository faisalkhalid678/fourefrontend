/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Tours from '../NavLinks/Tours';
import GroupTravel from '../NavLinks/GroupTravel';
import CheapFlights from '../NavLinks/CheapFlightFinder';
import PaymentOption from '../NavLinks/PaymentOption';
import VisaAssistance from '../NavLinks/VisaAssistance';
import RefundApplications from '../NavLinks/RefundApplications';
import TermsConditions from '../NavLinks/Terms';
import ModifyBooking from '../NavLinks/ModifyBooking';
import CheapHotels from '../NavLinks/CheapHotels';
import UmrahPackages from '../NavLinks/UmrahPackages';
import TravelInsurance from '../NavLinks/TravelInsurance';
import FoureRental from '../NavLinks/FoureRental';
import FoureTours from '../NavLinks/FoureTours';
import BeforeYouFly from '../NavLinks/BeforeYouFly';
import About from '../../containers/NavLinks/About';
import Contact from '../NavLinks/Contact';
import FlightList from './../FlightList';
import FlightDetailsView from '../FlightList/FlightDetailsView';
import TravellerDetails from '../FlightList/TravellerDetails';
import PaymentConfirmation from '../FlightList/PaymentConfirmation';
import MyBooking from '../GetBookingPnr';
import { ToastContainer } from 'react-toastify';

// Css
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/magnific-popup/dist/magnific-popup.css';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/font-awesome.min.css';
import '../../assets/css/flaticon.css';
import '../../assets/css/default.css';
import '../../assets/css/style.css';
import '../../assets/css/index.css';

export default function App() {
  return (
    <Router>
      <Switch>
        {/* Header Links */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tours" component={Tours} />
        <Route exact path="/group-travel" component={GroupTravel} />

        {/* Body Links */}
        <Route exact path='/flight-list/:from?' component={FlightList} />
        <Route exact path='/flight-details-view' component={FlightDetailsView} />
        <Route exact path='/traveller/:key?' component={TravellerDetails} />
        <Route exact path='/confirmation/:key?' component={PaymentConfirmation} />
        <Route exact path='/booking/:pnr' component={MyBooking} />

        {/* Footer Links */}
        <Route exact path="/cheap-flight-finder" component={CheapFlights} />
        <Route exact path="/before-your-fly" component={BeforeYouFly} />
        <Route exact path="/payment-options" component={PaymentOption} />
        <Route exact path="/visa-assistance" component={VisaAssistance} />
        <Route exact path="/refund-applications" component={RefundApplications} />
        <Route exact path="/terms-and-conditions" component={TermsConditions} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/contact-us" component={Contact} />
        <Route exact path="/modify-booking" component={ModifyBooking} />
        <Route exact path="/cheap-hotels" component={CheapHotels} />
        <Route exact path="/umrah-packages" component={UmrahPackages} />
        <Route exact path="/travel-insurance" component={TravelInsurance} />
        <Route exact path="/foure-rental" component={FoureRental} />
        <Route exact path="/foure-tours" component={FoureTours} />
        <Route exact component={NotFoundPage} />
        <ToastContainer />
      </Switch>
    </Router>
  );
}
