import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constant';
import logo from '../assets/logo.jpg'


import React, { memo, useCallback, useState } from 'react';

import styled, { keyframes } from 'styled-components';
import { FaHome, FaList, FaBoxes } from 'react-icons/fa';

// Animacija za rotaciju logotipa
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledNavbar = styled(Navbar)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #e0f7fa; /* Svjetlo plava pozadina */
  padding: 15px 0;
`;

const StyledNavLink = styled(Nav.Link)`
  transition: color 0.3s ease, transform 0.3s ease;
  font-weight: 500;
  color: #333; /* Tamniji tekst */
  padding: 8px 12px;
  margin-right: 10px;
  &:hover {
    color: #007bff; /* Plava boja pri hoveru */
    transform: translateY(-2px);
  }
`;

const StyledNavDropdown = styled(NavDropdown)`
  font-weight: 500;
  color: #333;
  margin-right: 10px;
`;

const StyledNavDropdownItem = styled(NavDropdown.Item)`
  transition: background-color 0.3s ease;
  padding: 8px 12px;
  &:hover {
    background-color: #b3e5fc; /* Svjetlo plava boja pri hoveru */
  }
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  color: #333;
  &:hover {
    color: #007bff;
  }
`;

const StyledLogo = styled.img`
  transition: transform 0.3s ease;
  height: 70px; /* Prilagođena visina logotipa */
  margin-right: 40px; /* Dodana margina desno */
  &:hover {
    animation: ${rotate} 2s linear infinite;
  }
`;

function NavBarEdunova() {
  const navigate = useNavigate();

  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  const handleNavigate = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  return (
    <StyledNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <StyledNavbarBrand onClick={() => handleNavigate(RouteNames.HOME)}>
          <StyledLogo
            src={logo}
            alt="Logo Trgovine Rukotvorina"
            className="d-inline-block align-top"
          />
          Trgovina Rukotvorina
        </StyledNavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <StyledNavLink onClick={() => handleNavigate(RouteNames.HOME)} active={isActive(RouteNames.HOME)}>
              <FaHome /> Početna
            </StyledNavLink>
            <StyledNavDropdown title={<><FaBoxes /> Programi</>} id="basic-nav-dropdown">
              <StyledNavDropdownItem
                onClick={() => handleNavigate(RouteNames.PROIZVOD_PREGLED)}
                active={isActive(RouteNames.PROIZVOD_PREGLED)}
              >
                <FaList /> Proizvodi
              </StyledNavDropdownItem>
              <StyledNavDropdownItem
                onClick={() => handleNavigate(RouteNames.VRSTA_PREGLED)}
                active={isActive(RouteNames.VRSTA_PREGLED)}
              >
                <FaList /> Vrste
              </StyledNavDropdownItem>
              <StyledNavDropdownItem
                onClick={() => handleNavigate(RouteNames.MATERIJAL_PREGLED)}
                active={isActive(RouteNames.MATERIJAL_PREGLED)}
              >
                <FaList /> Materijali
              </StyledNavDropdownItem>
            </StyledNavDropdown>
            <StyledNavLink onClick={() => handleNavigate(RouteNames.ERA)} active={isActive(RouteNames.ERA)}>
              Era dijagram
            </StyledNavLink>
            <StyledNavLink href="https://darko0210-001-site1.otempurl.com/swagger" target="_blank">
              Swagger
            </StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default memo(NavBarEdunova);