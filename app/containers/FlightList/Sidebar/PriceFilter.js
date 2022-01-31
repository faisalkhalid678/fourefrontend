import React from 'react';
import RangeBar3 from './RangeBar3';
import Header from './segments/Header';

function PriceFilter() {
  return (
    // PriceFilter Main Div
    <div className="d-flex flex-column justify-content-start sidebar-filter-main">
      <Header title="Price Range" />
      <div style={{padding: '30px 30px 30px 20px'}}>
        <RangeBar3 />
      </div>
    </div>
  )
}

export default PriceFilter
