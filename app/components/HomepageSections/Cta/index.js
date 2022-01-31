import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ctaFeatures = [
    {
        icon: "/hotel.png",
        title: "Clean & Comfortable Hotels",
        shortdesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        icon: "/insurance.png",
        title: "Great Health Insurance Packages",
        shortdesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        icon: "/city.png",
        title: "City to City Travel Options",
        shortdesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
];

class Cta extends Component {
    render() {
        return (
            <section className="cta-section pt-115 pb-160">
                <div className="container">
                    <div className="cta-inner">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-8 col-sm-9 col-10 order-2 order-lg-1">
                                <div className="cta-text">
                                    <div className="section-title mb-20">
                                        <span className="title-tag">call to action</span>
                                        <h2>The Thin Escape</h2>
                                    </div>
                                    <p>Miranda has everything for your trip &amp; every single things.</p>
                                    <Link to="/contact" className="main-btn btn-filled">take a tour</Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-10 col-sm-11 col-10 order-1 order-lg-2">
                                {/* feature loop */}
                                <div className="cta-features">
                                    {ctaFeatures.map((item, i) => (
                                        <div key={i} className="single-feature">
                                            <div className="icon">
                                                {/* <i className={item.icon} /> */}
                                                <img src={item.icon} />
                                            </div>
                                            <div className="cta-desc">
                                                <h3><Link to="#">{item.title}</Link></h3>
                                                <p>{item.shortdesc}</p>
                                                <span className="count">0{1 + i}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Cta;