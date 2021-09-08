import CardSlider from '../../Slider/Slider'
import './gallery.scss'
import FundamorClient from '../../../services/fundamorClient'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const baseURL = 'localhost:4000/api/auth/token'

function Gallery(props) {
  const [allAnimals, setAllAnimals] = useState([])
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20',
  )

  const getAllAnimals = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createAnimalObject(results) {
      results.forEach(async (animal) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${animal.name}`,
        )
        const data = await res.json()
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

  const token = FundamorClient.getToken
  return (
    <div className="gallery-container">
      <CardSlider className="main-slider" items={allAnimals} />
    </div>
  )
}
export default Gallery
