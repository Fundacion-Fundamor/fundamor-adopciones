import React, { useEffect, useState } from 'react'

import './brand.scss'
import Slider from "react-slick";
import { useMediaQuery, useTheme } from '@mui/material';

export default function BrandSection(params) {
    const [settingsSlick, setSettingsSlick] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        autoPlay: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
    })
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {

        if (matchDownSm) {
            setSettingsSlick({ ...settingsSlick, slidesToScroll: 2, slidesToShow: 2 })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownSm])


    return (
        <div className="brand-area pt-80 pb-80">
            <div className="container">
                <div className="row ">
                    <Slider {...settingsSlick}>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-2.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-3.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-1.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-4.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-5.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-6.1.png" alt="img" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="brand-item">
                                <img src="images/brand/brand-7.1.png" alt="img" />
                            </div>
                        </div>
                    </Slider>
                </div>

            </div>
        </div>
    )
}
