import React from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import {ParentDiv, LoginForm} from "./wrappers/LoginStyle";

import './login.css';



export function GetEmail() {

  return (
      <ParentDiv>
        <LoginForm>
        <img src='logo2.png' />
        <h4>What is your email address?</h4>
        <br />
        <p className="msg">Enter Your Email(required)</p>
        <input type="number" className="code" placeholder="Please enter the code" />
        <Link to='/adddetails' >
          <button style={{width:'85%'}} className="btn btn--large">Next</button>
        </Link>
        <br />
        <Link to="/" style={{color:'blue', textAlign:'left'}}>Resend Codes</Link>
        </LoginForm>
      </ParentDiv>
  );
}


export default GetEmail;
