import React from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import { ParentDiv, LoginForm } from "./wrappers/LoginStyle";

import './login.css';



export function Verify() {

  return (
      <ParentDiv>
        <LoginForm>
          <img src='logo2.png' />
          <p className="verify">Enter the 4-digit code sent to you at +92 30-36552018 </p>
          <br />
          <input type="number" className="code" placeholder="Please enter the code"/>
          <Link to='/verifypassword' >
            <button>Next</button>
          </Link>
          <br />
          <Link to="/" className="resend">Resend Codes</Link>
        </LoginForm>
      </ParentDiv>
  );
}


export default Verify;
