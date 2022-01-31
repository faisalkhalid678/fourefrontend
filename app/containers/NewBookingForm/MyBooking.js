import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GetBooking } from './wrapper/NewBookingFormStyle';
import ErrorBoundary from './../../helper/ErrorBoundary';

const MyBooking = ({padding}) => {

    const [PNR, setPNR] = useState('');
    const [lastName, setlastName] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);
    const history = useHistory();
        
    const valUpdate = event => {
        event.preventDefault();
        let value = event.target.value;
        let id = event.target.id;
        
        if (id == 'pnr')
        {
            event.target.value = value.toUpperCase();
            setPNR(value.toUpperCase());
        }
        else if (id == 'last_name')
        {
            setlastName(value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(PNR.length === 6 && lastName.length >= 2)
        {
            setFormSubmit(true);
        }
    }

    useEffect(()=>{
        if (PNR.length === 6 && lastName.length >= 2 && formSubmit === true)
        {
            history.push({
                pathname: `/booking/pnr=${PNR}&last_name=${lastName}&pre=200`
            });
        }
    },[PNR, lastName, formSubmit]);

    return (
        <ErrorBoundary>
            <GetBooking className="booking-form-child">
                <div className="row m-0">
                    <div className="inputs-filed w-100 mt-10 d-flex flex-column pt-5 pb-2 pl-5 pr-5">
                        <i className={(padding) ? 'fa fa-plane navlink-plane-icon' : 'fa fa-plane plane-icons'} aria-hidden="true" />
                        <label htmlFor="pnr">PNR: </label>
                        <input type="search" id="pnr" name="pnr" placeholder="Enter your PNR here" minLength="6" maxLength="6" onChange={valUpdate} autoComplete="off"/>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="inputs-filed w-100 mt-10 d-flex flex-column pt-2 pb-5 pl-5 pr-5">
                        <i className={(padding) ? ' fas fa-user navlink-plane-icon' : 'fas fa-user plane-icons'} aria-hidden="true" />
                        <label htmlFor="last_name">Last Name: </label>
                        <input type="text" id="last_name" name="last_name" placeholder="Enter your Last Name here" onChange={valUpdate}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="inputs-filed mt-30">
                        <button type="submit" id="submit" className="main-btn btn-filled get-booking-button" onClick={handleSubmit} disabled={(PNR.length < 6 || lastName.length < 2) ? true : false} >Get Booking</button>
                    </div>
                </div>
            </GetBooking>
        </ErrorBoundary>
    );
}

export default MyBooking;
