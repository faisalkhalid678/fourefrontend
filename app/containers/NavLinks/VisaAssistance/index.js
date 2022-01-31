import React from 'react';
import MetaTags from 'react-meta-tags';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

export default function VisaAssistance()
{
    const pagelocation = 'Visa Assistance';
    window.scrollTo(0, 0);
    return(
        <>
            <MetaTags>
                <title>{pagelocation} | Four-E</title>
                <meta name="description" content="#" />
            </MetaTags>
            <Navigation />
            <div className="d-flex justify-content-center">
                <div className="col-lg-12 text-center mt-5 mb-5">
                    <h1 className="mb-3 nav-link-head">Visa Assistance</h1>
                    <div className="col-sm-12 col-md-12 col-lg-12 text-justify">
                        <h5>Content Will be Placed Here</h5>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}