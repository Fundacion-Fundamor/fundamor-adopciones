import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiOutlineLogin,AiOutlineMenu } from 'react-icons/ai';
import './navbar.scss'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>

            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>

            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Navbar bg="white" fixed="top" expand="lg">
        <Container className='px-2'>
          <Navbar.Brand href="/">     <img
            src="/images/logotipo.png"
            width={150}
            alt="Logo fundamor"
          /></Navbar.Brand>
          <div>

            <React.Fragment key={"left"}>
              <div className='d-md-none'>
                <Button onClick={toggleDrawer("left", true)}><AiOutlineMenu size={34} color="#de6426"/></Button>
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
                <Nav.Link as={Link} className="d-none d-md-block btn-login" to="/login" >
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
