import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import './navbar.scss'

const NavbarComponent = () => {
  const { authenticated, logout } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Fundamor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/about">
                Acerca de
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Galeria
              </Nav.Link>
              {authenticated ? <Nav.Link as={Link} to="/employees">
                Colaboradores
              </Nav.Link> : null}

              {!authenticated ? <Nav.Link as={Link} to="/login" >
                Login
              </Nav.Link> :
                <Nav.Link as={Link} to="#" onClick={() => { logout() }} >
                  Cerrar sesión
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent
