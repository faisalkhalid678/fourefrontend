import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';

const Bike = () => (
  <ErrorBoundary>
    <div className="coming-soon">
      <div className="row">
          <img src="/com.jpg" />
      </div>
    </div>
  </ErrorBoundary>
);

export default Bike;
