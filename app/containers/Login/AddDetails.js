import React from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import {ParentDiv, LoginForm} from "./wrappers/LoginStyle";

import './login.css';



export function AddDetails() {

  return (
      <ParentDiv>
        <LoginForm>
        <img src='logo2.png' />
        <h4>What is your email address?</h4>
        <br />
        <div style={{width:'50%',display:'inline-block'}}>
          <p className="msg">Enter First Name</p>
          <input type="text" className="code" placeholder="please enter the code" />
        </div>
        <div style={{width:'50%',display:'inline-block'}}>
          <p className="msg">Enter Last Name</p>
          <input type="text" className="code" placeholder="please enter the code" style={{marginRight:'33px'}} />
        </div>
        <div style={{width:'100%',marginLeft:'12px'}}>
          <p className="msg">Enter Password</p>
          <input type="number" placeholder="Please Enter password" style={{padding:'10px 20px',marginBottom:'20px',width:'83%', marginRight:'33px'}} />
        </div>
          <Link to='/looking' ><button style={{width:'85%'}} className="btn btn--large">Submit</button></Link>
        <br />
        <Link to="/" style={{color:'blue', textAlign:'left'}}>By Clicking submit you agree to our terms and conditions</Link>
        </LoginForm>
      </ParentDiv>
  );
}


export default AddDetails;
