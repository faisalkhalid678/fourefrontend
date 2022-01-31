import React from 'react';
import Carousel from 'react-elastic-carousel';
import ErrorBoundary from './../../../helper/ErrorBoundary';

import {
  AirlineCarouselMain,
  CarouselItem,
} from './wrapper/FlightDetailsStyle';

function AirlineCarousel({ airlines, checks }) {

  const totalAirlines = typeof airlines != 'undefined' ? airlines.length : 0;
  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 500, itemsToShow: 3 },
    { width: 786, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
    { width: 1400, itemsToShow: 6 },
  ];
  const items = () => {
    let ind = 0;
    let air = [];
    for (ind = airlines.length - 1; ind >= 0; ind--) {
      air.push(<CarouselItem onClick={checks} key={airlines[ind].airline_logo} id={airlines[ind].code}><img src={airlines[ind].airline_logo} /><h5>{'PKR ' + airlines[ind].price}</h5></CarouselItem>);
    }
    return air;
  }
  return airlines.length != 0 ? (
    <AirlineCarouselMain>
      <ErrorBoundary>
        <Carousel
          className="this-class"
          enableAutoPlay autoPlaySpeed={10000}
          easing="cubic-bezier(1,.15,.55,1.54)"
          tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
          transitionMs={700}
          breakPoints={breakpoints}
          onNextEnd={({ index }) => {
            if (index + 1 === totalAirlines) {
              carouselRef.current.goTo(0);
            }
          }}
        >
          {
            (typeof airlines !== 'undefined') ?
              items()
              :
              ''
          }
        </Carousel>
      </ErrorBoundary>
    </AirlineCarouselMain>
  ) : (
    ''
  );
}

export default AirlineCarousel;
