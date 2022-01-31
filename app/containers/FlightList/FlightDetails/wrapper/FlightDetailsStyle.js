import styled from 'styled-components';

export const FlightDetailsMain = styled.div`
  flex-basis: 73%;
  @media (max-width: 800px) {
    flex-basis: 100%;
  }
`;

export const ModifySearchMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: space-between;
  .from-to-details 
  {
    padding-left: 15px;
    background: #fff;
    border-radius: 5px;
    flex-basis: 80%;
    border: 1px solid #b4aea3c4;
    h3 {
      font-size: 14px;
      padding-top: 5px;
      color: #fcb040;
      span
      {
        color: #378edd;
      }
      
    }
    h4 {
      margin-top: 3px;
      color: #fcb040;
      font-size: 12px;
      span
      {
        color: #378edd;
      }
    }
    @media (max-width: 991px)
    {
      display: flex;
      flex-direction: column;
    }
  }
  button 
  {
    border-radius: 3px;
    text-shadow: 0px 0px 2px #776565;
    font-weight: bold;
    font-size: 16px;
    background: #378edd;
    color: #fff;
    padding: 12px 10px;
    border: none;
    transition: background 0.5s;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    flex-basis: 19%;
    height: 44px;
    @media (max-width: 991px) 
    {
      padding: 10px !important;
      margin-top: 5px;
      height: 70px !important;
      width: 25%;
    }
    @media (max-width: 550px) 
    {
      width: 50% !important;
    }
  }
  @media (max-width:991px)
  {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap !important;
  }
`;

export const ModifyFormMain = styled.div`
  max-width: 100%;
  border-radius: 5px;
  padding: 30px 0px;
  margin: 30px 0px;
  background-color: #81b7e82b;
`;

export const AirlineCarouselMain = styled.div`
  background: #fff;
  margin-top: 10px;
  height: 130px;
  width: 100%;
  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
  .rec {
    .rec-arrow-left {
      display: block;
    }
    .rec-pagination {
      display: none;
    }
    .rec-arrow {
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      font-size: 1em;
      color: #333;
      box-shadow: 0 0 2px 0px #333;
      border-radius: 50%;
      border: none;
      width: 30px;
      height: 30px;
      min-width: 30px;
      line-height: 30px;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      cursor: pointer;
      outline: none;
      &: hover {
        border-radius: 50%;
        background-color: #FCB040;
      }
      &: disabled {
        visibility: hidden;
      }
    }
    .rec-carousel-item {
      &: focus {
        outline: none;
        box-shadow: inset 0 0 1px 1px lightgrey;
      }
    }
  }
`;

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130px;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
  border-right: 1px solid #d0c2c2;
  border-left: 1px solid #d0c2c2;
  img{
    margin-bottom: 10px
  }
  h5
  {
    color: #378edd;
    margin-bottom: 5px;
  }
  // &: hover
  // {
  //   background-color: #eff0f6;
  // }
`;

export const AirlineListMain = styled.div`
  margin-top: 10px;
  width: 100%;
  transition: transform 0.8s;
  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
`;

export const AirlineDetailsView = styled.div`
  width: 100%;
  transition: transform 0.8s;
  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
`;

