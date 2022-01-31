import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

class Textblock extends Component {
  componentDidMount(){
    function popup() {
      $('.popup-video').magnificPopup({
				type: 'iframe'
			});
    }
    popup();
  }
  render() {
    return (
      <section className="text-block with-bg pt-115 pb-115">
        <div className="container">
          <div className="row align-items-center justify-content-center justify-content-lg-between">
            <div className="col-lg-5 col-md-8 col-sm-10">
              <div className="block-text mb-small">
                <div className="section-title mb-20">
                  <span className="title-tag">Take a tour</span>
                  <h2>Discover Our Underground.</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Link to="/contact" className="main-btn btn-filled mt-40">Book now</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-10">
              <div className="video-wrap" style={{ backgroundImage: "url(/room-blog-3.jpg)" }}>
                <a rel={'external'} href="https://www.youtube.com/embed/EEJFMdfraVY" className="popup-video"><i className="fas fa-play" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Textblock;