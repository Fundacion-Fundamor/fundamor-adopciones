import React, { useContext, useEffect, useRef, useState } from 'react'

import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Footer from '../../components/partials/Footer'
import './css/contact.scss'
import { BiPhone, BiEnvelope, BiMapPin } from 'react-icons/bi';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SectionTitle from '../../components/partials/SectionTitle';
import { Link } from 'react-router-dom'
import axiosClient from '../../config/axios'
import { handleResponseError } from '../../Shared/utils'
import { LoadingButton } from '@mui/lab'
import FoundationContext from '../../context/foundation/foundationContext'



export default function Contact() {


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    }, [])


    return (<div>

        <NavbarComponent active='contact' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Contacto" }]} />

        <ContactSection />
      
        <Footer />
    </div>)
}

const ContactSection = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const { currentFoundation } = useContext(FoundationContext);

    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false)

    const form = useRef(null)
    const sendMessage = async () => {
        try {
            const res = await axiosClient.post(`/api/foundations/contactmessage/2`, {
                name: values.name,
                phone: values.phone,
                email: values.email,
                message: values.message
            });
            if (res.data.state) {

                form.current.reset()
                MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                    allowOutsideClick: false,
                    icon: "success",

                });

            } else {
                MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                    allowOutsideClick: false,
                    icon: "error",

                });


            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            let text = handleResponseError(error);
            MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{text}</p>,
                allowOutsideClick: false,
                icon: "error",

            });
        }
    }

    return (<><section className='contact-section'>
        <div className='container'>
            <div className='row justify-content-between px-5'>
                <div className='form-section col-lg-6 col-md-8 order-2 order-lg-0'>
                    <div className="contact-title mb-20">
                        <h3 className="sub-title">Contáctanos</h3>
                        <h2 className="title">¿Tienes alguna duda o quieres donar?</h2>
                    </div>
                    <div className="contact-form-wrapper">
                        <p>Envíanos un mensaje si tienes alguna inquietud acerca de las adopciones, donaciones,
                            los animales o los servicios que ofrecemos. También nos puedes escribir si necesitas ayuda con
                            algún peludo que la esté pasando mal. No lo olvides, estamos para ayudar. Nos
                            podremos en contacto contigo lo antes posible.</p>
                        <form ref={form} onSubmit={(e) => {

                            e.preventDefault()

                            if (e.target.checkValidity()) {
                                sendMessage()
                            }


                        }} className="contact-form needs-validation" >
                            <div className="form-grp">
                                <label htmlFor="name">Nombre <span>*</span></label>
                                <input className="form-control"
                                    onBlur={(event) => {
                                        setValues({ ...values, name: event.target.value })
                                    }}
                                    type="text" id="name" name="name" placeholder="" required />
                                <div className="invalid-feedback">
                                    Debe ingresar un nombre
                                </div>
                            </div>
                            <div className="form-grp">
                                <label htmlFor="email">Correo<span>*</span></label>
                                <input className="form-control" type="email" id="email" name="email" placeholder="" required

                                    onBlur={(event) => {
                                        setValues({ ...values, email: event.target.value })
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Debe ingresar un correo válido
                                </div>
                            </div>
                            <div className="form-grp">
                                <label htmlFor="phone">Teléfono <span>*</span></label>
                                <input className="form-control" type="tel" id="phone" name="phone" placeholder="" required


                                    onBlur={(event) => {
                                        setValues({ ...values, phone: event.target.value })
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Debe ingresar un teléfono
                                </div>
                            </div>
                            <div className="form-grp">
                                <label htmlFor="message">Mensaje <span>*</span></label>
                                <textarea name="message" className='form-control' id="message" placeholder="" required

                                    onBlur={(event) => {
                                        setValues({ ...values, message: event.target.value })
                                    }}
                                ></textarea>
                                <div className="invalid-feedback">
                                    Debe ingresar un mensaje
                                </div>
                            </div>

                            <LoadingButton loading={loading}
                                size="medium" variant="contained"
                                sx={{ fontSize: 16, mt: 5, textTransform: "none", height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold", background: "#de6426", "&:hover": { background: "#cd642f" } }}
                                type="submit">
                                Enviar
                            </LoadingButton>
                        </form>
                    </div>
                </div>
                <div className='col-xl-5 col-lg-6 col-md-8'>
                    <div className='contact-info-card'>
                        <div className='logo-foundation'>
                            <img src='/images/imagotipo.png' alt='logo fundación' />
                        </div>
                        <div className='contact-info-data'>
                            <ul style={{ padding: 0 }}>
                                <li>
                                    <div className="icon"><BiMapPin color='white' /></div>
                                    <div className="content">
                                        <p>{currentFoundation && currentFoundation.direccion ? currentFoundation.direccion : "No registra"}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"><BiPhone color='white' /></div>
                                    <div className="content">
                                        <p>{currentFoundation && currentFoundation.telefono ? currentFoundation.telefono : "No registra"}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon"><BiEnvelope color='white' /> </div>
                                    <div className="content">
                                        <p>{currentFoundation && currentFoundation.correo ? currentFoundation.correo : "No registra"}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='social-info'>
                            <div className='social-icon'>
                                <a rel='noreferrer' href={"https://web.facebook.com/fundamorcalarca/?_rdc=1&_rdr"} target={"_blank"}> <FaFacebookF /></a>
                            </div>
                            <div className='social-icon'>
                                <a rel='noreferrer' href={"https://www.instagram.com/fundamorcalarca/?hl=es"} target={"_blank"}><FaInstagram /></a>
                            </div>
                            <div className='social-icon'>
                                <a rel='noreferrer' href={"https://www.youtube.com/channel/UCNkfxop_V7eirZh_qmgdWfA"} target={"_blank"}><FaYoutube /></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>

    <SectionTitle title="Haz tu donación" subtitle={"Ubicanos en el mapa"} text={"Puedes hacer donaciones de alimento, medicamentos, implementos de aseo para el refugio y los peludos, cobijas, toallas, etc."}
        />
        <div className="google-map-code" dangerouslySetInnerHTML={{__html:  `${currentFoundation && currentFoundation.url_mapa ? currentFoundation.url_mapa : ""}`}}>

            
            
        </div>
    </>
    )



}