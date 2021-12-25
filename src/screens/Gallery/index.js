import './gallery.scss'
import React, { useEffect, useState, useContext } from 'react'
import Card from '../../components/Card'
import AuthContext from '../../context/auth/authContext'
import AnimalContext from '../../context/animal/animalContext'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Detail from '../../components/animals/Detail'


function Gallery(props) {

  let { path, url } = useRouteMatch();
  // const {authenticatedUser} = useContext(AuthContext);

  const { animals, message, loading, getAnimals, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales
  // console.log(globalState);
  useEffect(() => {

    // authenticatedUser(); // se debe llamar desde cada ruta (con esto cada que se recargue se hace la petición y no se pierde la sesion)

    getAnimals();
  }, []);

  return (

  
        <Route exact path={path}>
          <div className="gallery-container">
            <div className="card-gallery-container">
              {animals.map((element, index) => (
                <Card
                  key={index}
                  // img={element.sprites.other.dream_world.front_default}
                  // title={element.name}
                  // author={element.types[0].type.name}
                  animal={element}
                />
              ))}

              {animals.length === 0 && !loading ? <h3>No hay animales registrados</h3> : null}
            </div>
          </div>
        </Route>
     
      


  )
}
export default Gallery
