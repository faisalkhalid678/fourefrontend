import React, {useState} from 'react';

import CabinFilter from './CabinFilter';
import AirlinesFilter from './AirlinesFilter';
import StopsFilter from './StopsFilter';

import ErrorBoundary from './../../../helper/ErrorBoundary';

export function Sidebar({airlines,handleCabinClass,airlineDetails,handleAirlineChange, handleChange, direct, all,oneStop, twoStop,cabinClass, round})
{
  
  let TotalFlights = 0;

  if (round && airlines.status === "200")
  {
    airlines.result.flights.map((flt)=>{
      if (flt.provider_type === 'travelport' || flt.provider_type === 'hitit')
      {
        TotalFlights++;
      }
      else if (flt.provider_type === 'airblue' && flt.segments.boundType === 'outbound')
      {
        TotalFlights++;
      }
      else if (flt.provider_type === 'airsial' && flt.segments.outbound)
      {
        TotalFlights++;
      }
    });
  }
  else
  {
    TotalFlights = (Object.entries(airlines).length > 0) ? 
      (airlines.status === "200") ? 
        airlines.result.flights.length
      : 
        0
    : 
      0; 
  }

  const [showCabinFilters, displayCabinFilter] = useState(true);
  const [showStopsFilters, displayStopsFilter] = useState(true);
  const [showAirlinesFilters, displayAirlinesFilter] = useState(true);

  const showCabinFilterToggle = () => {
    !showCabinFilters ? displayCabinFilter(true) : displayCabinFilter(false);
  };

  const showStopsFilterToggle = () =>{
    !showStopsFilters ? displayStopsFilter(true) : displayStopsFilter(false)
  }
  
  const showAirlinesFilterToggle = () =>{
    !showAirlinesFilters ? displayAirlinesFilter(true) : displayAirlinesFilter(false)
  }
  
  return (
    <div className="col-md-3 mb-3 sidebar">
      <ErrorBoundary>
        <span>
          <h3>Search Result</h3>
          <h4>{TotalFlights} Results Found</h4>
        </span>
      </ErrorBoundary>
      <ErrorBoundary>
        <CabinFilter handleCabinClass={handleCabinClass} cabin={cabinClass} 
        showCabinFilterToggle={showCabinFilterToggle} showCabinFilters={showCabinFilters} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <StopsFilter direct={direct} all={all} oneStop={oneStop} twoStop={twoStop} handleChange={handleChange} 
        showStopsFilters={showStopsFilters} showStopsFilterToggle={showStopsFilterToggle} />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AirlinesFilter handleAirlineChange={handleAirlineChange} airlines={airlineDetails} 
        showAirlinesFilters={showAirlinesFilters} showAirlinesFilterToggle={showAirlinesFilterToggle}/>
      </ErrorBoundary>
      
    </div>
  )
}

export default Sidebar;
