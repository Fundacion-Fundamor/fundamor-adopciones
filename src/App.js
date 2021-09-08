import React from 'react'
import NavBar from './components/Navbar/NavBar'
import { Button } from './components/Button/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'
import Gallery from './components/pages/Gallery/Gallery'

function App() {
  return (
    <div className="App">
      <Router>
        {' '}
        <NavBar />
        <Switch>
          <Route path="/" exact />
          <Route path="/about" component={About} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
