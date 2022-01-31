/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';
import Navigation from './../../components/Navigation';
import Footer from './../../components/Footer';

import messages from './messages';

export default function NotFound() {
  const pagelocation = '404 Not Found';
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
      <div className="container">
        <div className="row" style={{height: '75vh'}}>
          <div className="col-md-12 align-self-center">
            <div className="row justify-content-center">
              <h2>{messages.header.defaultMessage}</h2>
            </div>
            <div className="row justify-content-center not-found">
              <Link to="/">Go Back to Homepage</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer  />
    </>
  );
}
