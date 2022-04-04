import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineMenu } from 'react-icons/ai';
import './navbar.scss'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import { GrFormClose } from 'react-icons/gr'

const NavbarComponent = ({ active = "home" }) => {

  const [state, setState] = React.useState({

    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <div className='d-flex p-3 justify-content-between'>
          <Navbar.Brand href="/">     <img
            src="/images/logotipo.png"
            width={120}
            alt="Logo fundamor"
          /></Navbar.Brand>
          <IconButton>
            <GrFormClose />
          </IconButton>
        </div>
        <Link style={{ textDecoration: "none" }} to="/">
          <ListItem >
            <ListItemText primary={"Inicio"} />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/foundation/animals">
          <ListItem >
            <ListItemText primary={"Animales"} />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/foundation/posts">
          <ListItem >
            <ListItemText primary={"Publicaciones"} />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/contact">
          <ListItem >
            <ListItemText primary={"Contacto"} />
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/about">
          <ListItem >
            <ListItemText primary={"Nosotros"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem style={{justifyContent:"center"}}>
          <Nav.Link as={Link} style={{width: "100%", textAlign:"center"}} className=" btn-login" to="/login" >
            Ingresar
            <AiOutlineLogin style={{ marginLeft: 5 }} />
          </Nav.Link>
        </ListItem>

      </List>
    </Box>
  );

  return (
    <>
      <Navbar bg="white" fixed="top" expand="lg" className='shadow'>
        <Container className='px-2'>
          <Navbar.Brand href="/">     <img
            src="/images/logotipo.png"
            width={150}
            alt="Logo fundamor"
          /></Navbar.Brand>
          <div>

            <React.Fragment key={"left"}>
              <div className='d-md-none'>
              <IconButton onClick={toggleDrawer("left", true)}>
               <AiOutlineMenu size={34} color="#de6426" /></IconButton>
              </div>
              <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>

          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 ms-5 py-1 justify-content-between align-items-center">
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
                <Nav.Link className={active === "contact" ? "active" : ""} as={Link} to="/contact">
                  Contacto
                </Nav.Link>
                <Nav.Link className={active === "about" ? "active" : ""} as={Link} to="/about">
                  Nosotros
                </Nav.Link>
              </div>
              <div className='separator'>
                <Nav.Link as={Link} className="d-none d-md-block btn-login ps-3" to="/login" >
                  Ingresar
                  <AiOutlineLogin style={{ marginLeft: 5 }} />
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>



    </>
  )
}

export default NavbarComponent
