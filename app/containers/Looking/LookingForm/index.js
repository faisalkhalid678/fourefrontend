import React, { useState } from 'react'
import { connect } from 'react-redux';
import NowButton from './NowButton';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { GoPrimitiveDot } from 'react-icons/go';
import { GoPrimitiveSquare } from 'react-icons/go';
import { BsPeopleFill } from 'react-icons/bs';

import BookingForm from './../wrappers/BookingForm';

import BookingSection from './../wrappers/BookingSection';
import Header from './../wrappers/Header';


export const index = () => {

  const [Schedule, setSchedule] = useState(true);
  const displaySchedule = () => setSchedule(!Schedule);

  return (
    <> { (Schedule) ? <BookingSection >
          <Header>
            <div>
              <div className="v-bar" />
            </div>
            <GoPrimitiveDot className="dot left-dot" />
            <div style={{ width: '90%', marginLeft: '20px', marginTop: '-22px' }}>
              <div className="ad-f">
                <p style={{display: 'inline-block', marginRight: '10px', fontWeight: 'bold', textShadow: 'none'}}>From:</p>
                <p style={{display: 'inline-block'}}>The Centaurus</p>

                <RiArrowDropDownLine className="ar" />
              </div>
              <div className="ad-t">
                <p style={{display: 'inline-block', marginRight: '33px', fontWeight: 'bold', textShadow: 'none'}}>To:</p>
                <p style={{display: 'inline-block'}}>G 9 / 1</p>
                <RiArrowDropDownLine className="ar" />
              </div>
              <GoPrimitiveSquare className="dot right-square" />
            </div>
          </Header>
          <BookingForm>
          <NowButton  display={displaySchedule}  />
            <div className="service-list">
              <div className="s-img">
                <img src="https://via.placeholder.com/64" />
              </div>
              <div className="s-name">
                <div className="ap aq df cv cw cx dh di dj">
                  <div className="dk d6 dl dm dn do b0">
                    <div className="">
                      <span className="ha">Mini</span>
                      <BsPeopleFill style={{ padding: '4px' }} />
                      <span className="dq">3</span>
                    </div>
                  </div>
                  <div className="ay dp az dq dr dm dn do ds">
                    <div className="ap cy">
                      <span className="fs-14">In 6 mins.</span>
                      <span className="fs-14">
                        <span>05:31 pm</span>{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-price">
                <div className="ap aq ar df dj d0">
                  <div className="ap cy">
                    <span className="hd dq">
                      <p className="service-p">PKR&nbsp;287.00</p>
                      <span>&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-list">
              <div className="s-img">
                <img src="https://via.placeholder.com/64" />
              </div>
              <div className="s-name">
                <div className="ap aq df cv cw cx dh di dj">
                  <div className="dk d6 dl dm dn do b0">
                    <div className="">
                      <span className="ha">Hashback</span>
                      <BsPeopleFill style={{ padding: '4px' }} />
                      <span className="dq">3</span>
                    </div>
                  </div>
                  <div className="ay dp az dq dr dm dn do ds">
                    <div className="ap cy">
                      <span className="fs-14">In 6 mins.</span>
                      <span className="fs-14">
                        <span>05:31 pm</span>{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-price">
                <div className="ap aq ar df dj d0">
                  <div className="ap cy">
                    <span className="hd dq">
                      <p className="service-p">PKR&nbsp;287.00</p>
                      <span>&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-list">
              <div className="s-img">
                <img src="https://via.placeholder.com/64" />
              </div>
              <div className="s-name">
                <div className="ap aq df cv cw cx dh di dj">
                  <div className="dk d6 dl dm dn do b0">
                    <div className="">
                      <span className="ha">Moto</span>
                      <BsPeopleFill style={{ padding: '4px' }} />
                      <span className="dq">1</span>
                    </div>
                  </div>
                  <div className="ay dp az dq dr dm dn do ds">
                    <div className="ap cy">
                      <span className="fs-14">In 6 mins.</span>
                      <span className="fs-14">
                        <span>05:31 pm</span>{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-price">
                <div className="ap aq ar df dj d0">
                  <div className="ap cy">
                    <span className="hd dq">
                      <p className="service-p">PKR&nbsp;287.00</p>
                      <span>&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-list">
              <div className="s-img">
                <img src="https://via.placeholder.com/64" />
              </div>
              <div className="s-name">
                <div className="ap aq df cv cw cx dh di dj">
                  <div className="dk d6 dl dm dn do b0">
                    <div className="">
                      <span className="ha">Moto</span>
                      <BsPeopleFill style={{ padding: '4px' }} />
                      <span className="dq">3</span>
                    </div>
                  </div>
                  <div className="ay dp az dq dr dm dn do ds">
                    <div className="ap cy">
                      <span className="fs-14">In 6 mins.</span>
                      <span className="fs-14">
                        <span>05:31 pm</span>{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-price">
                <div className="ap aq ar df dj d0">
                  <div className="ap cy">
                    <span className="hd dq">
                      <p className="service-p">PKR&nbsp;287.00</p>
                      <span>&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-list">
              <div className="s-img">
                <img src="https://via.placeholder.com/64" />
              </div>
              <div className="s-name">
                <div className="ap aq df cv cw cx dh di dj">
                  <div className="dk d6 dl dm dn do b0">
                    <div className="">
                      <span className="ha">Moto</span>
                      <BsPeopleFill style={{ padding: '4px' }} />
                      <span className="dq">3</span>
                    </div>
                  </div>
                  <div className="ay dp az dq dr dm dn do ds">
                    <div className="ap cy">
                      <span className="fs-14">In 6 mins.</span>
                      <span className="fs-14">
                        <span>05:31 pm</span>{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-price">
                <div className="ap aq ar df dj d0">
                  <div className="ap cy">
                    <span className="hd dq">
                      <p className="service-p">PKR&nbsp;287.00</p>
                      <span>&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{position:'fixed',bottom:'8%',width:'400px',backgroundColor:'#fff',height:'12%',textAlign:'center'}}>
              <div style={{backgroundColor:'red', marginBottom:'20px'}}>
                {/* "hello world" */}
              </div>
              <button type="button" className="btn btn--large primary" style={{width:'50%',backgroundColor:'#fcb040'}}>Request Now</button>
            </div>
          </BookingForm>
      </BookingSection>
      :  <BookingSection onClick={displaySchedule}>
          <div style={{background:'#fff'}}>
          Hello world
          </div>
      </BookingSection>
    }
      </>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(index)
