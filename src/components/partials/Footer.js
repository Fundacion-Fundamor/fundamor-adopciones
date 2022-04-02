import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './footer.scss'
import { FiExternalLink } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaChevronUp } from 'react-icons/fa'

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
                        <a rel='noreferrer' href={"https://web.facebook.com/fundamorcalarca/?_rdc=1&_rdr"} target={"_blank"}> <FaFacebook size="24" /></a>
                        <a rel='noreferrer' href={"https://www.instagram.com/fundamorcalarca/?hl=es"} target={"_blank"}><FaInstagram size="24" /></a>
                        <a rel='noreferrer' href={"https://www.youtube.com/channel/UCNkfxop_V7eirZh_qmgdWfA"} target={"_blank"}><FaYoutube size="24" /></a>

                    </div>
                </div>
            </div>
            <div style={{ width: "100%", height: "60px", background: "#0a303a", display: "flex", alignItems: "center", marginTop: 15 }}>
                <p style={{ padding: 0, margin: 0, marginLeft: "10px", color: "#d5d5d5" }}>| Copyright &copy; : Fundamor Calarcá</p>
            </div>
            <ScrollButton />
        </div >
    );
}


const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div>
            <button onClick={scrollToTop} className="btn-scroll" style={{ display: visible ? 'inline' : 'none', position: "fixed" }} >
                <FaChevronUp />
            </button>
        </div>
    );
}