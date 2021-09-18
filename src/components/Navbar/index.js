import React, { useState, useEffect } from 'react'
import { Button } from '../Button'
import { Link } from 'react-router-dom'
import './navbar.scss'


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
                Colaboradores
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/about"
                className="navbar__link"
                onClick={closeMobileMenu}
              >
                Acerca de
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/gallery"
                className="navbar__link"
                onClick={closeMobileMenu}
              >
                Galería
              </Link>
            </li>

            <li className="navbar__item">
              <Link
                to="/Login"
                className="navbar__link"
                onClick={closeMobileMenu}
              >
                Login 
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="navbar__link navbar__link--mobile"
                onClick={closeMobileMenu}
              >
                Botón oculto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
