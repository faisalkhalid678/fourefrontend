import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import blogs from './../../../data/blog.json';
// import authors from './../../../data/authors.json';

class Blogpost extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
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
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ]
    }
    return (
      <section className="latest-news pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8 col-sm-7">
              <div className="section-title">
                <span className="title-tag">Blog</span>
                <h2>News Feeds</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-5 d-none d-sm-block">
              <div className="latest-post-arrow arrow-style text-right">
                <div className="slick-arrow prev-arrow" onClick={this.previous}>
                  <i className="fal fa-arrow-left" />
                </div>
                <div className="slick-arrow next-arrow" onClick={this.next}>
                  <i className="fal fa-arrow-right" />
                </div>
              </div>
            </div>
          </div>
          {/* Latest post loop */}
          <Slider className="row latest-post-slider mt-80" {...settings} ref={slider => (this.slider = slider)}>
            {blogs.map((item, i) => (
              <div key={i} className="col-lg-12">
                <div className="latest-post-box">
                  <div className="post-img" style={{ backgroundImage: "url(" + item.gridimg + ")" }} />
                  <div className="post-desc">
                    <ul className="post-meta">
                      <li>
                        <Link to={"/blog-details/" + item.id}><i className="fal fa-calendar-alt" />{item.postdate}</Link>
                      </li>
                      {/* {item.author.map((author) => (
                        authors.filter(item => {
                          return item.id === author
                          }).map((author, i) => (
                            <li key={i}><Link to={"/blog/user/" + author.id}><i className="fal fa-user" />By {author.name}</Link></li>
                          ))
                      ))} */}
                    </ul>
                    <h4><Link to={"/blog-details/" + item.id}>{item.title}</Link></h4>
                    <p>{item.shortdesc.slice(0, 100)}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}

export default Blogpost;