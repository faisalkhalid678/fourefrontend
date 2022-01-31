import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export default class  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 500, max: 500000 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={500000}
        minValue={500}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}
