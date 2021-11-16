import React from 'react'
import './card.scss'

/**Los animales pueden tener varias imagenes
 * 
 * @param {*} param0 
 * @returns 
 */
function Card({ animal }) {

  return (
    <div className="card-container">
      <div className="image-container">
        {animal.animalImage.length !== 0 ? <img src={`${process.env.REACT_APP_API_URL}/${animal.animalImage[0].ruta}`} alt="card" /> : 
          <img src={`${process.env.REACT_APP_URL}/images/sin_imagen.png`} alt="card" />}
      </div>
      <div className="card-body">
        <h2>{animal.nombre}</h2>
        <p>
          {animal.caracteristicas}
        </p>
        <h5>{animal.sexo}</h5>
      </div>
    </div>
  )
}

export default Card
