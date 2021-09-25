import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
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
          <h1 className="login__title">Ingresar</h1>
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
          <div className="login__group">
            <input
              className="login__input"
              type="password"
              name="input_password"
              value={credentials.password}
              onChange={(event) => {
                setCredentials({ ...credentials, ...{ password: event.target.value } });
              }}
              required
            />
            <label className="login__label">Contraseña</label>
            <div className="login__bar"></div>
          </div>
          <p className="login__terms">
            Al registrarme o hacer clic en continuar, confirmo que he leído y
            acepto los <a href="#">Términos</a> y
            <a href="#">la Política de privacidad</a>.
          </p>
        </main>
        <footer className="login__footer">
          <input

            onClick={onSubmit}
            className="login__button"
            type="button"
            name="btn_signin"
            value="Login"
          />
          
        </footer>
      </form>
      {/* Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Charles Deluvio</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
    </div>
  )
}

export default Login
