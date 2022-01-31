import React, { Component, Fragment } from 'react';

import Roomtype from './Roomtype';
import Roomslider from './Roomslider';
import Blogpost from './Blogpost';
import NewBookingForm from '../../containers/NewBookingForm';

// import Textblock from './Textblock';
// import Testimonials from './Testimonials';
// import Roomgallery from './Roomgallery';
// import Cta from './Cta';

class Sections extends Component {
    render () {
        return(
            <Fragment>
                <NewBookingForm />
                <Roomtype />
                {/* <Cta /> */}
                <Roomslider />
                {/* <Textblock /> */}
                {/* <Testimonials /> */}
                {/* <Roomgallery /> */}
                <Blogpost />
            </Fragment>
        );
    }
}

export default Sections;