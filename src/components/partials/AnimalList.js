import React, { useContext, useEffect, useState } from 'react'
import './animalListArea.scss'
import { AiFillSetting, } from 'react-icons/ai';
import { IoPawOutline, } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { useMediaQuery, useTheme } from '@mui/material';
import AnimalContext from '../../context/animal/animalContext';

/**Slider con listado de animales (pública)
 * 
 * @returns 
 */
export default function AnimalList() {

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


    return (<div className="animal-area">
        <div className="container">
            <div className="row ">

                <div className='col-12'>
                    {loading ? <p className='text-center'>Cargando...</p> : (animals.length > 0 ?
                        <Slider {...settingsSlick}>
                            {animals.map((element, index) => index < 10 ? (
                                <div key={index} className='col-xl-3 d-flex justify-content-center'>

                                    <div className='slick-animal-card'>
                                        <Link to={"/foundation/animals/" + element.id_animal}>
                                            {element.animalImage.length > 0 ? <img src={`${process.env.REACT_APP_API_URL}/${element.animalImage[0].ruta}`} alt="img" /> :
                                                <img src="/images/no_image.png" alt="img" />
                                            }
                                        </Link>
                                        <div className='animal-description'>
                                        <p className='d-flex align-items-center text-capitalize'><AiFillSetting style={{ marginRight: 2 }} color="#de6426" />{element.sexo}</p>
                                        <Link to={"/foundation/animals/" + element.id_animal}><h3>{element.nombre}</h3></Link>
                                            <Link to={"/foundation/animals/" + element.id_animal}> Leer Más <IoPawOutline color="#de6426" size="24" /> </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : null)}

                        </Slider>

                        : <p className='text-center'>Aún no hay animales registrados</p>)}
                </div>
            </div>
        </div>
    </div>
    )
}