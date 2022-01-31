import React from 'react';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';



export default function NowButton({display}) {
  const parentStyle = {
    backgroundColor:'#fff',
    padding:'10px',
    cursor: 'pointer',
  }
  const ButtonStyle = {
    display:'inline-block',
    marginLeft:'10px',
    fontSize:'16px',
    borderRadius:'20px',
    padding:'8px 12px',
    background:'#e8e8e8'
  }
  return (
    <div onClick={display} style={parentStyle}>
      <div style={ButtonStyle}><BsFillStopwatchFill /><span> &nbsp;Now</span><IoMdArrowDropdown /></div>
    </div>
  )
};




