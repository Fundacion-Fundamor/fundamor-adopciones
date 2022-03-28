import React from 'react'
import { Link } from 'react-router-dom'
import './breadcrumb.scss'
export default function Breadcrumb({ data }) {

    return (<section className='breadcrumb-area'>
        <div className='container'>
            <div className='col-12'>
                <div className="breadcrumb-content">
                    <h2 className="title">{data[data.length - 1].name}</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {data.map((element, index, { length }) => {
                                if (index + 1 === length) {
                                    return (
                                        <li key={index} className={"breadcrumb-item active"} aria-current="page">{element.name} </li>
                                    )
                                } else {
                                    return <li key={index} className={"breadcrumb-item "}><Link to={element.route}>{element.name} </Link></li>

                                }
                            })}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

    </section >)
}