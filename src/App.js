import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import authToken from './config/authToken'
import PrivateRoute from './components/PrivateRoute'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

//Styles imports
import './scss/_global.scss'

// Screens Imports
import Post from './screens/Post'
import Login from './screens/Login'
import './scss/_global.scss'
import PasswordReset from './screens/PasswordReset'
import Employeee from './screens/Employee'
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
import { grey, orange, purple, } from '@mui/material/colors';
import SideBar from './components/Sidebar';
import { Box, CssBaseline } from '@mui/material';
import Topbar from './components/Navbar/TopBar.js';
import AuthContext from './context/auth/authContext';
import Profile from './screens/Profile';
import Config from './screens/Site/Config';
import Nunito from './assets/fonts/Nunito/Nunito-VariableFont_wght.ttf';
import NotFoundPage from './screens/NotFoundPage';
import BreadCumbState from './context/breadcumb/breacumbState';
import HomePage from './screens/public/HomePage';
import AnimalList from './screens/public/AnimalList';
import AnimalDetail from './screens/public/AnimalDetail';
import About from './screens/public/About';
import AdoptionRequest from './screens/public/AdoptionRequest';
import Contact from './screens/public/Contact';
import PostList from './screens/public/PostList';
import PostDetail from './screens/public/PostDetail';
import FoundationContext from './context/foundation/foundationContext';
const drawerWidth = 260;

const token = localStorage.getItem("token");
if (token) {
	authToken(token);
}


/**Componente inicial encargado de la navegación de la plataforma de adopción
 * Teniendo en cuenta que se usó context para la creación de la plataforma,
 * en este componente se inicializan todos los providers que soportan la logica de las 
 * peticiones. Tambien se incluye el provider para theming
 * 
 * @author Neyder Figueroa Sánchez
 * @author Andrés Felipe Llinás Rodriguez
 * 
 */
function App() {


	const { authenticated } = useContext(AuthContext);
	const theme = createTheme({
		components: {
			"MuiOutlinedInput": {
				styleOverrides: {
					root: {
						borderRadius: "10px!important",
					},
				},
			},
			MuiCssBaseline: {
				styleOverrides: `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Nunito'), local('Nunito-Regular'), url(${Nunito}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
			},
		},
		custom: { //customiza colores
			bg: "#FFFFFF",
			fc1: grey[900],
			primary: {
				light: "#de6426",
				dark: "#1b4f5c"
			},
			secondary: {
				light: "#b3d5ff",
				dark: "#0a303a"
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
				fontWeight: 800,
				color: "#0a303a"
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
			body1: {
				color: "#0a303a"
			},
			body2: {
				fontWeight: "700",
			},
			p: { color: "red" },
			color: "#1b4f5c",
			fontWeight: "900",
			fontFamily: "Nunito"

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


	// Estado para el control del sidebar
	const [leftDrawerOpened, setLeftDrawerOpened] = useState(false)

	const handleLeftDrawerToggle = () => {
		setLeftDrawerOpened(!leftDrawerOpened)
	}
	const { getFoundation } = useContext(FoundationContext)

	useEffect(() => {
		getFoundation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<PostState>
				<AdoptionState>
					<AnimalState>
						<EmployeeState>
							<AdopterState>
								<QuestionState>
									<TrackingState>
										<BreadCumbState>
											<div className="App">
												<Router>
													<Box sx={{ display: 'flex' }}>

														<CssBaseline />

														{/* header */}
														{authenticated ? <Topbar drawerOpen={leftDrawerOpened} handleDrawer={handleLeftDrawerToggle} /> : null}

														{/* drawer */}
														{authenticated ? <SideBar open={leftDrawerOpened} handleDrawer={handleLeftDrawerToggle} /> : null}


														{/* main content */}
														<Main theme={theme} open={leftDrawerOpened} authenticated={authenticated}>
															<Switch>

																{/* Rutas publicas */}
																<Route path="/login" component={Login} />
																<Route path="/about" exact component={About} />
																<Route path="/contact" exact component={Contact} />
																<Route path="/foundation/posts" exact component={PostList} />
																<Route path="/foundation/posts/:post_id" exact component={PostDetail} />
																<Route path="/passwordReset" component={PasswordReset} />
																<Route path="/foundation/animals" exact component={AnimalList} />
																<Route path="/foundation/animals/:animal_id" exact component={AnimalDetail} />
																<Route path="/foundation/animals/adopt/:animal_id" exact component={AdoptionRequest} />
																<Route path="/" exact component={HomePage} />

																{/* Rutas privadas */}
																<PrivateRoute path="/posts" component={Post} />
																<PrivateRoute path="/employees" component={Employeee} />
																<PrivateRoute path="/animals" component={Animal} />
																<PrivateRoute path="/questions" component={Question} />
																<PrivateRoute path="/adopters" component={Adopter} />
																<PrivateRoute path="/adoptions" component={Adoption} />
																<PrivateRoute path="/dashboard" component={Dashboard} />
																<PrivateRoute path="/profile" component={Profile} />
																<PrivateRoute path="/siteConfig" component={Config} />

																<Route path="*" component={NotFoundPage} />
															</Switch>
														</Main>
													</Box >
												</Router>
											</div>
										</BreadCumbState>
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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'authenticated' })(({ theme, open, authenticated }) => {

	return (
		{
			...theme.typography.mainContent,
			backgroundColor: authenticated ? "#FFD5A6" : "white",
			marginTop: authenticated ? "68px !important" : "0px",
			width: "100%",
			borderRadius: "12px",
			padding: authenticated ? 20 : 0,
			fontFamily: "Nunito",
			color: "#1e4b57",
			...(!open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
			}),
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen
				}),

				[theme.breakpoints.up('md')]: {
					width: `calc(100% - ${authenticated ? drawerWidth : 0}px)`,
				},
			})
		})
});

export default App
