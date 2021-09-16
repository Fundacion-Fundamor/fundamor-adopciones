import './gallery.scss'
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import Card from '../../components/Card'
import { MyContext } from '../../context/AppContext'


function Gallery(props) {

  const {globalState, authenticatedUser} = useContext(MyContext)
  const [allAnimals, setAllAnimals] = useState([])


  console.log(globalState);
  useEffect(() => {

    let mounted = true;

    const getAllAnimals = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = res.data.results;
      let tmp = await otherRequest(data);

      if (mounted) {
        setAllAnimals(tmp);
      }
    }

    authenticatedUser(); // se debe llamar desde cada ruta (con esto cada que se recargue se hace la petición y no se pierde la sesion)
    getAllAnimals();
    

    return () => {
      mounted = false;
    }
  }, []);



  async function otherRequest(data) {
    let pokeResults = [];
    for (let animal of data) {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${animal.name}`,
      );
      pokeResults.push(res.data);
    }
    return pokeResults;
  }
  return (
    <div className="gallery-container">
      {`hola ${globalState.user ? globalState.user.nombre: "Juan Carlos" } chupapijas`}
      <div className="card-gallery-container">
        {allAnimals.map((animalStats, index) => (
          <Card
            key={index}
            id={animalStats.id}
            img={animalStats.sprites.other.dream_world.front_default}
            title={animalStats.name}
            author={animalStats.types[0].type.name}
          />
        ))}
      </div>
    </div>
  )
}
export default Gallery
