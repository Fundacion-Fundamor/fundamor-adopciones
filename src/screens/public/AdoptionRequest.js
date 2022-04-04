
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
import { LoadingButton } from '@mui/lab';

export default function AdoptionRequest() {


    return (
        <div>
            <NavbarComponent active='animals' />
            <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Lista de animales", "route": "/foundation/animals" }, { name: "Quiero adoptar" }]} />

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
        acceptTerms: false,
        questions: [],
        answers: []
    })


    const [contactData, setContactData] = useState({
        name: "",
        identification: "",
        email: "",
        occupation: "",
        address: "",
        phoneNumber: "",
        housePhone: ""
    })


    const [loading, setLoading] = useState(false);
    const [wasValidated, setWasValidated] = useState(false);

    const MySwal = withReactContent(Swal);


    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/2/adopt/${animal_id}`);
                if (res.data.state) {
                  
                    if (mounted) {
               
                        setValues({ animal: res.data.data.animal, questions: res.data.data.questions, loading: false, answers: [] });
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
    const saveAnswer = (value, questionId) => {

    
        let tmp = values.answers;

        let exist = false;
        let resFilter = tmp.filter((element) => {

            if (questionId === element.questionId) {
                exist = true;
                element.answer = value;

            }
            return element;
        })

        if (!exist) {
            resFilter.push({ answer: value, questionId })
        }

        setValues({ ...values, answers: resFilter });
    }


    const validateData = () => {

        let isValid = true;
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (contactData.name === "" || contactData.identification === "" ||
            contactData.occupation === "" || contactData.address === "" ||
            contactData.phoneNumber === "" || contactData.phoneNumber.length !== 10 || !values.acceptTerms) {
            isValid = false
          
        } else if (contactData.email !== "" && re.test(contactData.email) === false) {
          
            isValid = false
        }

        else if (parseInt(contactData.housePhone) > 9999999) {
         
            isValid = false
        }

  
        if (values.answers.length !== values.questions.length) {
            isValid = false
           
        } else {
            let result = values.answers.find(element => element.answer.trim() === "");

            if (result) {
              
                isValid = false
            }

        }



        setWasValidated(true);
        if (isValid) {

            sendRequest();

        }
    }

    const sendRequest = async () => {

        try {
            setLoading(true);
            const res = await axiosClient.post(`/api/foundations/2/adoptionForm`, {
                idAnimal: animal_id,
                nombre: contactData.name,
                identificacion: contactData.identification,
                email: contactData.email,
                ocupacion: contactData.occupation,
                ciudad: contactData.address,
                fijo: contactData.housePhone,
                movil: contactData.phoneNumber,
                preguntas: values.answers
            });
            if (res.data.state) {

                let resAction = await MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.2 }}>{res.data.message}</p>,
                    allowOutsideClick: false,
                    icon: "success",

                });

                if (resAction.isConfirmed) {

                    window.location.replace(process.env.REACT_APP_URL + "/foundation/animals")
                }

            } else {
                MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                    allowOutsideClick: false,
                    icon: "error",

                });

            }
            setLoading(false)
        } catch (error) {
            let text = handleResponseError(error);
            MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{text}</p>,
                allowOutsideClick: false,
                icon: "error",

            });
            setLoading(false)
        }
    }

    return !values.loading && values.animal ? (<>

        <section className='sectiom-title py-5'>
            <div className='container'>
                <div className='row justify-content-center d-flex '>
                    <div className='col-xl-7 col-lg-9'>
                        <div className='section-title'>
                            <FaPaw className='section-icon mb-2' color='#de6426' size={27} />
                            <h3 className='mb-3'>{"Inicia el proceso de adopción"}</h3>
                            <h2>{"Envíanos tus datos"}</h2>
                            <p>Este es el primer paso, si quieres adoptar a <span style={{ fontSize: "16px", textTransform: "uppercase", padding: 5, background: "#de6426", color: "white", borderRadius: 8, fontWeight: 700 }}>{values.animal.nombre}</span>. Por favor responde a todas las preguntas del formulario que encontrarás a continuación. Una vez enviadas, desde la fundación revisaremos tu solicitud y te daremos una respuesta lo antes posible</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='adopter-form-section'>
            <div className='container'>
                <form className={"needs-validation adopter-form " + (wasValidated ? "was-validated" : "")}>
                    <div className="text-center mb-4">
                        <h5 className="sub-title "><span>Datos de contacto</span></h5>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className='question-title' >Nombre completo <span className='text-danger'>*</span></label>
                            <input type="text" maxLength="70" className="form-control"
                                placeholder="Ingrese su nombre aquí" defaultValue="" required

                                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            />
                            <div className="invalid-feedback">
                                Debe ingresar un nombre
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className='question-title'>Identificación <span className='text-danger'>*</span></label>
                            <input type="number" maxLength="45" className="form-control" id="identification"
                                name="identification" placeholder="Ingrese su identificación aquí" defaultValue={""} required
                                onChange={(e) => setContactData({ ...contactData, identification: e.target.value })}
                            />
                            <div className="invalid-feedback">
                                Debe ingresar su identificación
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className='question-title'>Correo</label>

                            <input type="email" maxLength="90" className="form-control" id="email" name="email"
                                placeholder="Ingrese su correo aquí" aria-describedby="inputGroupPrepend"
                                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            />
                            <div className="invalid-feedback" >
                                Debe ingresar un correo válido
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className='question-title'>Ocupación <span className='text-danger'>*</span></label>
                            <input type="text" maxLength="90" className="form-control" id="ocupacion" name="ocupacion"
                                placeholder="Ingrese su ocupación aquí" required
                                onChange={(e) => setContactData({ ...contactData, occupation: e.target.value })}
                            />
                            <div className="invalid-feedback" >
                                Debe ingresar una ocupación
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className='question-title'>Dirección <span className='text-danger'>*</span></label>
                            <input type="text" maxLength="90" className="form-control" id="ciudad" name="ciudad"
                                placeholder="Ingrese su nombre dirección aquí" required
                                onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                            />
                            <div className="invalid-feedback" >
                                Debe ingresar su dirección
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label className='question-title'>Teléfono fijo </label>
                            <input type="number" max="9999999" min="0000000" className="form-control" id="fijo" name="fijo"
                                placeholder="Ingrese su teléfono fijo aquí"

                                onChange={(e) => setContactData({ ...contactData, housePhone: e.target.value })}
                            />
                            <div className="invalid-feedback">
                                Debe ingresar un número de celular válido
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className='question-title'>Teléfono móvil <span className='text-danger'>*</span></label>
                            <input type="number" max="9999999999" min="3000000000" className="form-control" id="movil" name="movil"
                                placeholder="Ingrese su numero de celular aquí" required
                                onChange={(e) => setContactData({ ...contactData, phoneNumber: e.target.value })}
                            />
                            <div className="invalid-feedback">
                                Debe ingresar un teléfono de contacto válido
                            </div>
                        </div>
                    </div>


                    <div className='request-part'>
                        <div className="text-center mb-4 mt-5">
                            <h5 className="sub-title "><span>Datos de la solicitud</span></h5>
                        </div>


                        <div className="row ">
                            {values.questions.map((element, index) => (<div className="col-md-6 my-3" key={index}>

                                {element.tipo_pregunta === "abierta" ? <>
                                    <label className='question-title'>{index + 1}. {element.titulo} <span className='text-danger'>*</span></label>
                                    <input type="text" onBlur={(e) => saveAnswer(e.target.value, element.id_pregunta)} className="form-control"
                                        placeholder="Ingrese aquí su respuesta" required />
                                    <div className="invalid-feedback">
                                        Debe ingresar una respuesta
                                    </div>
                                </> :
                                    <>
                                        <label className='question-title'>{index + 1}. {element.titulo} <span className='text-danger'>*</span></label>

                                        {element.questionOptions.map((option, optionIndex) => (
                                            <div className='mt-2' key={optionIndex}>

                                                <div className="form-check">
                                                    <input className="form-check-input" value={option.descripcion} type="radio" name={"radio" + index} onChange={(e) => saveAnswer(e.target.value, element.id_pregunta)} required />
                                                    <label className="form-check-label" >
                                                        {option.descripcion}
                                                    </label>

                                                </div>

                                            </div>
                                        ))}


                                    </>

                                }
                            </div>))}
                        </div>
                        <div className="adopter-form-footer">

                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        id="invalidCheck" required value={"y"} onChange={(e) => { setValues({ ...values, acceptTerms: e.target.checked }) }} />
                                    <label className="form-check-label">
                                        Acepto las políticas de tratamiento de datos de la
                                        Fundación Fundamor de Calarcá
                                    </label>
                                    <div className="invalid-feedback">
                                        Debe aceptar los términos y condiciones
                                    </div>
                                </div>
                            </div>

                            <LoadingButton loading={loading}
                                size="medium" variant="contained"
                                sx={{ fontSize: 16, mt: 5, textTransform: "none", height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold", background: "#de6426", "&:hover": { background: "#cd642f" } }}
                                onClick={validateData}
                            >
                                Enviar solicitud
                            </LoadingButton>

                        </div>

                    </div>
                </form>

            </div>
        </section>
    </>
    ) : (
        <div className='container h-100 py-5 justify-content-center d-flex flex-row align-items-center'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className='ms-3 m-0'>Cargando...</p>
        </div>
    );
} 