import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './NavBar.css'

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
            <p className="navbar__title">Fundamor</p>
            <p className="navbar__small-title">adopciones</p>
            {/* <i className="fab fa-typo3" /> */}
          </Link>
          <div className="navbar__menu-icon" onClick={handleClick}>
            
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul
            className={
              click ? 'navbar__menu navbar__menu--active' : 'navbar__menu '
            }
          >
            <li className="navbar__item">
              <Link to="/" className="navbar__link" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/services"
                className="navbar__link"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/products"
                className="navbar__link"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="navbar__link navbar__link--mobile"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--positive">Sign In</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
