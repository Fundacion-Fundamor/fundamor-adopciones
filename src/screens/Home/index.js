import CardSlider from '../../components/Slider'
import './home.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import Footer from '../../components/Footer'
import SocialButton from '../../components/SocialButton'

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
    <div className="home-container">
      <section className="heroSection">
        <div className="heroSection__text">
          <h5>Adoptar nos cambia la vida</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitasse
            mauris, in ornare donec egestas iaculis. Tortor, integer cursus arcu
            vivamus vel eget fringilla. Id ac dis malesuada faucibus. Netus
            neque maecenas dis morbi risus, mi montes, elit, duis.
          </p>
          <a
            href="/"
            className="btn btn-danger btn-large heroSection__callToAction"
          >
            Quiero adoptar »
          </a>{' '}
        </div>
        <div className="social-buttons">
          <SocialButton link="/" socialMediaName="instagram"></SocialButton>
          <SocialButton link="/" socialMediaName="facebook"></SocialButton>
          <SocialButton link="/" socialMediaName="twitter"></SocialButton>
          {/* <SocialButton link="/" socialMediaName="mail"></SocialButton> */}
          <SocialButton link="/" socialMediaName="youtube"></SocialButton>
        </div>
        <img className="clippedImage" src="./images/maskedCat.png" alt="" />
      </section>
      <div className="slider-container">
        <CardSlider className="main-slider" items={allAnimals} />
      </div>
      <div style={{ background: 'blue', height: '40rem' }}></div>
      <Footer></Footer>
    </div>
  )
}
export default Home
