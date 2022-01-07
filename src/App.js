import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import authToken from './config/authToken'
import PrivateRoute from './components/PrivateRoute'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

//Components imports
import NavbarComponent from './components/Navbar'

//Styles imports
import './scss/_global.scss'

// Screens Imports
import About from './screens/About'
import Home from './screens/Home'
import Post from './screens/Post'
import Gallery from './screens/Gallery'
import Login from './screens/Login'
import './scss/_global.scss'
import PasswordReset from './screens/PasswordReset'
import Employeee from './screens/Employee'

import AuthState from './context/auth/authState'
import PostState from './context/post/postState'
import EmployeeState from './context/employee/employeeState'
import QuestionState from './context/question/questionState'
import AnimalState from './context/animal/animalState'
import AdopterState from './context/adopter/adopterState'
import AdoptionState from './context/adoption/adoptionState'

import Question from './screens/Questions'
import Animal from './screens/Animal'
import Adopter from './screens/Adopter'
import Adoption from './screens/Adoption'
import TrackingState from './context/tracking/trackingState'
import Dashboard from './screens/Dashboard'
import PublicRoute from './components/PublicRoute'
import { blue, green, grey, orange, purple, red } from '@mui/material/colors';
import SideBar from './components/Sidebar';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import Topbar from './components/Navbar/TopBar.js';
import AuthContext from './context/auth/authContext';
import Profile from './screens/Profile';

const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}


/**TODO: 
 * Mover todo el enrutamiento hacia otro archivo
 * Ajustar todo el border radius para que consuma del theme provider
 * 
 * realizar el breadcumb que indica donde está parado el usuario
 * ajustar todos los reponsives de los cruds para que se adapten a la nueva navegacion
 * problema al abrir el modal de agregar posts
 * 
 * @returns 
 */
function App() {


  const { authenticated } = useContext(AuthContext);
  const theme = createTheme({
    custom: { //customiza colores
      bg: "#FFFFFF",
      fc1: grey[900],
      primary: {
        light: "#ffc9db",
        dark: "#F25287"
      },
      secondary: {
        light: "#b3d5ff",
        dark: "#529af2"
      },
      white: "white",
      danger: orange[500],
      borderRadius: 4
    },
    typography: { //customiza fuentes
      t1: {
        fontSize: 24,
        // fontWeight:100
      },
      t2: {
        fontSize: 20,
        // fontWeight:100
      },
      t3: {
        fontSize: 16,
        fontWeight: 100
      },
      subtitle2: {
        fontSize: 12,
        fontWeight: 600,
        color: 'gray'
      },

    },
    palette: { //para customizar colores predeterminados
      // primary: {
      //   main: '#000000',
      // },
      // secondary: {
      //   main: '#edf2ff',
      // },
    },

    primary: {
      main: purple[500],
    },
  });



  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  // Handle left drawer
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true)

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened)
  }

  // useEffect(() => {
  //     setLeftDrawerOpened(true)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [matchDownMd]);

  useEffect(() => {
    if (authenticated) {


    } else {
      return <Redirect to="/" />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  return (
    <ThemeProvider theme={theme}>

      <PostState>
        <AdoptionState>
          <AnimalState>
            <EmployeeState>
              <AdopterState>
                <QuestionState>
                  <TrackingState>
                    <div className="App">
                      <Router>
                        {authenticated ? <div style={{ marginTop: "58px" }}></div> : <NavbarComponent />}

                        <div className="main-content">
                          <Box sx={{ display: authenticated ? 'flex' : "none" }}>
                            <CssBaseline />

                            {/* header */}
                            {authenticated ? <Topbar drawerOpen={leftDrawerOpened} handleDrawer={handleLeftDrawerToggle} /> : null}

                            {/* drawer */}
                            {authenticated ? <SideBar open={leftDrawerOpened} handleDrawer={handleLeftDrawerToggle} /> : null}

                            {/* main content */}
                            <Main theme={theme} open={leftDrawerOpened}>


                              <Switch>
                                {/* Rutas privadas */}
                                <PrivateRoute path="/posts" component={Post} />
                                <PrivateRoute path="/gallery" component={Gallery} />
                                <PrivateRoute path="/employees" component={Employeee} />
                                <PrivateRoute path="/animals" component={Animal} />
                                <PrivateRoute path="/questions" component={Question} />
                                <PrivateRoute path="/adopters" component={Adopter} />
                                <PrivateRoute path="/adoptions" component={Adoption} />
                                <PrivateRoute path="/dashboard" component={Dashboard} />
                                <PrivateRoute path="/profile" component={Profile} />
                              </Switch>

                            </Main>

                          </Box >
                        </div>
                        <Switch>
                          {/* Rutas publicas */}
                          <PublicRoute path="/" exact component={Home} />
                          <PublicRoute path="/about" component={About} />
                          <PublicRoute path="/login" component={Login} />
                          <PublicRoute path="/passwordReset" component={PasswordReset} />
                          <PublicRoute path="*" component={() => <div>Esta página no existe 😒😒😒</div>} />
                        </Switch>


                      </Router>
                    </div>
                  </TrackingState>
                </QuestionState>
              </AdopterState>
            </EmployeeState>
          </AnimalState>
        </AdoptionState>
      </PostState>

    </ThemeProvider>
  )
}




const drawerWidth = 260;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  backgroundColor: red[50],
  marginTop: "15px !important",
  marginBottom: "15px",
  width: "100%",
  borderRadius: "12px",
  marginLeft: "10px",
  marginRight: "10px",
  padding: 20,
  ...(!open && {


    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),


    backgroundColor: blue[50],

    [theme.breakpoints.up('lg')]: {

      // marginLeft: -(drawerWidth - 20),
      // width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.up('md')]: {

      // marginLeft: -(drawerWidth - 20),
      // width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      // marginLeft: '20px',
      // width: `calc(100% - ${drawerWidth}px)`,
      // padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: '10px',
      // width: `calc(100% - ${drawerWidth}px)`,
      // padding: '16px',
      // marginRight: '10px'
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    // marginLeft: 0,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,

    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: '10px'
    }
  })
}));

export default App
