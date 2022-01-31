import React from "react";
import './Range.css';
class RangeBar2 extends React.Component {
  state = {
    priceInputValue: "1",
    priceInput: {
      0: "1,000",
      1: "1,250",
      2: "1,500",
      3: "2,000",
      4: "2,500",
      5: "3,500",
      6: "6,000",
      7: "15,000",
      8: "50,000",
      9: "50,000+"
    },
    priceOutput: {
      plan1: {
        0: ["", "Free", ""],
        1: ["$", "13", "/m"],
        2: ["$", "17", "/m"],
        3: ["$", "21", "/m"],
        4: ["$", "25", "/m"],
        5: ["$", "42", "/m"],
        6: ["$", "58", "/m"],
        7: ["$", "117", "/m"],
        8: ["$", "208", "/m"],
        9: ["", "Contact Us", ""]
      },
      plan2: {
        0: ["$", "13", "/m"],
        1: ["$", "17", "/m"],
        2: ["$", "21", "/m"],
        3: ["$", "25", "/m"],
        4: ["$", "42", "/m"],
        5: ["$", "58", "/m"],
        6: ["$", "117", "/m"],
        7: ["$", "208", "/m"],
        8: ["$", "333", "/m"],
        9: ["", "Contact Us", ""]
      }
    }
  };

  slider = React.createRef();
  sliderValue = React.createRef();

  componentDidMount() {
    this.slider.current.setAttribute("min", 0);
    this.slider.current.setAttribute(
      "max",
      Object.keys(this.state.priceInput).length - 1
    );
    this.thumbSize = parseInt(
      window
        .getComputedStyle(this.sliderValue.current)
        .getPropertyValue("--thumb-size"),
      10
    );
    this.handleSliderValuePosition(this.slider.current);
  }

  handlePricingSlide = e => {
    this.setState({ priceInputValue: e.target.value });
    this.handleSliderValuePosition(e.target);
  };

  handleSliderValuePosition = input => {
    const multiplier = input.value / input.max;
    const thumbOffset = this.thumbSize * multiplier;
    const priceInputOffset =
      (this.thumbSize - this.sliderValue.current.clientWidth) / 2;
    this.sliderValue.current.style.left =
      input.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
  };

  getPricingData = (obj, pos) => {
    return pos !== undefined
      ? obj[this.state.priceInputValue][pos]
      : obj[this.state.priceInputValue];
  };


  render() {
    return (
      <div className="pricing">
        <div className="pricing-slider center-content">
          <label className="form-slider">
            <input
              type="range"
              ref={this.slider}
              defaultValue={this.state.priceInputValue}
              onChange={this.handlePricingSlide}
            />
          </label>
          <div ref={this.sliderValue} className="pricing-slider-value">
            {this.getPricingData(this.state.priceInput)}
          </div>
        </div>
      </div>
    );
  }
}

export default RangeBar2;
