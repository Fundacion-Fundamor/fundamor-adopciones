import './gallery.scss'
import axios from 'axios'
import React, { useEffect, useState,useContext  } from 'react'
import Card from '../../components/Card'
import { MyContext } from '../../context/AppContext'


function Gallery(props) {

  const [globalState, handleGlobalState] = useContext(MyContext)

  console.log(globalState)


  const [allAnimals, setAllAnimals] = useState([])

  const getAllAnimals = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
    const data = await res.data

    function createAnimalObject(results) {
      results.forEach(async (animal) => {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${animal.name}`,
        )
        const data = await res.data
        setAllAnimals((currentList) => [...currentList, data])
        await allAnimals.sort((a, b) => a.id - b.id)
      })
    }
    createAnimalObject(data.results)
    // console.log(allAnimals)
  }

  useEffect(() => {
    getAllAnimals()
  }, [])

  return (
    <div className="gallery-container">
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
