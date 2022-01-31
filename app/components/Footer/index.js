import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Backtotop from './Backtotop';

class Footer extends Component 
{
  state = {
    TravellerTools: false,
    QuickLinks: false,
    AboutUs: false,
    CheapFlights: false,
    FlightExtras: false
  };
  render() {
    return (
      <Fragment>
        <Backtotop />
        <footer>
          <div className="footer-subscibe-area pt-30 pb-30">
            {/* Desktop View Footer Links */}
            <div className="d-flex flex-row justify-content-center footer-desktop-view">
              <div className="col-2">
                <h5 className="font-weight-bold">Traveller Tools</h5>
                <ul className="mt-20">
                  <li><Link to="/cheap-flight-finder">Cheap Flight Finder</Link> </li>
                  <li><Link to="/before-your-fly">Before You Fly</Link> </li>
                  <li><Link to="/payment-options">Payment Options</Link> </li>
                  <li><Link to="/group-travel">Group Travel</Link> </li>
                  <li><a href="https://admin.foureflights.com">Employee / Admin Login</a> </li>
                </ul>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Quick Links</h5>
                <ul className="mt-20">
                  <li><Link to="/modify-booking">Change / Cancel Your Booking</Link> </li>
                  <li><Link to="/refund-applications">Refund Applications</Link> </li>
                  <li><Link to="/visa-assistance">Visa Assistance</Link> </li>
                </ul>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">About Us</h5>
                <ul className="mt-20">
                  <li><Link to="/about-us">About Four-E Flights</Link> </li>
                  <li><Link to="/contact-us">Contact Us</Link> </li>
                  <li><Link to="/terms-and-conditions">Terms & Conditions</Link> </li>
                </ul>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Cheap Flights</h5>
                <ul className="mt-20">
                  <li><Link to="javasctipt:void(0)">Dubai</Link> </li>
                  <li><Link to="javasctipt:void(0)">Doha</Link> </li>
                  <li><Link to="javasctipt:void(0)">Istanbul</Link> </li>
                  <li><Link to="javasctipt:void(0)">London</Link> </li>
                </ul>
              </div>
              <div className="col-2">
                <h5 className="font-weight-bold">Flight Extras</h5>
                <ul className="mt-20">
                  <li><Link to="/">Umrah Packages</Link> </li>
                  <li><Link to="/cheap-hotels">Cheap Hotels</Link> </li>
                  <li><Link to="/travel-insurance">Travel Insurance</Link> </li>
                  <li><Link to="/foure-rental">Four-E Car Rental</Link> </li>
                  <li><Link to="/foure-tours">Four-E Tours</Link> </li>
                </ul>
              </div>
            </div>
            {/* Mobile View Footer Links */}
            <div className="flex-column ml-30 mr-30 footer-mobile-view">
              <div className="col-12 p-3 mb-4">
                <div className="mobile-footer-title justify-content-between d-flex" 
                  onClick=
                  {
                    () =>
                      this.setState(prevState => (
                      {
                        TravellerTools: !prevState.TravellerTools,
                        QuickLinks: false,
                        AboutUs: false,
                        CheapFlights: false,
                        FlightExtras: false,
                      }))
                  }
                >
                  <h5 className="font-weight-bold">Traveller Tools</h5>
                  <i className={(this.state.TravellerTools) ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
                </div>
                {
                  (this.state.TravellerTools) ?
                    <ul className="mt-20">
                      <li><Link to="/cheap-flight-finder">Cheap Flight Finder</Link> </li>
                      <li><Link to="/before-your-fly">Before You Fly</Link> </li>
                      <li><Link to="/payment-options">Payment Options</Link> </li>
                      <li><Link to="/group-travel">Group Travel</Link> </li>
                      <li><a href="https://admin.foureflights.com">Employee / Admin Login</a> </li>
                    </ul>
                  :
                    ''
                }
              </div>
              <div className="col-12 p-3 mb-4">
                <div className="mobile-footer-title justify-content-between d-flex" 
                  onClick=
                  {
                    () =>
                      this.setState(prevState => (
                      {
                        TravellerTools: false,
                        QuickLinks: !prevState.QuickLinks,
                        AboutUs: false,
                        CheapFlights: false,
                        FlightExtras: false,
                      }))
                  }
                >
                  <h5 className="font-weight-bold">Quick Links</h5>
                  <i className={(this.state.QuickLinks) ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
                </div>
                {
                  (this.state.QuickLinks) ?
                    <ul className="mt-20">
                      <li><Link to="/modify-booking">Change / Cancel Your Booking</Link> </li>
                      <li><Link to="/refund-applications">Refund Applications</Link> </li>
                      <li><Link to="/visa-assistance">Visa Assistance</Link> </li>
                    </ul>
                  :
                    ''
                }
              </div>
              <div className="col-12 p-3 mb-4">
                <div className="mobile-footer-title justify-content-between d-flex" 
                  onClick=
                  {
                    () =>
                      this.setState(prevState => (
                      {
                        TravellerTools: false,
                        QuickLinks: false,
                        AboutUs: !prevState.AboutUs,
                        CheapFlights: false,
                        FlightExtras: false,
                      }))
                  }
                >
                  <h5 className="font-weight-bold">About Us</h5>
                  <i className={(this.state.AboutUs) ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
                </div>
                {
                  (this.state.AboutUs) ?
                    <ul className="mt-20">
                      <li><Link to="/about-us">About Four-E Flights</Link> </li>
                      <li><Link to="/contact-us">Contact Us</Link> </li>
                      <li><Link to="/terms-and-conditions">Terms & Conditions</Link> </li>
                    </ul>
                  :
                    ''
                }
              </div>
              <div className="col-12 p-3 mb-4">
                <div className="mobile-footer-title justify-content-between d-flex" 
                  onClick=
                  {
                    () =>
                      this.setState(prevState => (
                      {
                        TravellerTools: false,
                        QuickLinks: false,
                        AboutUs: false,
                        CheapFlights: !prevState.CheapFlights,
                        FlightExtras: false,
                      }))
                  }
                >
                  <h5 className="font-weight-bold">Cheap Flights</h5>
                  <i className={(this.state.CheapFlights) ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
                </div>
                {
                  (this.state.CheapFlights) ?
                    <ul className="mt-20">
                      <li><Link to="javasctipt:void(0)">Dubai</Link> </li>
                      <li><Link to="javasctipt:void(0)">Doha</Link> </li>
                      <li><Link to="javasctipt:void(0)">Istanbul</Link> </li>
                      <li><Link to="javasctipt:void(0)">London</Link> </li>
                    </ul>
                  :
                    ''
                }
              </div>
              <div className="col-12 p-3 mb-4">
                <div className="mobile-footer-title justify-content-between d-flex" 
                  onClick=
                  {
                    () =>
                      this.setState(prevState => (
                      {
                        TravellerTools: false,
                        QuickLinks: false,
                        AboutUs: false,
                        CheapFlights: false,
                        FlightExtras: !prevState.FlightExtras,
                      }))
                  }
                >
                  <h5 className="font-weight-bold">Flight Extras</h5>
                  <i className={(this.state.FlightExtras) ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
                </div>
                {
                  (this.state.FlightExtras) ?
                    <ul className="mt-20">
                      <li><Link to="/">Umrah Packages</Link> </li>
                      <li><Link to="/cheap-hotels">Cheap Hotels</Link> </li>
                      <li><Link to="/travel-insurance">Travel Insurance</Link> </li>
                      <li><Link to="/foure-rental">Four-E Car Rental</Link> </li>
                      <li><Link to="/foure-tours">Four-E Tours</Link> </li>
                    </ul>
                  :
                    ''
                }
              </div>
            </div>
          </div>
          <div className="copyright-area pt-20 pb-20">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-5 order-2 order-md-1">
                  <p className="copyright-text">Copyright by@Foure</p>
                </div>
                <div className="col-md-7 order-1 order-md-2">
                  <div className="social-links">
                    <Link to="#"><i className="fab fa-facebook-f" /></Link>
                    <Link to="#"><i className="fab fa-twitter" /></Link>
                    <Link to="#"><i className="fab fa-behance" /></Link>
                    <Link to="#"><i className="fab fa-linkedin" /></Link>
                    <Link to="#"><i className="fab fa-youtube" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;