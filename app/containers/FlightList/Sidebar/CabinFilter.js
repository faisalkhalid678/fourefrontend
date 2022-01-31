import React from 'react';
import Header from './segments/Header';
import CabinRadio from './segments/CabinRadio';

function CabinFilter({handleCabinClass, cabin,showCabinFilterToggle ,showCabinFilters}) {
  let CabinClass = cabin.cabin;
  
  return (
    <div className="d-flex flex-column justify-content-start sidebar-filter-main">
      <Header title="Cabin Filter" showFilterToggle={showCabinFilterToggle} filter={showCabinFilters} />
      {/* <div className="cabin-body"> */}
      <div className="cabin-body" style={{ display: (showCabinFilters) ? 'block' : 'none' }}>
        <div className="px-3 pt-2 cabin-filter-checkbox-div">
          <CabinRadio 
            title="Economy class"
            value="Economy"
            handle={handleCabinClass}
            check={(CabinClass === 'Economy') ? 'checked': ''}
          />
        </div>
        <div className="px-3 pt-2 cabin-filter-checkbox-div">
          <CabinRadio 
              title="Business class"
              value="Business"
              handle={handleCabinClass}
              check={(CabinClass === 'Business') ? 'checked': ''}
            />
        </div>
        {/* <div className="cabin-filter-checkbox-div">
          <CabinRadio 
              title="First class"
              value="First"
              handle={handleCabinClass}
              check={(CabinClass === 'First') ? 'checked': ''}
            />
        </div> */}
      </div>
    </div>
  )
}

export default CabinFilter
