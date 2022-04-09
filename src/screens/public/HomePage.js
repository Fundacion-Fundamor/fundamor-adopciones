import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../../components/Navbar';
import './css/home.scss'
import { FaPaw, FaDog } from 'react-icons/fa';
import { GiCat, } from 'react-icons/gi';
import { BiDonateHeart, } from 'react-icons/bi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoPawOutline } from 'react-icons/io5';

import { Link } from 'react-router-dom';

import Footer from '../../components/partials/Footer';
import SectionTitle from '../../components/partials/SectionTitle';
import AnimalList from '../../components/partials/AnimalList';
import BrandSection from '../../components/partials/BrandSection';
import { HistoryFoundationSection } from '../../components/partials/HistoryFoundationSection';
import axiosClient from '../../config/axios';
import { handleResponseError } from '../../Shared/utils';
import FoundationContext from '../../context/foundation/foundationContext';
export default function HomePage() {

    let actualYear = new Date().getFullYear();
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
                        <h4 className='text-center'>ANIMALES RESCATADOS</h4>
                    </div>
                </div>

                <div className='col-md-4 col-sm-12'>

                    <div className='analytics-card'>
                        <h1>45+</h1>
                        <h4 className='text-center'>ANIMALES DADOS EN ADOPCIÓN</h4>
                    </div>
                </div>
                <div className='col-md-4 col-sm-12'>

                    <div className='analytics-card'>
                        <h1>{parseInt(actualYear) - 2011}</h1>
                        <h4 className='text-center'>AÑOS DE HISTORIA</h4>
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
        <LastPostList />

        <DonationCard />
        <Footer />
    </div>);

}



const LastPostList = () => {
    const [values, setValues] = useState({
        data: [],
        loading: true,
    });

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/post?min=${0}&max=${3}&search=${""}`);
                if (res.data.state) {


                    if (mounted) {
                        setValues({ ...values, data: res.data.data.rows, loading: false });
                    }
                } else {

                    setValues({ ...values, loading: false })
                    MySwal.fire({
                        title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                        allowOutsideClick: false,
                        icon: "error",

                    });
                }
            } catch (error) {
                setValues({ ...values, loading: false })
                let text = handleResponseError(error);
                MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{text}</p>,
                    allowOutsideClick: false,
                    icon: "error",

                });
            }


        }

        request();

        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12' >
                    {values.data.map((element, index) => (
                        <div key={index} className='post-item backgroud-orange p-5 rounded-3'>
                            <div className='post-thumb'>
                                <Link to={"/foundation/posts/" + element.id_publicacion}>
                                    {element.postImage && element.postImage.length > 0 ? <img src={`${process.env.REACT_APP_API_URL}/${element.postImage[0].ruta}`} alt="img" /> :
                                        <img src="/images/no_image.png" alt="img" />
                                    }
                                </Link>
                            </div>
                            <div className='post-content'>
                                <div className='post-date'>
                                    <FaRegCalendarAlt size={22} />
                                    <p className='ms-2'>{new Date(element.fecha_creacion.split(".")[0]).toLocaleDateString()}</p>
                                </div>
                                <h2><Link to={"/foundation/posts/" + element.id_publicacion}>{element.titulo} </Link> </h2>
                                <p className='limit-3'> {element.cuerpo}</p>
                            </div>

                            <div className='post-footer'>
                                <Link className="read-more" to={"/foundation/posts/" + element.id_publicacion}>Leer más <IoPawOutline className='ms-1' /></Link>
                            </div>
                        </div>))}

                </div>
            </div>
        </div>
    )
}


const DonationCard = () => {

    const { currentFoundation } = useContext(FoundationContext)

    return (<div className='container mb-5'>
        <div className='row'>
            <div className='col-12'>
                <div className=' bg-danger p-5 rounded flex-column'>
                    <div className='d-flex '>
                        <h2 className='text-center mb-3 text-white fw-bold'>Haz tu donación</h2>

                    </div>
                    <div className=' flex-row align-items-center justify-content-between'>

                        <div className='d-flex w-100 p-3 bg-light rounded align-items-center donation-accounts' >
                            <div className='donate-logo'>
                                <img src='/images/zakat.png' alt='donation logo' />
                            </div>
                            {currentFoundation && currentFoundation.cuenta_donaciones !== "" ? <p className='lh-base ms-3 w-100 text-center fw-bold' >

                                {currentFoundation.cuenta_donaciones.split("\n").map((element, index) => element.trim() !== "" ? (
                                    <React.Fragment key={index}>
                                        {element}<br></br>
                                    </React.Fragment>
                                ) : null)}
                            </p> : <p className='w-100 text-center' >Dona en nuestros puntos autorizados</p>}
                            <div className='donate-logo'>
                                <img src='/images/blood-bag.png' alt='donation logo2' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}



