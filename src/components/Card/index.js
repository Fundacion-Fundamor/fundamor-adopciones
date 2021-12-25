import React from 'react'
import './card.scss'
import { useRouteMatch, useHistory } from "react-router-dom";

/**Los animales pueden tener varias imagenes
 * 
 * @param {*} param0 
 * @returns 
 */
function AnimalCard({ animal }) {
  let { path, url } = useRouteMatch();

  let history = useHistory();
  return (
    <div className="card-container" onClick={() => {

      history.push(`${url}/${animal.id_animal}`);

    }}>
      <div className="image-container">
        {animal.animalImage.length !== 0 ? <img src={`${process.env.REACT_APP_API_URL}/${animal.animalImage[0].ruta}`} alt="card" /> :
          <img src={`${process.env.REACT_APP_URL}/images/sin_imagen.png`} alt="card" />}
      </div>
      <div className="card-body">
        <h2 style={{textTransform:"capitalize"}}>{animal.nombre}</h2>
        <p>
          {animal.caracteristicas}
        </p>
        <h5>{animal.sexo}</h5>
      </div>
    </div>
  )
}

export default AnimalCard
