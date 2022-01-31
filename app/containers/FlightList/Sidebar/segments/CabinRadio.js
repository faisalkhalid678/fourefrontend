import React from 'react';

function CabinRadio(props) {
  const handleChange =(event) => {
    props.handle(event);
  }
  
  return (
    <span>
      <label htmlFor={props.name}>
        <input className="sidebar-cabin-radio" onChange={handleChange} id={props.name} name="cabin" type="radio" value={props.value}  checked={props.check}/>
        <span>{props.title}</span>
      </label>
    </span>
  )
}

export default CabinRadio
