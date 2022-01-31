import React from 'react';
import ErrorBoundary from './../../../helper/ErrorBoundary';

const CityToCity = () => (
  <ErrorBoundary>
    <div className="coming-soon">
      <div className="row">
          <img src="/com.jpg" />
      </div>
    </div>
  </ErrorBoundary>
  
);

export default CityToCity;
