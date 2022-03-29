import React from 'react'

import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Footer from '../../components/partials/Footer'
import './css/about.scss'
import { BiCheck } from 'react-icons/bi';
import BrandSection from '../../components/partials/BrandSection'
import { HistoryFoundationSection } from '../../components/partials/HistoryFoundationSection'

export default function About() {



    return (<div>

        <NavbarComponent active='about' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Nosotros" }]} />

        <AboutSection />
        <HistoryFoundationSection />
        <BrandSection />
        <Footer />
    </div>)
}

const AboutSection = () => {


    return (
        <section style={{ background: "#f8f5f0", paddingTop: "80px",  paddingBottom: "80px",}}>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12">
                        <div className="about-content">
                            <h5 className="sub-title">¿Quienes somos?</h5>
                            <h2 className="title">Fundación protectora y de amor por los animales - de Calarcá {" "}
                                <span>FUNDAMOR DE CALARCÁ</span>
                            </h2>
                            <p>Somos una fundación que esta en pro del cuidado y rescate de animales que han pasado por
                                situaciones dificiles de calle y maltrato, todo nace a partir de nuestros valores: </p>
                            <div className="values-list">
                                <ul>
                                    <li><BiCheck size={27} color="#de6426" style={{ minWidth: 27, marginRight: 15 }} /> La responsabilidad que es una obligación, ya sea
                                        moral o legal. Ser responsable es asumir las consecuencias de nuestras acciones
                                        y decisiones, es tratar de que todos nuestros actos
                                        sean realizados de acuerdo con una noción de justicia y de cumplimiento con el
                                        deber en todos los sentidos</li>
                                    <li><BiCheck size={27} color="#de6426" style={{ minWidth: 27, marginRight: 15 }} /> La sensibilidad, que reside en la capacidad que
                                        tenemos los seres humanos para percibir y comprender diferentes situaciones,
                                        como a la naturaleza, a sus circunstancias y sus ambientes y así actuar
                                        correctamente en beneficio de ello.</li>
                                    <li><BiCheck size={27} color="#de6426" style={{ minWidth: 27, marginRight: 15 }} /> El respeto, cuando hablamos de este hablamos de
                                        los demás. De esta manera, el respeto implica marcar los límites de las
                                        posibilidades de hacer o no hacer de cada uno y donde comienzan las
                                        posibilidades de acción los demás. Es la base de la
                                        convivencia en sociedad.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
