import React from 'react'
import NavBar from './components/Navbar'
import { Button } from './components/Button/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './screens/About'
import Home from './screens/Home'
import Gallery from './screens/Gallery'

function App() {
  return (
    <div className="App">
      <Router>
        {' '}
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
