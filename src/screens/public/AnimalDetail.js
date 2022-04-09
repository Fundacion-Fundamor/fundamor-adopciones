import React, { useEffect, useState } from 'react'
import Slider from 'react-slick/lib/slider'
import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Footer from '../../components/partials/Footer'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { calculateAnimalAge, handleResponseError } from '../../Shared/utils'
import axiosClient from '../../config/axios'
import { useParams } from 'react-router-dom'
import './css/animalDetail.scss'
import SectionTitle from '../../components/partials/SectionTitle'
import AnimalList from '../../components/partials/AnimalList'
import { IoPawOutline, } from 'react-icons/io5';
import { Link } from 'react-router-dom';

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

    // eslint-disable-next-line no-unused-vars
    const [settingsSlick, setSettingsSlick] = useState({
        dots: true,
        infinite: false,
        speed: 500,
        autoPlay: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,

    })

    let { animal_id } = useParams();
    const MySwal = withReactContent(Swal);


    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setAnimal({ ...animal, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/animal/${animal_id}`);
                if (res.data.state) {
                   
                    if (mounted) {
                        setAnimal({ data: res.data.data, loading: false, });
                    }
                } else {
                    let resAction = await MySwal.fire({
                        title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.2 }}>{res.data.message}</p>,
                        allowOutsideClick: false,
                        icon: "error",

                    });

                    if (resAction.isConfirmed) {

                        window.location.replace(process.env.REACT_APP_URL + "/foundation/animals")
                    }
                }
            } catch (error) {
                let text = handleResponseError(error);
                let resAction = await MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.2 }}>{text}</p>,
                    allowOutsideClick: false,
                    icon: "error",

                });

                if (resAction.isConfirmed) {

                    window.location.replace(process.env.REACT_APP_URL + "/foundation/animals")
                }
            }


        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
       
        });
        request();

        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animal_id])

    return <section className='animal-detail-section'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8'>
                    {animal.data ? <div className='animal-card'>
                        <div>
                            <Slider {...settingsSlick}>
                                {animal.data.animalImage.map((element, index) => (
                                    <div key={index} className='col-12'>

                                        <div className='slick-animal-detail-card'>
                                            <img src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="img" />
                                            {/* <img src="/images/no_image.png" alt="img" /> */}


                                        </div>
                                    </div>
                                ))}

                            </Slider>
                        </div>

                        <div className={`header ${animal.data.animalImage.length === 0 ? "mt-0" : ""}`}>
                            <h4 className="name">{animal.data.nombre}</h4>
                            <p className="description">{animal.data.caracteristicas}</p>
                        </div>
                        <div className="animal-info">
                            <h5 className="title">Información del animal</h5>
                            <div className="row">
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

                                        <span>{calculateAnimalAge(animal.data.fecha_nacimiento)} (aprox)</span>
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

                                <div className='col-12 mt-5'>
                                    <Link className='btn-request' to={"/foundation/animals/adopt/" + animal_id}>Realizar solicitud <IoPawOutline color="white" size="24" /></Link>

                                </div>
                            </div>

                        </div>
                    </div> : animal.loading ?
                        <div className='container h-100 py-5 justify-content-center d-flex flex-row align-items-center'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className='ms-3 m-0'>Cargando...</p>
                        </div> : null
                    }
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