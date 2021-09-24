import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import Button from '../../components/Button'
import { MyContext } from '../../context/AppContext'

function Login(props) {
  const {globalState, handleGlobalState, logIn, authenticatedUser} = useContext(MyContext)


  const [credentials, setCredentials] = useState({

    email: "aurelio@gmail.com",
    password: "hola1234"
  });


  const onSubmit = async () => {


    //valida las credenciales
    console.log("inicia sesion")
    logIn(credentials.email, credentials.password);

  }


  useEffect(() => {
  
    if (globalState.authenticated) {
      props.history.push("/gallery");
    }

    if (globalState.message) {
      console.log("Mostrando alerta", globalState.message);
    }
  }, [globalState.authenticated, globalState.message, props.history])

  return (
    <div className="login-container">
      <form className="login__form" name="frm_login">
        <header className="login__header">
          <h1 className="login__title">Recuperar contraseña</h1>
        </header>
        <main className="login__main">
          <div className="login__group">
            <input
              className="login__input"
              type="text"
              name="input_email"
              value={credentials.email}
              onChange={(event) => {
                setCredentials({ ...credentials, "email": event.target.value });
              }}
              required
            />
            <label className="login__label">Correo</label>
            <div className="login__bar"></div>
          </div>

          <p className="login__terms">
            Si encontramos un usuario que coincida con este correo, enviaremos una nueva contraseña temporal para iniciar sesión a tu correo
          </p>
        </main>
        <footer className="login__footer">
          <input

            onClick={onSubmit}
            className="login__button"
            type="button"
            name="btn_signin"
            value="Recuperar"
          />
          
        </footer>
      </form>
      {/* Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Charles Deluvio</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
    </div>
  )
}

export default Login
