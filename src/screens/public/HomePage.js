import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../../components/Navbar';
import './css/home.scss'
import { FaPaw, FaUserAlt, FaDog } from 'react-icons/fa';
import { GiCat, } from 'react-icons/gi';
import { BiDonateHeart, } from 'react-icons/bi';
import { AiFillSetting, AiFillPlayCircle } from 'react-icons/ai';
import { IoPawOutline, } from 'react-icons/io5';

import ModalVideo from 'react-modal-video'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import AnimalContext from '../../context/animal/animalContext';
import Accordion from 'react-bootstrap/Accordion'
import Footer from '../../components/partials/Footer';
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
        {/* <div className="">
            <div className="col-12">
                <div className="help-wrap">
                    <div className="left-message">
                        <FaUserAlt style={{ marginRight: 10 }} size="44" />
                        <p>Puedes hacer mucho por los animales</p>

                    </div>
                    <div className="category">
                        <ul>
                            <li>
                                <Link style={{ color: "#000" }} to="/employees"><FaDog style={{ marginRight: 8 }} size="44" /> Adopta un perro</Link>
                            </li>
                            <li><Link style={{ color: "#000" }} to="/employees"><GiCat style={{ marginRight: 8 }} size="44" /> Adopta un gato </Link></li>
                            <li><Link style={{ color: "#000" }} to="/employees"><BiDonateHeart style={{ marginRight: 8 }} size="44" />  Dona</Link></li>
                        </ul>
                    </div>
                    <div className="right-message">

                        <p>¡Ayudanos a ayudar!</p>
                    </div>
                </div>
            </div>
        </div> */}

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
         <Footer/>
    </div>);

}


function AnimalList() {

    const [settingsSlick, setSettingsSlick] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        autoPlay: true,
        slidesToShow: 3,//ajustar segun el numero de animales
        slidesToScroll: 3,// ajustar segun el numero de animales
        arrows: true,
    })
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const { getAnimalsFromPublic, animals, loading } = useContext(AnimalContext);

    useEffect(() => {

        if (matchDownSm) {
            setSettingsSlick({ ...settingsSlick, slidesToScroll: 1, slidesToShow: 1, arrows: false, dots: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownSm])


    useEffect(() => {

        getAnimalsFromPublic()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(animals)
    }, [animals])


    return (<div className="animal-area">
        <div className="container">
            <div className="row justify-content-center">

                {loading ? <p className='text-center'>Cargando...</p> : (animals.length > 0 ?
                    <Slider {...settingsSlick}>
                        {animals.map((element, index) => index < 10 ? (
                            <div key={index} className='col-xl-3 d-flex justify-content-center'>

                                <div className='slick-animal-card'>
                                    <Link to="/employees">
                                        {element.animalImage.length > 0 ? <img src={`${process.env.REACT_APP_API_URL}/${element.animalImage[0].ruta}`} alt="img" /> :
                                            <img src="/images/no_image.png" alt="img" />
                                        }
                                    </Link>
                                    <div className='animal-description'>
                                        <p className='d-flex align-items-center text-capitalize'><AiFillSetting style={{ marginRight: 2 }} color="#de6426" />{element.sexo}</p>
                                        <h3>{element.nombre}</h3>
                                        <Link to="/employees"> Leer Más <IoPawOutline style={{ transform: "rotateZ(90deg);" }} color="#de6426" size="24" /> </Link>
                                    </div>
                                </div>
                            </div>
                        ) : null)}

                    </Slider>

                    : <p className='text-center'>Aún no hay animales registrados</p>)}

            </div>
        </div>
    </div>
    )
}


function BrandSection(params) {
    const [settingsSlick, setSettingsSlick] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        autoPlay: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
    })
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {

        if (matchDownSm) {
            setSettingsSlick({ ...settingsSlick, slidesToScroll: 2, slidesToShow: 2 })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownSm])


    return (
        <div className="brand-area pt-80 pb-80">
            <div className="container">
                <div className="row ">
                    <Slider {...settingsSlick}>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-2.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-3.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-1.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-4.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-5.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-6.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-7.1.png" alt="img" />
                            </div>
                        </div>
                    </Slider>
                </div>

            </div>
        </div>
    )
}

function HistoryFoundationSection(params) {
    const [isOpen, setOpen] = useState(false)
    let youtube_video_id = "https://www.youtube.com/watch?v=HkJThi019OY".match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
    console.log(youtube_video_id)
    return (
        <div className='historical-area'>
            <div className='container'>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" allowFullScreen={false} onClose={() => setOpen(false)} />

                <div className='row align-items-center'>
                    <div className='col-sm-12 col-lg-6 col-md-6'>

                        <div onClick={() => setOpen(true)} className='history-wrapper' style={{ position: "relative", cursor: "pointer" }}>
                            <img src='/images/tv-frame.png' style={{ position: "absolute", zIndex: 1, width: "100%", bottom: 0 }} alt="tv" />
                            <img style={{ position: "absolute", width: "79%", zIndex: 0, bottom: "4%", left: "7%", borderRadius: "8px" }} src={'https://img.youtube.com/vi/' + youtube_video_id + '/hqdefault.jpg'} width={200} alt="preview video de presentación" />


                        </div>

                    </div>
                    <div className='col-m6-12 col-lg-6 col-md-12'>

                        <div className='foundation-info'>
                            <h3>Acerca de la fundación</h3>
                            <h2 className='mb-3'>Historia y futuro</h2>

                            <Accordion  defaultActiveKey="0">
                                <Accordion.Item className='my-2 rounded-3' eventKey="0">
                                    <Accordion.Header >Misión</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item className='my-2' eventKey="1">
                                    <Accordion.Header>Visión</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>

                </div>
            </div>
           
        </div>)
}

function SectionTitle({ title, subtitle, text }) {


    return (<section className='animals-section py-5'>
        <div className='container'>
            <div className='row justify-content-center d-flex '>
                <div className='col-xl-7 col-lg-9'>
                    <div className='section-title'>
                        <FaPaw className='section-icon mb-2' color='#de6426' size={27} />
                        <h3 className='mb-3'>{subtitle}</h3>
                        <h2>{title}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}