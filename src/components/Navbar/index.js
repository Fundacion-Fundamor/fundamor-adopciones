import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './navbar.scss'

const NavbarComponent = ({ active = "home" }) => {
  return (
    <>
      <Navbar bg="white" fixed="top" expand="lg">
        <Container className='px-0'>
          <Navbar.Brand href="/">     <img
            src="/images/logotipo.png"
            width={150}
            alt="Logo fundamor"
          /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 ms-5 py-2 justify-content-between">
              <div className='d-flex flex-row' >
                <Nav.Link className={active === "home" ? "active" : ""} as={Link} to="/">
                  Inicio
                </Nav.Link>
                <Nav.Link className={active === "animals" ? "active" : ""} as={Link} to="/foundation/animals">
                  Animales
                </Nav.Link>
                <Nav.Link className={active === "posts" ? "active" : ""} as={Link} to="/foundation/posts">
                  Publicaciones
                </Nav.Link>
                <Nav.Link className={active === "contact" ? "active" : ""}  as={Link}  to="/contact">
                  Contacto
                </Nav.Link>
                <Nav.Link className={active === "about" ? "active" : ""}  as={Link} to="/about">
                  Nosotros
                </Nav.Link>
              </div>
              <Nav.Link as={Link} className="d-none d-md-block" to="/login" >
                Ingresar
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent
