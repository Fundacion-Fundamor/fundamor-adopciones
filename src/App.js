import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import AppContext from './context/AppContext'
import authToken from './config/authToken'
import PrivateRoute from './components/PrivateRoute'

//Components imports
import NavBar from './components/Navbar'

//Styles imports
import './scss/_global.scss'

// Screens Imports
import About from './screens/About'
import Home from './screens/Home'
import Gallery from './screens/Gallery'
import Login from './screens/Login'
import Test from './screens/CssTests'


const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  return (
    <AppContext>
      <div className="App">
        <Router>
          <NavBar />{' '}
          <Switch>
            <div className="main-content">
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <PrivateRoute path="/gallery" component={Gallery} />
              <Route path="/login" component={Login} />
              <Route path="/test" component={Test} />
            </div>
          </Switch>
        </Router>
      </div>
    </AppContext>
  )
}

export default App
