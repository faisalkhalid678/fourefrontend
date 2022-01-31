/**
 *
 * Signup
 *
 */

import React from 'react';

import Navigation from './../../components/Navigation';
import Footer from './../../components/Footer';

import { SignupInfo, SignupFormParent, Container, SignupForm, CheckBox, InputFieldDiv } from './wrapper/SignupStyle';


const Signup = () => {
  return (
    <React.Fragment>
      <Navigation />
      <SignupInfo>
        <h1>
          Drive with FoureCab
          Make money on your schedule
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book. It has survived not only five centuries, but also the leap into 
          electronic typesetting, remaining essentially unchanged. It was popularised in 
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem Ipsum
        </p>
      </SignupInfo>
      <SignupFormParent>
        <Container>
          <SignupForm>
            <h1>Sign Up To Drive</h1>
            <InputFieldDiv>
              <input type="text" required="required" />
              <label htmlFor="input" className="control-label">Email</label>
              <i className="bar"></i>
            </InputFieldDiv>
            <InputFieldDiv>
              <input type="text" required="required" />
              <label htmlFor="input" className="control-label">Full Name</label>
              <i className="bar"></i>
            </InputFieldDiv>
            <InputFieldDiv>
              <input type="text" required="required" />
              <label htmlFor="input" className="control-label">Phone</label>
              <i className="bar"></i>
            </InputFieldDiv>
            <InputFieldDiv>
              <input type="text" required="required" />
              <label htmlFor="input" className="control-label">Create Password</label>
              <i className="bar"></i>
            </InputFieldDiv>
            <InputFieldDiv>
              <input type="text" required="required" />
              <label htmlFor="input" className="control-label">City</label>
              <i className="bar"></i>
            </InputFieldDiv>
            <CheckBox>
              <label>
                <input type="checkbox" />
                <i className="helper"></i>I agree to terms and Conditions
              </label>
            </CheckBox>
          </SignupForm>
          <span>
            <p>
              By proceeding, I am consenting to receive calls or SMS messages, including by 
              automatic dialer, from FoureCab and its affiliates to the number I provide. 
              I understand that I may opt out by texting “STOP” to 89203.
            </p>
          </span>
          <div className="button-container">
            <button type="button" className="button">
              <span>Next</span>
            </button>
          </div>
        </Container>
      </SignupFormParent>
      <Footer />


    </React.Fragment>
  );
}

// Signup.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   signup: makeSelectSignup(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
export default Signup;

// export default compose(withConnect)(Signup);
