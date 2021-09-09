import CardSlider from '../../components/Slider/Slider'
import './home.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home(props) {
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
      <CardSlider className="main-slider" items={allAnimals} />
    </div>
  )
}
export default Home
