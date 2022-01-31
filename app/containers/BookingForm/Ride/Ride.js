import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';

const Ride = () => (
  <ErrorBoundary>
    <div className="coming-soon">
      <div className="row">
          <img src="/com.jpg" />
      </div>
    </div>
  </ErrorBoundary>
  
);

export default Ride;
