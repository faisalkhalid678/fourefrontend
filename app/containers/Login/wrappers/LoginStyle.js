import styled from 'styled-components';

export const ParentDiv = styled.div`
  text-align:center;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
`;

export const LoginForm = styled.div`
  width:30%;
  height: 60vh;
  img
  {
    width: 50%;
  }
  .verify
  {
    width: 80%;
    margin-left: 22px;
  }
  .code
  {
    padding: 10px 20px;
    margin-bottom: 20px;
    width: 83%;
  }
  a
  {
    button
    {
      width: 85%;
      margin-left:5px;
      border-radius:3px;
      text-shadow: 0px 0px 2px #776565;
      font-weight: bold;
      background:#378edd ;
      color: #fff;
      padding: 12px 26px;
      font-size: 20px;
      border:none;
      transition: background 0.5s;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
      &:hover
      {
        background: #fcb040;
      }
    }
  }
  .resend
  {
    color: blue;
    text-align: left;
  }
  @media only screen and (max-width: 800px)
  {
    width:100%;
    .react-tel-input
    {
      margin-left: 0px;
      margin-bottom: 0px;
      .form-control
      {
        padding: 25px 10px;
      }
    }
  }
`;

