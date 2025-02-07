import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constant';



export default function NavBarEdunova(){

    const navigate = useNavigate();

    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                    <Navbar.Brand href="#home">Trgovina Rukotvorina</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        
                        <NavDropdown title="Programi" id="basic-nav-dropdown">
                        <NavDropdown.Item 
                        onClick={()=>navigate(RouteNames.PROIZVOD_PREGLED)}
                        >Proizvodi</NavDropdown.Item>
                       
                        </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    </>
)

}