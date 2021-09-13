import React from 'react'
import NavBar from './components/Navbar'
import { Button } from './components/Button/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './screens/About'
import Home from './screens/Home'
import Gallery from './screens/Gallery'
import Login from './screens/Login'
import './scss/_global.scss'
import AppContext from './context/AppContext'

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
              <Route path="/gallery" component={Gallery} />
              <Route path="/login" component={Login} />
            </div>
          </Switch>
        </Router>
      </div>
    </AppContext>
  )
}

export default App
