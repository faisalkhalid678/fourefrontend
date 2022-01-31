/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import MetaTags from "react-meta-tags";

import Navigation from '../../components/Navigation';
import Sections from './../../components/HomepageSections/Sections';
import Footer from './../../components/Footer';

const pagelocation = 'Homepage';

export default function HomePage() {
  return (
    <React.Fragment>
      <MetaTags>
        <title>{pagelocation} | Four-E</title>
        <meta
          name="description"
          content="#"
        />
      </MetaTags>
      <Navigation />
      <Sections />
      <Footer />
    </React.Fragment>
  );
}
