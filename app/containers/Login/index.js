/**
 *
 * Login
 *
 */

import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {ParentDiv, LoginForm} from "./wrappers/LoginStyle";

import './login.css';

export function Login() {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const [phone, setPhone] = useState('');

  return (
      <ParentDiv>
        <LoginForm>
          <img src='logo2.png' />
          <h3 className="tal">Get moving with FoureCab</h3>
          <p className="msg">Enter your phone number (required) </p>
          <PhoneInput
            country={'pk'}
            value={phone}
            onChange={phone => setPhone(phone)}
          />
            <Link to='/verify' ><button style={{width:'85%'}} className="btn btn--large">Next</button></Link>
          <br />
          <Link to="/" style={{color:'blue', textAlign:'left'}}>Or use a social Link</Link>
        </LoginForm>
      </ParentDiv>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
