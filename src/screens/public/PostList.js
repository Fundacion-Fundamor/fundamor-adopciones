import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarComponent from '../../components/Navbar'
import Breadcrumb from '../../components/partials/Breadcrumb'
import Footer from '../../components/partials/Footer'
import './css/postList.scss'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoPawOutline } from 'react-icons/io5';
import SearchBox from '../../components/partials/SearchBox'
import { handleResponseError } from '../../Shared/utils'
import axiosClient from '../../config/axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const postPerPage = 2;
export default function PostList() {

    return (<div>
        <NavbarComponent active='posts' />
        <Breadcrumb data={[{ name: "Inicio", "route": "/" }, { name: "Publicaciones" }]} />
        <PostListSection />
        <Footer />
    </div>
    )
}


const PostListSection = () => {
    const [values, setValues] = useState({
        data: [],
        currentPage: 1,
        totalData: 0,
        toatlPages: 1,
        loading: true,
        initial: true,
        filters: {
            search: "",
        }
    });
    const MySwal = withReactContent(Swal);
    useEffect(() => {
        let mounted = true;


        const request = async () => {
            setValues({ ...values, loading: true });
            try {
                const res = await axiosClient.get(`/api/foundations/2/post?min=${(values.currentPage * postPerPage) - postPerPage}&max=${postPerPage}&search=${values.filters.search}`);
                if (res.data.state) {
                    if (mounted) {
                        setValues({ ...values, data: res.data.data.rows, loading: false, totalData: res.data.data.count, toatlPages: Math.ceil(res.data.data.count / postPerPage) });
                    }
                }else{
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
        setValues({ ...values, filters: { ...values.filters, [filter]: value }, currentPage: 1 })
    }

    return <section className="post-list-section">

        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-4 col-sm-12 order-sm-0 mb-5'>
                    <div className='search-widget'>
                        <h3>Buscar </h3>
                        <SearchBox handleSearch={handleFilters} placeholder="Busca por título" />
                    </div>
                </div>
                <div className='col-md-8'>

                    {values.data.map((element, index) => (<div key={index} className='post-item'>
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
                            <h2><Link  to={"/foundation/posts/" + element.id_publicacion}>{element.titulo} </Link> </h2>
                            <p className='limit'> {element.cuerpo}</p>
                        </div>

                        <div className='post-footer'>
                            <Link className="read-more" to={"/foundation/posts/" + element.id_publicacion}>Leer más <IoPawOutline className='ms-1' /></Link>
                        </div>
                    </div>))}


                    <div className='d-flex justify-content-center pt-5 mt-5'>
                        <Pagination count={values.toatlPages} color="standard" onChange={(e, page) => { setValues({ ...values, currentPage: page }) }} />
                    </div>
                </div>


            </div>


        </div>

    </section>
}