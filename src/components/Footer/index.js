import React from 'react'
import './footer.scss'

const Footer = () => (
  <footer className="page-footer pt-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3 footer-text">
          <img src={'/images/logotipo.png'} alt="" width="250" />
          <p className="pt-4">Fundación Fundamor de Calarcá.</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Servicios</h5>
          <ul className="list-unstyled footer-links">
            <li>
              <a href="#!">Adopta</a>
            </li>
            <li>
              <a href="#!">Acerca de</a>
            </li>
            <li>
              <a href="#!">Contacto</a>
            </li>
            <li>
              <a href="#!">Ingresar</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Siguenos en</h5>
          <ul className="list-unstyled footer-links">
            <li>
              <a href="#!">Facebook</a>
            </li>
            <li>
              <a href="#!">Instagram</a>
            </li>
            <li>
              <a href="#!">Youtube</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3 p">
      © 2021 Copyright: Fundamor Calarcá
    </div>
  </footer>
)

export default Footer
