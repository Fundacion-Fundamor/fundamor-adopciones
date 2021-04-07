import React from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        {' '}
        <NavBar />
        <Switch>
          <Route path="/" exact />
        </Switch>
      </Router>
    </div>
  )
}

export default App
