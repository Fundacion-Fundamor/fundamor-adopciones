
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import { FaPaw } from 'react-icons/fa';
import Footer from '../../components/partials/Footer';
import './css/adoptionRequest.scss'
import axiosClient from '../../config/axios';
import { useParams } from 'react-router-dom';
import { handleResponseError } from '../../Shared/utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AdoptionRequest() {


    return (
        <div>
            <NavbarComponent active='animals' />
            <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Lista de animales", "route": "/foundation/animals" }, { name: "Quiero adoptar" }]} />
            <section className='sectiom-title py-5'>
                <div className='container'>
                    <div className='row justify-content-center d-flex '>
                        <div className='col-xl-7 col-lg-9'>
                            <div className='section-title'>
                                <FaPaw className='section-icon mb-2' color='#de6426' size={27} />
                                <h3 className='mb-3'>{"Inicia el proceso de adopción"}</h3>
                                <h2>{"Envíanos tus datos"}</h2>
                                <p>Este es el primer paso, si quieres adoptar a <span>NERÓN</span>. Por favor responde a todas las preguntas del formulario que encontrarás a continuación. Una vez enviadas, desde la fundación revisaremos tu solicitud y te daremos una respuesta lo antes posible</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AdopterFormSection />
            {/* <AnimalDetailSection /> */}
            <Footer />
        </div>
    )
}


const AdopterFormSection = () => {

    let { animal_id } = useParams();
    const [values, setValues] = useState({
        animal: null,
        loading: true,
        questions: []
    })

    const MySwal = withReactContent(Swal);


    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/2/adopt/${animal_id}`);
                if (res.data.state) {
                    console.log(res.data)
                    if (mounted) {


                        //  console.log()
                        setValues({ animal: res.data.data.animal, questions: res.data.data.questions, loading: false, });
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


    return !values.loading && values.animal ? (

        <section className='adopter-form-section'>
            <div className='container'>
                <form action="/api/v2/adopterForm" className="needs-validation adopter-form">
                    <div className="text-left mb-4">
                        <h5 className="sub-title"><span>Datos de contacto</span></h5>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label >Nombre completo</label>
                            <input type="text" maxLength="70" className="form-control" id="name" name="name"
                                placeholder="" defaultValue="" required />
                            <div className="invalid-feedback">
                                Debe ingresar un nombre
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label >Identificación</label>
                            <input type="number" maxLength="45" className="form-control" id="identification"
                                name="identification" placeholder="" defaultValue={""} required />
                            <div className="invalid-feedback">
                                Debe ingresar su identificación
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Correo</label>

                            <input type="email" maxLength="90" className="form-control" id="email" name="email"
                                placeholder="" aria-describedby="inputGroupPrepend" />
                            <div className="invalid-feedback" >
                                Debe ingresar un correo válido
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label >Ocupación</label>
                            <input type="text" maxLength="90" className="form-control" id="ocupacion" name="ocupacion"
                                placeholder="" required />

                        </div>

                        <div className="col-md-6 mb-3">
                            <label >Dirección</label>
                            <input type="text" maxLength="90" className="form-control" id="ciudad" name="ciudad"
                                placeholder="" required />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label >Teléfono fijo</label>
                            <input type="tel" maxLength="7" className="form-control" id="fijo" name="fijo"
                                placeholder="" />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label>Teléfono móvil</label>
                            <input type="tel" maxLength="10" className="form-control" id="movil" name="movil"
                                placeholder="" required />
                            <div className="invalid-feedback">
                                Debe ingresar un teléfono de contacto
                            </div>
                        </div>
                    </div>



                    <div className="text-left mb-25 mt-25">
                        <h5 className="sub-title"><span>Datos de la solicitud</span></h5>
                    </div>
                    <div className="adopter-form-footer">

                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"
                                    id="invalidCheck" required />
                                <label className="form-check-label">
                                    Acepto las políticas de tratamiento de datos de la
                                    Fundación Fundamor de Calarcá
                                </label>
                                <div className="invalid-feedback">
                                    Debe aceptar los términos y condiciones
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn rounded-btn">Enviar <i id="load-more-icon" className="fa fa-spinner fa-spin"></i></button>
                    </div>
                </form>
            </div>
        </section>
    ) : (<p>Cargando...</p>);
} 