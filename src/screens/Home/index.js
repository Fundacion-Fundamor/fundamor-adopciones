import CardSlider from '../../components/Slider'
import './home.scss'
import React, { useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import Footer from '../../components/Footer'
import SocialButton from '../../components/SocialButton'
import List from '../../components/Post/List'
import AnimalContext from '../../context/animal/animalContext'

function Home(props) {


  const { animals, message, loading, getAnimals, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales

  useEffect(() => {
    getAnimals()
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
        <CardSlider className="main-slider" items={animals} />
      </div>
      {/* <div style={{ background: 'blue', height: '40rem' }}></div> */}

<List/>

      <Footer/>
    </div>
  )
}
export default Home
