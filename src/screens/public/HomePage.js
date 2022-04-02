import React from 'react'
import NavbarComponent from '../../components/Navbar';
import './css/home.scss'
import { FaPaw, FaUserAlt, FaDog } from 'react-icons/fa';
import { GiCat, } from 'react-icons/gi';
import { BiDonateHeart, } from 'react-icons/bi';



import { Link } from 'react-router-dom';

import Footer from '../../components/partials/Footer';
import SectionTitle from '../../components/partials/SectionTitle';
import AnimalList from '../../components/partials/AnimalList';
import BrandSection from '../../components/partials/BrandSection';
import { HistoryFoundationSection } from '../../components/partials/HistoryFoundationSection';
export default function HomePage() {


    return (<div>
        <NavbarComponent />
        <div className='hero-section d-flex align-items-center'>
            <div className='row w-100'>
                <div className='col-xl-5 col-lg-7 col-md-10 text-white px-5' >
                    <h1>Tu tienes el lugar <span>ellos</span> el amor </h1>
                    <p className='mt-4'>No abandones la oportunidad de dar amor, adopta y da sentido a tu vida</p>
                    <button className='custom-button slide mt-5'>Conoce Más <FaPaw style={{ marginLeft: 8 }} /></button>
                </div>
            </div>

        </div>
        <div className="container">
            <div className='row'>
                <div className="col-12">
                    <div className="help-wrap">
                        <div className="left-message">
                            {/* <FaUserAlt style={{ marginRight: 10 }} size={44} /> */}
                            <p className='text-center'>Puedes hacer mucho por los animales</p>

                        </div>
                        <div className="category">

                            <div className='row'>
                                <div className="col-md-4 stack-item">

                                    <Link to="/foundation/animals"><FaDog style={{ marginRight: 8 }} size="44" /> Adopta un perro</Link>
                                </div>
                                <div className="col-md-4 stack-item">

                                    <Link to="/foundation/animals"><GiCat style={{ marginRight: 8 }} size="44" /> Adopta un gato </Link>
                                </div>
                                <div className="col-md-4 stack-item">

                                    <Link to="/"><BiDonateHeart style={{ marginRight: 8 }} size="44" />  Dona</Link>
                                </div>

                            </div>
                        </div>
                        <div className="right-message">

                            <p className='text-center'>¡Ayudanos a ayudar!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className='analytics-section'>
            <div className='row justify-content-center d-flex'>

                <div className='col-md-4 col-sm-12'>

                    <div className='analytics-card'>
                        <h1>45+</h1>
                        <h4>Aanimales rescatados</h4>
                    </div>
                </div>

                <div className='col-md-4 col-sm-12'>

                    <div className='analytics-card'>
                        <h1>45+</h1>
                        <h4>Aanimales rescatados</h4>
                    </div>
                </div>
                <div className='col-md-4 col-sm-12'>

                    <div className='analytics-card'>
                        <h1>45+</h1>
                        <h4>Aanimales rescatados</h4>
                    </div>
                </div>
            </div>
        </section>

        <SectionTitle subtitle={"Conoce nuestros peludos"} title="Ellos están esperandos ser adoptados"
            text="Recuerda que todos los perros y gatos que son dados en adopción, tienen su esquema de vacunación al día, están desparasitados y algunos son esterilizados."
        />

        <AnimalList />

        <HistoryFoundationSection />
        <BrandSection />
        <SectionTitle subtitle={"Infórmate"} title="Publicaciones recientes"
            text="Conoce las campañas y noticias mas recientes que hemos publicado"
        />
        <Footer />
    </div>);

}