export const AirlineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  justify-content: space-evenly;
  padding: 15px;
  .price-section {
    flex-basis: 20%;
    text-align: center;
    align-self: center;
    h3 {
      color: #fcb040;
      font-size: 20px;
      margin-bottom: 5px;
      @media (max-width: 1200px) {
        font-size: 15px;
      }
    }
    p {
      font-size: 11px;
      color: #0000009e;
      @media (max-width: 1200px) {
        font-size: 5px;
      }
    }
    button {
      text-decoration: none;
      background: #378edd;
      width: 68%;
      margin-top: 20px;
      display: inline-block;
      text-shadow: none;
      box-shadow: 0 2px 2px 0 rgb(162 152 152 / 16%),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      font-size: 16px;
      padding: 10px 10px;
      margin-left: 5px;
      border-radius: 3px;
      font-weight: bold;
      color: #fff;
      border: none;
      transition: background 0.5s;
      &: hover {
        background: #fcb040;
      }
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    @media (max-width: 1200px) {
      flex-basis: calc(20% - 5px);
    }
    @media (max-width: 800px) {
      flex-basis: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  a {
    margin-left: 20px;
    font-size: 12px;
    text-align: left;
    color: blue;
    cursor: pointer;
    text-decoration: none;
    @media (max-width: 500px) {
      flex-basis: 33%;
      text-align: center;
    }
  }
`;

export const SegmentSection = styled.div`
  flex-basis: 80%;
  border-right: 1px dashed #9cbfdb;
  .segment {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 16px;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  }
  .logo-section {
    flex-basis: 20%;
    text-align: center;
    h5 {
      display: inline;
      margin-left: 5px;
    }
    img {
      display: inline-block;
      margin-right: 10px;
      margin-left: 5%;
    }
    .airline-name {
      display: inline-block;
    }
    @media (max-width: 1200px) {
      flex-basis: calc(20% - 5px);
    }
  }
  .takeoff-time,
  .arrive-time {
    flex-basis: 20%;
    text-align: left;
    color: #060606d9;
    margin-top: 6px;
    display: inline-block;
    .airplane-logo {
      margin-right: 16px;
      @media (max-width: 1200px) {
        margin-right: 5px;
      }
    }
    .takeoff {
      transform: rotate(-45deg);
    }
    .arrive {
      transform: rotate(45deg);
    }
    span {
      margin-top: 10px;
      font-weight: bold;
      font-size: 12px;
      display: inline-block;
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    h6 {
      margin-top: -3px;
      font-size: 10px;
      color: #a0a0a0;
    }
    @media (max-width: 500px) {
      text-align: center;
    }
    @media (max-width: 1200px) {
      flex-basis: calc(20% - 5px);
      margin-left: 5px;
    }
  }
  .stop-details {
    flex-basis: 20%;
    .size-12 {
      color: #b7abab;
      text-align: center;
      padding-top: 10px;
      font-size: 12px;
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    .dotted-line {
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      &: after {
        content: '---------------------------------------------------';
        letter-spacing: 2px;
        font-size: 7px;
        color: #9cbfdb;
        display: inline-block;
        vertical-align: 3px;
        padding-right: 37px;
        @media (max-width: 1200px) {
          font-size: 4px;
          padding-right: 0px;
        }
      }
    }
    .flight-time {
      font-size: 12px;
      color: #0000009e;
      text-align: center;
      span {
        color: maroon;
      }
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    @media (max-width: 1200px) {
      flex-basis: calc(20% - 5px);
    }
    @media (max-width: 500px) {
      display: none;
    }
  }
  .mobile-stop-details {
    display: none;
    margin: 10px 0px 0px 15px;
    & > * {
      margin-bottom: 5px;
      padding-left: 5px;
    }
    .size-12 {
      color: #b7abab;
      padding-top: 10px;
      font-size: 12px;
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    .flight-time {
      font-size: 12px;
      color: #0000009e;
      & > * {
        margin-bottom: 5px;
      }
      span {
        color: maroon;
      }
      @media (max-width: 1200px) {
        font-size: 10px;
      }
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }
  @media (max-width: 500px) {
    text-align: center;
  }
  @media (max-width: 800px) {
    flex-basis: 100%;
    border: none;
  }
`;

export const SegmentParent = styled.div`
  box-sizing: border-box;
  background: #ededed;
  border-top: 2px dotted #ddd;
  border: 0.1px solid black;
  .flight-time-section{
    display: flex;
    flex-direction: row;
    width: 100%;
    .flight-time, .dotted-div, .flight-duration {
      flex-basis: 30%;
    }
    @media (max-width: 750px)
    {
      .dotted-div {
        display: none;
      }
      .flight-time, .flight-duration {
        flex-basis: 50%;
      }
    }
    @media(max-width: 550px)
    {
      flex-direction: column;
      h6, .info {
        flex-basis: 100%;
      }
    }
  }
  #sub-head {
    font-size: 12px;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  .info {
    margin-top: 0;
    font-size: 12px;
    margin-bottom: 1rem;
    text-align: left;
  }
  .routes-close-button {
    position: relative;
    left: 98%;
    color: #595959;
    opacity: 0.5;
    text-decoration: none;
  }
  .routes-close-button:hover {
    opacity: 1;
    cursor: pointer;
  }
  .flight-routes {
    display: flex;
    word-wrap: break-word;
  }
  .col-3 {
    flex: 0 0 25%;
    max-width: 25%;
    padding-top: 20px;
  }
  .col-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .col-3,
  .col-9 {
    line-height: 15px;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  .flights {
    list-style: none;
    border-left: 2px dotted #aaaaaa;
    position: relative;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .plane-icon {
    position: relative;
    top: 50px;
    left: -14px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background-color: #fff;
    -webkit-box-shadow: 0 0 0 2px #d9d9d9;
    box-shadow: 0 0 0 1px #d9d9d9;
    color: #0093d2;
    border-radius: 50%;
    display: block;
    font-size: 15px;
    transform: rotate(-46deg);
  }
  .flight-date {
    font-size: 14px;
  }
  .dotted-div {
    border-top: 0.1px dotted #000000;
    position: relative;
    top: 5px;
    width: 60%;
    opacity: 1;
    @media(max-width: 750px)
    {
      display: none !important;
    }
  }
  .flight-duration {
    position: relative;
    left: 50px;
    font-size: 15px;
    color: #999;
    padding-left: 10px;
    @media(max-width: 550px)
    {
      padding-left: 0px;
      left: 0;
    }
  }
  .segment-section {
    padding-left: 20px;
    @media(max-width: 500px)
    {
      *{
        display: flex;
        flex-direction: column;
      }
    }
  }

  /* 1100px and below */
  @media only screen and (max-width: 1100px) {
    /* For Mobiles & Tablets: */
    .col-3,
    .col-9 {
      max-width: 100% !important;
    }
    .flight-routes {
      display: flow-root;
      padding: 5px 0px 0px 20px;
    }
    .routes-close-button {
      position: relative;
      left: 90%;
    }
  }
`;

export const FlightTaskbar = styled.div`
  font-size: 14px;
  color: white;
  margin-top: 10px;
  border-radius: 3px;
  display: flex;
  width: 100%;
  background: #378edd;
  text-align: left;
  ul {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    list-style: none;
    li {
      display: inline-block;
      cursor: pointer;
      padding: 10px 40px;
      transition: 0.5s ease-out;
      font-weight: #ddd;
    }
    .active {
      background: #fcb040;
      color: #fff;
    }
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

export const SidebarDetailsView = styled.div`
  flex-basis: 25%;
  margin: 0 !important;
  .additional-info,
  .summary {
    width: 100%;
    background: #fff;
    -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.21);
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    p {
      padding: 15px;
    }
    .price {
      float: right;
      color: #378edd;
    }
    h3 {
      background: #378edd;
      color: #fff;
      font-size: 16px;
      text-align: center;
      padding: 10px 0px;
    }
    span {
      display: block;
    }
  }
  .additional-info
  {
    
    
  }
  .additional-info
  {
    h5
    {
      margin-bottom: 5px;
      margin-left: 10px;
      margin-top: 20px;
      font-size: 16px;
      color: #717171;
    }
    p {
      padding: 10px;
      line-height: normal;
      font-size: 12px;
      color: darkgray;
    }
    a {
      color: blue;
      text-decoration: underline;
      margin-left: 10px;
      font-size: 11px;
    }
    .add-sec
    {
      padding: 10px;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      .location
      {
        font-weight: bold;
        .loc-inner
        {
          div
          {
            align-self: center;
          }
          p
          {
            flex-basis: 25%;
            font-size: 16px !important;
            @media (max-width: 950px)
            {
              font-size: calc(16px - 3px);
            }
          }
          .address, .flight-info
          {
            color: #378edd;
          }
        }
      }
      @media(max-width: 1400px)
      {
        font-size: 12px;
      }
    }
  }
  .continue-btn {
    display: block;
    margin-top: 20px;
    button {
      border-radius: 5px;
      text-shadow: 0px 0px 2px #776565;
      font-weight: bold;
      background: #378edd;
      color: #fff;
      padding: 12px 26px;
      border: none;
      transition: background 0.5s;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12);
      outline: none;
      cursor: pointer;
      white-space: nowrap;
      width: 100%;
      &:hover {
        background: #fcb040;
        transition: all 0.3s ease-out;
      }
    }
  }
  @media (max-width: 800px) {
    flex-basis: 100%;
  }
`;

export const FlightDetailsParent = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  overflow: hidden;
  .main {
    flex-basis: 75%;
    padding: 10px;
    @media (max-width: 800px) {
      flex-basis: 100%;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;
