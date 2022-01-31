import React from 'react';

export default function Header(props) {
  
  return (
      <h3 className="sidebar-section-header" onClick={props.showFilterToggle} style={{cursor: 'pointer'}}>
        {props.title}  <i className={(props.filter) ? 'fas  float-right fa-chevron-up' :'fas  float-right fa-chevron-down'} style={{cursor: 'pointer'}}/>        
      </h3>
  );
}
