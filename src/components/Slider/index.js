import Slider from 'react-slick'
import './slider.scss'
import Card from '../Card'

function MultipleItems(props) {
  var settings = {
    centerMode: true,
    dots: true,
    className: 'center',
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    // slidesToScroll: 2,
    speed: 500,
    swipeToSlide: true,
    initialSlide: 2,
    dots: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          dots: false,
          slidesToShow: 4,
          initialSlide: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          dots: false,
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          dots: false,
          slidesToShow: 1,
          initialSlide: 2,
        },
      },
    ],
  }

  // const objects = [...Array(20).keys()]

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {props.items.map((pokemonStats, index) => (
          <div className="card__container">
            <Card
              key={index}
              id={pokemonStats.id}
              img={pokemonStats.sprites.other.dream_world.front_default}
              title={pokemonStats.name}
              author={pokemonStats.types[0].type.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MultipleItems
