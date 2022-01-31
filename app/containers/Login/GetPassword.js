import React from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import {ParentDiv, LoginForm} from "./wrappers/LoginStyle";

import './login.css';



export function GetPassword() {

  return (
      <ParentDiv>
        <LoginForm>
        <img src='logo2.png' />
        <h4>Welcome back, sign in to continue</h4>
        <br />
        <p className="msg">Enter Your Password</p>
        <input type="number" className="code" placeholder="Please enter the code"/>
        <Link to='/getemail' >
          <button style={{width:'85%'}} className="btn btn--large">Next</button>
        </Link>
        <br />
        <Link to="/" style={{color:'blue', textAlign:'left'}}>I forgot my email address</Link>
        </LoginForm>
      </ParentDiv>
  );
}


export default GetPassword;
