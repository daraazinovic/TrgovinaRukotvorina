import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constant';
import logo from '../assets/logo.jpg'
import pozadina from '../assets/pozadina.jpg'


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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 1.00); // Jača sjena
  border-bottom: 3px solid #1976d2; // Tamnija plava linija na dnu
  background: linear-gradient(to right, #1976d2, #42a5f5); // Gradijent plave boje
  color: white; // Bijeli tekst
  
  padding: 25px 0; // Veći padding
  position: sticky; // Fiksna pozicija
  background-image: url(${pozadina}); // Postavljanje pozadinske slike
  background-size: cover; // Pokriva cijelu površinu
  background-repeat: no-repeat; // Ne ponavlja sliku
  background-position: center; // Centrirana slika
  position: sticky; // Postavljanje pozicije na sticky
  top: 0; // Postavljanje udaljenosti od vrha
  z-index: 100; // Osiguravanje da je Navbar iznad ostalih elemenata
  
`;

const StyledNavLink = styled(Nav.Link)`
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); // Istaknuta sjena
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StyledNavDropdown = styled(NavDropdown)`
  color: white;
  margin-right: 12px;
  .nav-link {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); // Istaknuta sjena
  }
  .dropdown-menu {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .dropdown-item {
    color: white;
    font-weight: 500;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;


const StyledNavDropdownItem = styled(NavDropdown.Item)`
  transition: background-color 0.3s ease;
  padding: 8px 12px;
  &:hover {
    background-color: #b3e5fc;
  }
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-weight: 700;
  color: white;
  font-size: 1.2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); // Istaknuta sjena
  transition: color 0.3s ease;
  &:hover {
    color: #cce0ff;
  }
`;

const StyledLogo = styled.img`
  transition: transform 0.3s ease;
  height: 70px;
  margin-right: 40px;
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