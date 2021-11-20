import Slider from 'react-slick'
import './slider.scss'
import Card from '../Card'

function MultipleItems(props) {
  const cardsNum = props.items.length
  var settings = {
    centerMode: true,
    className: 'center',
    infinite: true,
    slidesToShow: cardsNum > 5 ? 5 : cardsNum,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    speed: 500,
    swipeToSlide: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: cardsNum > 4 ? 4 : cardsNum,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          infinite: true,
          slidesToShow: cardsNum > 3 ? 3 : cardsNum,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: cardsNum > 2 ? 2 : cardsNum,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  console.log(settings)

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {props.items.map((element, index) => (
          <div className="card__container" key={index}>
            <Card animal={element} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MultipleItems
