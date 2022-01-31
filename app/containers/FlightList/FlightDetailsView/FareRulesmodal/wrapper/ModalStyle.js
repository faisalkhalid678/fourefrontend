import styled from 'styled-components';

export const ModalParent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  font-family: monospace;
  section
  {
    position: fixed;
    background: white;
    width: 80%;
    height: 550px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    .modal-header
    {
      display: flex;
      width: 100%;
      text-align: center;
      h3
      {
        flex-basis: 95%;
      }
      a
      {
        flex-basis: 5%;
        text-align: right;
      }
    }
  }
  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`; 

export const LoaderMain = styled.div`
  text-align: center;
  height: 100%;
  margin-top: 10%;
`;


export const ModalInnerParent = styled.div`
  width: 100%;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  .FareRules
  {
      overflow-y: scroll;
      overflow-x: hidden;
      font-family: monospace;
      padding: 0px 20px;
  }
  .Baggage
  {
      span
      {
          font-weight: normal;
      }
  }
`;

export const ModalNav = styled.div`
  width: 100%;
  text-align: center;
  ul
  {
    display: inline-block;
    list-style-type: none;
    text-align: center;
    @media (max-width: 800px)
    {
      font-size: 10px;
    }
    li
    {
      display: inline-block;
      line-height: 24px;
      margin-left: 6px;
      line-height: 40px;
      &: first-child
      {
        margin-left: 0px;
      }
      a
      {
        border-radius: 3px;
        background: rgb(250 249 247 / 88%);
        font-weight: bold;
        padding: 10px 12px;
        color: #00000096;
        font-family: Bahnschrift;
      }
    }
  }
`;

export const ModalDivs = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 4px;
  height: 330px;
  .dropdown
  {
    display: none;
    padding: 15px 20px;
    text-align: right;
    .fas
    {
      font-size: 17px;
      color: #5593cb;
    }
    @media (max-width: 800px)
    {
      display: block;
    }
  }
`;