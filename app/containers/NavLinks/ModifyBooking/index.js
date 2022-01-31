import React from 'react';
import MetaTags from 'react-meta-tags';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import MyBooking from '../../NewBookingForm/MyBooking';

export default function ModifyBooking()
{
    const pagelocation = 'Modify Booking';
    window.scrollTo(0, 0);
    return(
        <>
            <MetaTags>
                <title>{pagelocation} | Four-E</title>
                <meta name="description" content="#" />
            </MetaTags>
            <Navigation />
            <div className="d-flex justify-content-center">
                <div className="col-lg-6 text-center mt-5 mb-5">
                    <h1 className="mb-3 nav-link-head">Change / Cancel Your Booking</h1>
                    <div className="col-sm-12 col-md-12 col-lg-12 text-left">
                        <MyBooking padding={true} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}