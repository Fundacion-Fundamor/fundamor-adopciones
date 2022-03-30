import React from 'react'
import { Link } from 'react-router-dom';
import './footer.scss'
import { FiExternalLink } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

/**Footer reutilizado en la página pública
 * 
 * @returns 
 */
export default function Footer() {


    return (
        <div className='footer' style={{ background: "#f8f5f0", paddingTop: "80px", }}>
            <div className='container'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='' style={{ maxWidth: "400px" }}>
                        <img src="/images/logotipo.png" alt="Logo fundamor" style={{ width: "100%" }} />
                    </div>
                    <p style={{ maxWidth: "550px", textAlign: "center", marginTop: "25px" }}>Puedes hacer donaciones de alimento, medicamentos, implementos de aseo para el refugio y los peludos, cobijas, toallas, etc.</p>

                    <Link to="/contact"> Contáctanos <FiExternalLink size="24" /></Link>
                    <div className='social' style={{ marginTop: "15px" }}>
                        <FaFacebook size="24" />
                        <FaInstagram size="24" />
                        <FaYoutube size="24" />

                    </div>
                </div>
            </div>
            <div style={{ width: "100%", height: "60px", background: "#0a303a", display: "flex", alignItems: "center", marginTop: 15 }}>
                <p style={{ padding: 0, margin: 0, marginLeft: "10px", color: "#d5d5d5" }}>| Copyright &copy; : Fundamor Calarcá</p>
            </div>
        </div>
    );
}