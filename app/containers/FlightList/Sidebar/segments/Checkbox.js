import React from 'react';

function Checkbox(props) {
  const handleChange = (event) => {
    props.handle(event);
  }
  return (
    <div className="form-group form-check m-0">
      <input type="checkbox" className="form-check-input" onChange={handleChange} id={props.name} name={props.name} value={props.value} checked={props.checked} />
      <i htmlFor={props.name}></i>
      <label className="form-check-label" htmlFor={props.name}>{props.title}</label>
    </div>
  )
}

export default Checkbox
