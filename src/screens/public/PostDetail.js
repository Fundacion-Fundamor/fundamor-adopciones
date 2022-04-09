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
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/postDetail.scss'

export default function PostDetail() {



    return (<div>

        <NavbarComponent active='post' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Publicaciones", "route": "/foundation/posts" }, { name: "Detalle de la publicación" }]} />
        {/* <AnimalDetailSection /> */}
        <PostDetailSection />
        <Footer />
    </div>)
}


const PostDetailSection = () => {

    let { post_id } = useParams();
    const [values, setValues] = useState({
        data: null,
        recentPost: [],
        loading: true,

    });
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
    const MySwal = withReactContent(Swal);
    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/post/` + post_id);
                if (res.data.state) {
                    if (mounted) {
                        setValues({ ...values, data: res.data.data.post, loading: false, recentPost: res.data.data.recentPost });
                    } else {
                        setValues({ ...values, loading: false });
                        MySwal.fire({
                            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{res.data.message}</p>,
                            allowOutsideClick: false,
                            icon: "error",

                        });
                    }
                }
            } catch (error) {
                setValues({ ...values, loading: false });
                let text = handleResponseError(error);
                MySwal.fire({
                    title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{text}</p>,
                    allowOutsideClick: false,
                    icon: "error",

                });
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
    }, [values.filters, post_id])


    return <section className="post-list-section">

        <div className='container'>
            <div className='row justify-content-center'>

                <div className='col-md-8'>
                    {values.loading ?
                        <div className='mb-5 justify-content-center d-flex flex-row align-items-center'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className='ms-3 m-0'>Cargando...</p>
                        </div> : null}
                    {values.data !== null ? <div className='post-item'>
                        <div>
                            <Slider {...settingsSlick}>
                                {values.data.postImage.map((element, index) => (
                                    <div key={index} className='col-12'>

                                        <div className='slick-animal-detail-card'>
                                            <img src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="img" />
                                            {/* <img src="/images/no_image.png" alt="img" /> */}


                                        </div>
                                    </div>
                                ))}

                            </Slider>
                        </div>
                        <div className='post-content mt-5'>
                            <div className='post-date'>
                                <FaRegCalendarAlt size={22} />
                                <p className='ms-2'>{new Date(values.data.fecha_creacion.split(".")[0]).toLocaleDateString()}</p>
                            </div>
                            <h2 style={{ fontWeight: 800 }}>{values.data.titulo}</h2>
                            <p style={{ lineHeight: 2 }}>{values.data.cuerpo}</p>
                        </div>
                    </div> : null}
                </div>
                <div className='col-md-4 col-sm-12 order-sm-0 mb-5'>
                    <div className='search-widget'>
                        <h3 className='mb-5' style={{ color: "#de6426" }}>Publicaciones recientes </h3>

                        {values.recentPost.map((element, index) => (
                            <div key={index} className='post-content my-3'>

                                <h3 className='limit-recent-post' style={{ fontWeight: 800 }}>{element.titulo}</h3>
                                <div className='recent-post-footer mb-3'>
                                    <div className='date'>
                                        <FaRegCalendarAlt size={14} />
                                        <p className='ms-2'>{new Date(element.fecha_creacion.split(".")[0]).toLocaleDateString()}</p>
                                    </div>
                                    <Link to={"/foundation/posts/" + element.id_publicacion}>Leer más</Link>
                                </div>
                                <div className='dropdown-divider'></div>
                            </div>

                        ))}
                    </div>
                </div>



            </div>


        </div>

    </section>
}