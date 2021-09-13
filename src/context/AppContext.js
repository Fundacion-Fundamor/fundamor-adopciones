import React, { useState } from 'react'
import authToken from '../config/authToken'
import axiosClient from '../config/axios'

export const MyContext = React.createContext()

function AppContext(props) {
  const [globalState, setGlobalState] = useState({
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null
  })

  const handleGlobalState = (data) => {
    setGlobalState({ ...globalState, ...data })
  }

  const logIn = async (email, password) => {

    const formattedData = {
      correo: email,
      contrasenia: password
    }

    try {
      const res = await axiosClient.post("/api/auth/token", formattedData);
      localStorage.setItem("token", res.data.token);
      setGlobalState({
        token: res.data.token,
      });

    } catch (error) {
      localStorage.removeItem("token");
      console.error(error.response.data);
    }

  }


  const authenticatedUser = async () => {

    try {
      let token = localStorage.getItem("token");
      authToken(token);
      const user = await axiosClient.get("/api/auth");

      console.log(user.data.data);
      
      setGlobalState(...globalState, ...{
        authenticated: true,
        user: user.data.data
      });

    } catch (error) {
      localStorage.removeItem("token");
      // setGlobalState({
      //   ...globalState, ...{
      //     token: localStorage.getItem('token'),
      //     authenticated: false,
      //     user: null
      //   }
      // });

      console.error(error.response.data);
    }


  }

  return (
    <MyContext.Provider value={[globalState, handleGlobalState, logIn, authenticatedUser]}>
      {props.children}
    </MyContext.Provider>
  )
}

export default AppContext
