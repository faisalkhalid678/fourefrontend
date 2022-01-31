import React, { Component } from 'react';
import NavContainer from './wrappers/NavContainer';
import NavMenu from './wrappers/NavMenu';
import Nav from './wrappers/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Linker = styled.li`
  & > a
  {
    text-decoration: none !important;
  }
`;


export default class Navigation extends Component {
  render() {
    return (
      <Nav>
        <NavContainer>
          <Link to="/" className="navbar-logo">
            <div className="navbar-icon" />
            Fourecab
          </Link>
          {/* <div className="menu-icon">

        </div> */}
          <NavMenu>
            <Linker className="nav-item">
              <Link to="/">Ride</Link>
            </Linker>
            <Linker className="nav-item">
              <Link to="/">Drive</Link>
            </Linker>
            <Linker className="nav-item">
              <Link to="/">More</Link>
            </Linker>
          </NavMenu>
        </NavContainer>
      </Nav>
    )
  }
}
