import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import rooms from './../../../data/room.json';
import roomcategory from './../../../data/roomcategory.json';

class Roomslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      updateCount: 1
    };
  }
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }
  render() {
    const settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      fade: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      dots: false,
      centerMode: true,
      centerPadding: '6%',
      afterChange: () => this.setState(state => ({ updateCount: (state.updateCount < rooms.length) ? state.updateCount + 1 : 1 })),
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            centerPadding: '15%',
          },
        },
      ]
    };
    const settingsThumb = {
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      dots: false
    };
    return (
      <section className="room-slider">
        <div className="container-fluid p-0">
          <Slider className="row rooms-slider-one" asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} {...settings} >
            {rooms.map((item, i) => (
              <div key={i} className="col">
                <div className="slider-img" style={{ backgroundImage: "url("+item.sliderimage+")" }} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="rooms-content-wrap">
          <div className="container">
            <div className="row justify-content-center justify-content-md-start">
              <div className="col-xl-4 col-lg-5 col-sm-8">
                <div className="room-content-box">
                  <div className="slider-count">
                    <span className="current">{this.state.updateCount}</span>/ {rooms.length}
                  </div>
                  <div className="slider-count-big" />
                  <Slider className="room-content-slider" asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)} {...settingsThumb} >
                    {rooms.map((item, i) => (
                      <div key={i} className="single-content">
                        {item.category.slice(0, 1).map((category) => (
                          roomcategory.filter(item => {
                            return item.id === category
                          }).map((category, i) => (
                            <Fragment key={i}>
                              <div className="icon">
                                <i className={category.icon} />
                              </div>
                              <h3>{category.title}</h3>
                              {/* <h3><Link to={"/room-details/" + item.id}>{category.title}</Link></h3> */}
                            </Fragment>
                          ))
                        ))}
                        <p>{item.text.slice(0,100)}...</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Roomslider;