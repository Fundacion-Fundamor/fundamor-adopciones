import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useContext, useState } from 'react'
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
import { blue, grey, orange, purple, } from '@mui/material/colors';
import SideBar from './components/Sidebar';
import { Box, CssBaseline } from '@mui/material';
import Topbar from './components/Navbar/TopBar.js';
import AuthContext from './context/auth/authContext';
import Profile from './screens/Profile';
import Config from './screens/Site/Config';
import FoundationState from './context/foundation/foundationState';
import Nunito from './assets/fonts/Nunito/Nunito-VariableFont_wght.ttf';
import NotFoundPage from './screens/NotFoundPage';
import BreadCumbState from './context/breadcumb/breacumbState';
const drawerWidth = 260;

const token = localStorage.getItem("token");
if (token) {
	authToken(token);
}



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'authenticated' })(({ theme, open, authenticated }) => {
	console.log(authenticated)
	return (
		{
			...theme.typography.mainContent,
			backgroundColor: "#FFD5A6",
			marginTop: authenticated ? "68px !important" : "0px",
			// marginBottom: "15px",
			width: "100%",
			borderRadius: "12px",
			// marginLeft: "10px",
			// marginRight: "10px",
			padding: authenticated ? 20 : 0,
			fontFamily: "Nunito",
			color: "#1e4b57",
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
					width: `calc(100% - ${authenticated ? drawerWidth : 0}px)`,
				},
				[theme.breakpoints.down('sm')]: {
					// marginLeft: '10px'
				}
			})
		})
});


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
		components: {
			"MuiOutlinedInput": {
				styleOverrides: {
					// Name of the slot
					root: {
						// Some CSS
						borderRadius: "10px!important",
						// '& fieldset': {
						//   borderColor: 'red',
						// },
						// '&:hover fieldset': {
						//   borderColor: '#F25287 !important',
						// },
						// '&.Mui-focused fieldset': {
						//   borderColor: 'yellow !important',
						// },
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
			body1: {
				// color: "#1b4f5c",
				color: "#0a303a"
				// fontWeight: "900",
			},
			body2: {
				// color: "#1b4f5c",
				// color: "#0a303a",
				fontWeight: "700",
			},
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




	// Handle left drawer
	const [leftDrawerOpened, setLeftDrawerOpened] = useState(true)

	const handleLeftDrawerToggle = () => {
		setLeftDrawerOpened(!leftDrawerOpened)
	}

	return (
		<ThemeProvider theme={theme}>
			<FoundationState>
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

																	{/* Rutas publicas */}
																	<Route path="/login" component={Login} />
																	<Route path="/passwordReset" component={PasswordReset} />
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
			</FoundationState>
		</ThemeProvider>
	)
}






export default App
