import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../components/Navbar';
import './css/animalList.scss'
import { FaRegCalendarAlt } from 'react-icons/fa';

import { } from 'react-icons/bi';
import { AiFillInfoCircle } from 'react-icons/ai';
import { IoPawOutline, } from 'react-icons/io5';
import { MdCompareArrows, } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Footer from '../../components/partials/Footer';
import SectionTitle from '../../components/partials/SectionTitle';
import Breadcrumb from '../../components/partials/Breadcrumb';
import { LoadingButton } from '@mui/lab';
import { calculateAnimalAge, handleResponseError } from '../../Shared/utils';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SearchBox from '../../components/partials/SearchBox';

const animalsPerPage = 10;
export default function AnimalList() {


    return (<div>
        <NavbarComponent active='animals' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Lista de animales", "route": "" }]} />
        <SectionTitle subtitle={"Conoce nuestros peludos"} title="Ellos están esperandos ser adoptados"
            text="Todos los perros y gatos que son dados en adopción, tienen su esquema de vacunación al día, están desparasitados y algunos son esterilizados."
        />
        <AnimalsSection />
        <Footer />
    </div>);

}


function AnimalsSection() {

    const [values, setValues] = useState({
        data: [],
        currentPage: 1,
        totalData: 0,
        loading: true,
        initial: true,
        filters: {

            order: "recent",
            search: "",
            specie: "",
            size: "",

        }
    });


    const MySwal = withReactContent(Swal);
    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/2/animals?min=${(values.currentPage * animalsPerPage) - animalsPerPage}&max=${animalsPerPage}&order=${values.filters.order}&search=${values.filters.search}&specie=${values.filters.specie}&size=${values.filters.size}`);
                if (res.data.state) {
                    if (mounted) {


                        let animals = res.data.data.rows;
                        let tmpData = values.data;
                        if (!values.initial) {
                            tmpData = [...tmpData, ...animals]
                        }

                        setValues({ ...values, data: (values.initial ? animals : tmpData), loading: false, totalData: res.data.data.count, initial: false });
                    }
                } else {
                    MySwal.fire({
                        title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                        allowOutsideClick: false,
                        icon: "error",

                    });
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
    }, [values.currentPage, values.filters])


    const handleFilters = (filter, value) => {
        setValues({ ...values, filters: { ...values.filters, [filter]: value }, initial: true, currentPage: 1 })
    }

    return (
        <section className='animals-section'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-3 col-md-8 order-sm-0 mb-5'>
                        <div className='sidebar-options px-3'>
                            <SearchBox handleSearch={handleFilters} placeholder="Busca por nombre" />
                            <h3 >Especie</h3>

                            <div className="custom-form-check ">
                                <label>
                                    Todas
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("specie", "")} type="radio" checked={values.filters.specie === ""} />

                            </div>
                            <div className="custom-form-check  mt-1" >
                                <label>
                                    Perro
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("specie", "perro")} type="radio" checked={values.filters.specie === "perro"} />

                            </div>

                            <div className="custom-form-check mt-1" >
                                <label >
                                    Gato
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("specie", "gato")} type="radio" checked={values.filters.specie === "gato"} />

                            </div>

                            <h3>Tamaño</h3>

                            <div className="custom-form-check mt-1" >
                                <label >
                                    Todos
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("size", "")} type="radio" checked={values.filters.size === ""} />

                            </div>
                            <div className="custom-form-check mt-1" >
                                <label>
                                    Grande
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("size", "grande")} type="radio" checked={values.filters.size === "grande"} />

                            </div>

                            <div className="custom-form-check mt-1" >
                                <label >
                                    Mediano
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("size", "mediano")} type="radio" checked={values.filters.size === "mediano"} />

                            </div>

                            <div className="custom-form-check mt-1" >
                                <label >
                                    Pequeño
                                </label>
                                <input className="form-check-input" onChange={() => handleFilters("size", "pequeño")} type="radio" checked={values.filters.size === "pequeño"} />

                            </div>

                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='animals-wrapper'>
                            <div className='toolbar mb-5'>
                                <div className='left-options'>
                                    <IoPawOutline color="#de6426" size="24" />
                                    <label>Viendo {values.data.length} de {values.totalData} animales</label>
                                </div>
                                <div className='right-options'>
                                    {values.loading ? <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div> : null}
                                    <label>Ordenar: </label>
                                    <select className='form-select-sm ms-3' defaultValue={"recent"} onChange={(e) => { handleFilters("order", e.target.value) }}>
                                        <option value={"recent"} >Mas recientes</option>
                                        <option value="ancient">Mas antiguos</option>

                                    </select>
                                </div>
                            </div>
                            <div className='row'>

                                {values.data.map((element, index) => (
                                    <div key={index} className='col-lg-4 col-md-6'>
                                        <div className='adoption-item mb-5'>
                                            <div className='animal-thumb'>
                                                {element.animalImage && element.animalImage.length > 0 ? <img src={`${process.env.REACT_APP_API_URL}/${element.animalImage[0].ruta}`} alt="img" /> :
                                                    <img src="/images/no_image.png" alt="img" />
                                                }
                                                <Link className='btn-adopt' to={"/foundation/animals/" + element.id_animal}>Adoptar <IoPawOutline color="white" size="24" /></Link>
                                            </div>
                                            <div className='animal-description'>
                                                <h3>{element.nombre}</h3>
                                                <div className='info'>
                                                    <p><AiFillInfoCircle /> {element.sexo}</p>

                                                    <p><MdCompareArrows /> {element.tamanio}</p>
                                                </div>
                                                <div className='footer'>
                                                    <FaRegCalendarAlt /> <p>{calculateAnimalAge(element.fecha_nacimiento)} Aproximadamente</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}

                            </div>
                            <div className='justify-content-center align-items-center d-flex'>
                                {/* <Link className='btn-adopt' to="/employees">Adoptar </Link> */}
                                {values.data.length !== values.totalData ? <LoadingButton loading={values.loading}
                                    // className='btn-adopt'
                                    size="medium" variant="contained"
                                    sx={{ fontSize: 12, height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold", background: "#de6426", "&:hover": { background: "#cd642f" } }}

                                    onClick={() => {

                                        if (!values.loading) {
                                            setValues({ ...values, loading: true, currentPage: values.currentPage + 1 })

                                        }
                                    }}
                                >
                                    Cargar más
                                </LoadingButton> : null}
                                {!values.loading && values.data.length === values.totalData ? <p>Fin de la lista</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}


