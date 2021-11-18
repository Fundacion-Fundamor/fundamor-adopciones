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
import Gallery from './screens/Gallery'
import Login from './screens/Login'
import './scss/_global.scss'
import Test from './screens/CssTests'
import PasswordReset from './screens/PasswordReset'
import Employeee from './screens/Employee'

import AuthState from './context/auth/authState'
import EmployeeState from './context/employee/employeeState'
import QuestionState from './context/question/questionState'
import AnimalState from './context/animal/animalState'
import AdopterState from './context/adopter/adopterState'
import AdoptionState from './context/adoption/adoptionState'

import Question from './screens/Questions'
import Animal from './screens/Animal'
import Adopter from './screens/Adopter'
import Adoption from './screens/Adoption'

const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <AuthState>
      <AdoptionState>
        <AnimalState>
          <EmployeeState>
            <AdopterState>
              <QuestionState>
                <div className="App">
                  <Router>
                    <NavbarComponent />{' '}
                    <div className="main-content">
                      <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <PrivateRoute path="/gallery" component={Gallery} />
                        <Route path="/login" component={Login} />
                        <Route path="/passwordReset" component={PasswordReset} />
                        <PrivateRoute path="/employees" component={Employeee} />
                        <PrivateRoute path="/animals" component={Animal} />
                        <PrivateRoute path="/questions" component={Question} />
                        <PrivateRoute path="/adopters" component={Adopter} />
                        <PrivateRoute path="/adoptions" component={Adoption} />
                        <Route path="/csstests" component={Test} />
                      </Switch>
                    </div>
                  </Router>
                </div>
              </QuestionState>
            </AdopterState>
          </EmployeeState>
        </AnimalState>
      </AdoptionState>
    </AuthState>
  )
}

export default App
