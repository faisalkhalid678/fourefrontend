/**
 *
 * Navigation
 *
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../helper/Navhelp';
import classNames from 'classnames';

class Navigation extends HeaderComponent {
  state = {
    showMenu: false,
  };
  render() {
    const breakpoint = this.state.isMobile ? 'breakpoint-on' : '';
    const stickyHeader = this.state.isTop ? 'sticky-active' : '';

    return (
      <Fragment>
        {/*====== HEADER START ======*/}

        {/* Desktop Header */}
        <header className={`desktop-header sticky-header ${stickyHeader}`}>
          <div className={`d-flex nav-container align-items-center ${breakpoint}`}>
            <div className="col-md-2 col-sm-2" style={{ maxWidth: '11%' }}>
              <div className="site-logo">
                <Link to="/"><img src='/logo.png' alt="logo" height="48" /></Link>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="menu-items">
                <ul>
                  <li className="menu-item">
                    <Link to='/'>Home</Link>
                  </li>
                  <li className="menu-item">
                    <Link to='/tours'>Tours</Link>
                  </li>
                  <li className="menu-item">
                    <Link to='/group-travel'>Group Travel</Link>
                  </li>
                  <li className="menu-item">
                    <Link to='/contact-us'>Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 header-info d-lg-flex justify-content-end">
              <div className="item col-md-6 p-0">
                <i className="fal fa-phone" />
                <div className="pl-5">
                  <span>Phone Number</span>
                  <Link to="tel:+923205487700">
                    <h5 className="title">+92 320 5487700</h5>
                  </Link>
                </div>
              </div>
              <div className="item col-md-6 p-0">
                <i className="fal fa-envelope" />
                <div className="pl-5">
                  <span>Email Address</span>
                  <Link to="mailto:info@foureflights.com">
                    <h5 className="title">info@foureflights.com</h5>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className={`mobile-header sticky-header ${stickyHeader}`}>
          <div className={`d-flex nav-container justify-content-between align-items-center ${breakpoint}`}>
            <div className="site-logo">
              <Link to="/"><img src='/logo.png' alt="logo" height="48" /></Link>
            </div>
            <div className={classNames("navbar-toggler", { "active": this.state.navmethod })} onClick={this.toggleNav}>
              <span /><span /><span />
            </div>
          </div>
        </header>

        {
          (this.state.navmethod && this.toggleNav) &&
            <header>
              <div className="mobile-sidebar nav-container d-flex align-items-center justify-content-between breakpoint-on">
                <div className="nav-menu d-lg-flex align-items-center menu-on">
                  <div className="navbar-close" onClick={this.toggleNav}>
                    <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                  </div>
                  <div className="menu-items">
                    <ul>
                      <li className="menu-item">
                        <Link to='/'>Home</Link>
                      </li>
                      <li className="menu-item">
                        <Link to='/tours'>Tours</Link>
                      </li>
                      <li className="menu-item">
                        <Link to='/group-travel'>Group Travel</Link>
                      </li>
                      <li className="menu-item">
                        <Link to='/contact-us'>Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>
        }
        {/*====== HEADER END ======*/}
      </Fragment>
    );
  }
}

export default Navigation;