import { useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick/lib/slider'
import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Footer from '../../components/partials/Footer'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { handleResponseError } from '../../Shared/utils'
import axiosClient from '../../config/axios'
import { useParams } from 'react-router-dom'
import './css/animalDetail.scss'
import SectionTitle from '../../components/partials/SectionTitle'
import AnimalList from '../../components/partials/AnimalList'

export default function AnimalDetail() {



    return (<div>

        <NavbarComponent active='animals' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Lista de animales", "route": "/foundation/animals" }, { name: "Detalle del animal" }]} />
        <AnimalDetailSection />
        <SectionTitle subtitle={"Conoce más peludos"} title="Aún tenemos varios animales esperando"
            text="Recuerda que todos los perros y gatos que son dados en adopción, tienen su esquema de vacunación al día, están desparasitados y algunos son esterilizados."
        />
        <AnimalList />
        <Footer />
    </div>)
}


const AnimalDetailSection = () => {


    const [animal, setAnimal] = useState({
        data: null,
        loading: false,
    })

    const [settingsSlick, setSettingsSlick] = useState({
        dots: true,
        infinite: false,
        speed: 500,
        autoPlay: true,
        arrows: false,
        slidesToShow: 1,//ajustar segun el numero de animales
        slidesToScroll: 1,// ajustar segun el numero de animales

    })

    let { animal_id } = useParams();
    const MySwal = withReactContent(Swal);
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));






    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setAnimal({ ...animal, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/2/animal/${animal_id}`);
                if (res.data.state) {
                    console.log(res.data)
                    if (mounted) {
                        console.log(res.data.data)

                        //  console.log()
                        setAnimal({ data: res.data.data, loading: false, });
                    }
                }
            } catch (error) {
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

    return <section className='animal-detail-section'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8'>
                    <div className='animal-card'>
                        <div>
                            {animal.data ? <Slider {...settingsSlick}>
                                {animal.data.animalImage.map((element, index) => (
                                    <div key={index} className='col-12'>

                                        <div className='slick-animal-detail-card'>
                                            <img src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="img" />
                                            {/* <img src="/images/no_image.png" alt="img" /> */}


                                        </div>
                                    </div>
                                ))}

                            </Slider> : null}
                        </div>

                        <div className='header'>
                            <h4 className="name">Nerón</h4>
                            <p className="description">Descripcións</p>
                        </div>
                        <div className="animal-info">
                            <h5 className="title">Información del animal</h5>
                            {animal.data ? <div className="row">
                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Genero:</h6>
                                        <span>
                                            {animal.data.sexo}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Edad:</h6>

                                        <span id="age">Meses (aprox)</span>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Color:</h6>
                                        <span>
                                            {animal.data.color}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Tamaño:</h6>
                                        <span>
                                            {animal.data.tamanio}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Esterilizado:</h6>
                                        <span>
                                            {animal.data.esterilizado ? "Si" : "No"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Desparasitado:</h6>
                                        <span>
                                            {animal.data.desparasitado ? "Si" : "No"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Fecha de rescate:</h6>

                                        <span>
                                            {animal.data.fecha_rescate !== null ? animal.data.fecha_rescate : "No registra"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Sitio de rescate:</h6>
                                        <span>
                                            {animal.data.sitio_rescate !== null ? animal.data.sitio_rescate : "No registra"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-4 col-6">
                                    <div className="info-item">
                                        <h6>Vacunas:</h6>
                                        <span>
                                            {animal.data.vacunas !== null ? animal.data.vacunas : "No registra"}
                                        </span>
                                    </div>
                                </div>
                            </div> : animal.loading ?
                                <div className="row">
                                    <p>Cargando...</p>
                                </div> : null
                            }
                            {/* <a href="/animals/form/{animal.id_animal}" className="btn">Adoptar <img
                                src="img/icon/w_pawprint.png" alt=""/></a> */}
                        </div>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='banner'>
                        <img src="/images/banner-pasos-adopcion.webp" alt='pasos adopción' />
                        <div className='info-banner'>
                            <h3>¿Tienes alguna duda?</h3>
                            <p>Comunicate con nosotros al +57 313 6309884</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
}