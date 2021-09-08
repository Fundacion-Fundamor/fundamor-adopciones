import CardSlider from '../../Slider/Slider'
import './gallery.scss'
import FundamorClient from '../../../services/fundamorClient'
import axios from 'axios'
import React from 'react'

const baseURL = 'localhost:4000/api/auth/token'

function Gallery(props) {
  // const [post, setPost] = React.useState(null)

  // React.useEffect(() => {
  //   const options = {
  //     method: 'POST',
  //     data: {
  //       correo: 'tester@gmail.com',
  //       contrasenia: 'hola',
  //     },
  //   }

  //   const res = axios(options).then((response) => {
  //     setPost(response.data)
  //     console.log(res)
  //   })
  // }, [])

  // if (!post) return null

  const token = FundamorClient.getToken
  console.log(token)
  return (
    <div className="gallery-container">
      <CardSlider className="main-slider"></CardSlider>
      {/* <div>{post.token}</div> */}
    </div>
  )
}
export default Gallery
