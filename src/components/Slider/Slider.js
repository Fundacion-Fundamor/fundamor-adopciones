import React, { Component } from 'react'
import Slider from 'react-slick'
import './slider.scss'
import Card from '../Card/Card'

function MultipleItems() {
  var settings = {
    // dots: true,
    className: 'center',
    infinite: true,
    slidesToShow: 4,
    // slidesToScroll: 2,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const objects = [...Array(20).keys()]

  return (
    <div className="slider-container">
      <h2> Card Slider </h2>
      <Slider {...settings}>
        {objects.map((object, i) => (
          <Card
            obj={object}
            key={i}
            img="https://picsum.photos/id/54/400/300"
            title="What I learned from my visit to The Upside Down"
            author="Nancy Wheeler"
          />
        ))}
      </Slider>
    </div>
  )
}

export default MultipleItems
