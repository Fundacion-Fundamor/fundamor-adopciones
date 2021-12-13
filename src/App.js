import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import authToken from './config/authToken'
import PrivateRoute from './components/PrivateRoute'

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

const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <AuthState>
    <PostState>
      <AdoptionState>
        <AnimalState>
          <EmployeeState>
            <AdopterState>
              <QuestionState>
                <TrackingState>
                  <div className="App">
                    <Router>
                      <NavbarComponent />{' '}
                      <div className="main-content">
                        <Switch>
                          {/* Rutas publicas */}
                          <PublicRoute path="/" exact component={Home} />
                          <PublicRoute path="/about" component={About} />
                          <PublicRoute path="/login" component={Login} />
                          <PublicRoute path="/passwordReset" component={PasswordReset} />
                          
                          {/* Rutas privadas */}
                          <PrivateRoute path="/posts" component={Post} />
                          <PrivateRoute path="/gallery" component={Gallery} />
                          <PrivateRoute path="/employees" component={Employeee} />
                          <PrivateRoute path="/animals" component={Animal} />
                          <PrivateRoute path="/questions" component={Question} />
                          <PrivateRoute path="/adopters" component={Adopter} />
                          <PrivateRoute path="/adoptions" component={Adoption} />
                          <PrivateRoute path="/dashboard" component={Dashboard} />
                        </Switch>
                      </div>
                    </Router>
                  </div>
                </TrackingState>
              </QuestionState>
            </AdopterState>
          </EmployeeState>
        </AnimalState>
      </AdoptionState>
     </PostState>
    </AuthState>
  )
}

export default App
