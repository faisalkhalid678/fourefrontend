import styled from 'styled-components';

// Booking Forms Div Style
export const BookingFormsDiv = styled.div`
  
  .dropdown
  {
    @media (max-width: 800px)
    {
      display: block;
    }
  }
`;

// Bike Form Heading
export const BikeHead = styled.h2`
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

// Booking Nav
export const BookingNav = styled.div`
  ul
  {
    @media (max-width: 800px)
    {
      font-size: 10px;
    }
    li
    {
      
      &: first-child
      {
        margin-left: 0px;
      }
      a
      {
        
      }
    }
  }
  @media (max-width: 1400px)
  {
    width: calc(75% + 40px);
    margin-left: calc(18% - 100px);
  }
  @media (max-width: 800px)
  {
    display: none;
  }
`;
