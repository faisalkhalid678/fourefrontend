import React, { Component } from 'react'
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css';

class RangeBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 10,
      vertical: 50
    }
  }

  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    })
  };


  render () {
    const { horizontal, vertical } = this.state
    const horizontalLabels = {
      0: 'Low',
      50: 'Medium',
      50: 'Medium',
      60: 'Medium',
      70: 'Medium',
      80: 'Medium',
      100: 'High'
    }


    const formatkg = value => value + ' PKR'
    const formatPc = p => p + '%'

    return (
      <div className='slider custom-labels'>
        <Slider
          min={0}
          max={100}
          value={horizontal}
          labels={horizontalLabels}
          format={formatkg}
          handleLabel={horizontal}
          onChange={this.handleChangeHorizontal}
        />
        {/* <div className='value'>{formatkg(horizontal)}</div>
        <div className='value'>{formatPc(vertical)}</div> */}
      </div>
    )
  }
}

export default RangeBar
