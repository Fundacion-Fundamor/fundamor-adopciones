import React, { useState } from 'react'
import authToken from '../config/authToken'
import axiosClient from '../config/axios'

export const MyContext = React.createContext()

function AppContext(props) {
  const [globalState, setGlobalState] = useState({
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null
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
        authenticated: true,
        message: null,
        user: null
      });

      authenticatedUser();

    } catch (error) {
      localStorage.removeItem("token");
      if (error.response) {
        setGlobalState({
          ...globalState, ...{ message: error.response?.data.message }
        });
      }
    }

  }


  const authenticatedUser = async () => {

    try {
      let token = localStorage.getItem("token");
      authToken(token);
      const res = await axiosClient.get("/api/auth");

      setGlobalState({
        ...globalState, ...{
          user: res.data.data,
          authenticated:true,
        }
      });

    } catch (error) {
      // localStorage.removeItem("token");
      // setGlobalState({
      //   ...globalState, ...{
      //     token: localStorage.getItem('token'),
      //     authenticated: false,
      //     user: null
      //   }
      // });

      // console.error(error.response.data);
    }


  }

  return (
    <MyContext.Provider value={{globalState, handleGlobalState, logIn, authenticatedUser}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default AppContext
