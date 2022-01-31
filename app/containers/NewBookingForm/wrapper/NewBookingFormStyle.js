import styled from 'styled-components';

export const Slider = styled.section`
  position: relative;
  padding: 25px 0px;
  display: flex;
  flex-direction: row-reverse;
  .New-Booking-Coming-Soon {
    height: 442px;
    background-color: #1d75bd;
    *
    {
      position: relative;
    }
  }
`;
// Booking Forms Div Style
export const BookingFormsDiv = styled.div`
  width: 100%;
  background: #eaeaeaf0;
  border-radius: 0px 0px 4px 4px;
  box-shadow: rgb(21 23 27 / 24%) 1px 2px 2px;
  
  .mobile-form-nav {
    display: none;
    p {
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      padding: 15px 20px;
    }
    .dropdown
    {
      display: none;
      padding: 15px 20px;
      text-align: right;
      .fas
      {
        font-size: 17px;
        color: #fcb040;
      }
      @media (max-width: 800px)
      {
        display: block;
      }
    }
    @media (max-width: 800px)
    {
      display: flex;
    }
  }
  
`;
// Booking Parent
export const BookingParent = styled.div`
  width: 30%;
  position: relative;
  left: -5%;
  z-index: 2;
  @media (max-width: 991px)
  {
    width: 90%;
  }
`;
// Booking Nav
export const BookingNav = styled.div`
  width: 100%;
  ul
  {
    display: flex;
    list-style-type: none;
    width: 100%;
    @media (max-width: 800px)
    {
      font-size: 10px;
    }
    li
    {
      display: flex;
      line-height: 24px;
      width: 33.3%;
      font-size: 14px;
      justify-content: center;
      background: #378EDD;
      border-right: 1px solid #E2E6E9;
      a
      {
        font-weight: bold;
        padding: 10px 12px;
        color: #fff !important;
        font-family: Bahnschrift;
      }
    }
  }
  @media (max-width: 1400px)
  {
    width: calc(100%);
  }
  @media (max-width: 800px)
  {
    display: none;
  }
`;
// Mobile Booking Nav
export const MobileBookingNav = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 4;
  width: 100%;
  ul
  {
    list-style-type: none;
    font-size: 15px;
    background: #4fa0ea;
    li
    {
      line-height: 20px;
      a
      {
        display: block;
        background: #378EDD;
        font-weight: bold;
        padding: 13px 22px;;
        color: #fff !important;
        width: 100%;
        font-family: Bahnschrift;
      }
    }
    .close
    {
      text-align: right;
      opacity: 1;
      text-shadow: 0 0 0 black;
      .fas
      {
        font-size: 17px;
        color: #fcb040;
      }        
    }
  }
`;
// New Booking Form
export const BookingForm = styled.div`
  padding: 0px 15px 40px;
  display: flex;
  flex-direction: column;
  .plane-icons {
    position: absolute;
    padding-top: 34px;
    left: 25px;
    margin-top: 3px;
    z-index: 1;
  }

  .date {
    flex-basis: 33.3%;
  }
  .react-datepicker-wrapper .react-datepicker__input-container input {
    border: none;
    border-radius: 5px;
    color: #000;
    background-color: #c5d7ea;
    height: 40px;
    width: 100%;
    padding: 0px 0px 0px 35px;
    font-size: 13.333px;
  }
  .calender-icon {
    z-index: 1;
    z-index: 1;
    margin-top: 37px;
    margin-left: 10px;
  }
  .cabin-class-select {
    width: 100%;
    border-radius: 5px;
    position: relative;
    border: none;
    height: 40px;
    select {
      height: 40px !important;
      border-radius: 5px;
      font-size: 13.333px;
      background-color: #c5d7ea;
      padding: 0px 0px 0px 35px;
      -webkit-appearance: none;
      -moz-appearance: none;
      option {
        background-color: #F6FBFF;
      }
    }
  }
  .booking-form-counter {
    border-bottom: 2px solid #378EDD;
  }
  .booking-form-button:hover {
    border: none;
  }
`;
// Get My Booking by PNR
export const GetBooking = styled.div`
  height: 442px;
  input {
    border: none;
    border-radius: 5px;
    color: #000;
    background-color: #c5d7ea;
    height: 40px;
    width: 100%;
    padding: 0px 20px 0px 35px;
  }
  .get-booking-button:hover:not([disabled]) {
    border: none;
  }
  .plane-icons {
    position: absolute;
    margin-top: 35px;
    left: 55px;
    z-index: 1;
  }
  .navlink-plane-icon {
    position: absolute;
    margin-top: 37px;
    left: 70px;
    z-index: 1;
  }
  .get-booking-button:disabled {
    cursor: no-drop;
  }
`;