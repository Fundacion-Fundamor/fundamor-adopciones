

import React from 'react'

import { FaPaw } from 'react-icons/fa';

import './sectionTitle.scss'


/**Sección de título reutilizada en la sección pública de la plataforma
 * 
 * @param {*} param0 
 * @returns 
 */
export default function SectionTitle({ title, subtitle, text }) {


    return (<section className='section-title py-5'>
        <div className='container'>
            <div className='row justify-content-center d-flex '>
                <div className='col-xl-7 col-lg-9'>
                    <div className='section-title'>
                        <FaPaw className='section-icon mb-2' color='#de6426' size={27} />
                        <h3 className='mb-3'>{subtitle}</h3>
                        <h2>{title}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}