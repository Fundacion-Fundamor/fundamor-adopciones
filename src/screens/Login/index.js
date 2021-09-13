import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { MyContext } from '../../context/AppContext'

function Login() {
  const [globalState, handleGlobalState, logIn, authenticatedUser] = useContext(MyContext)


  const [credentials, setCredentials] = useState({

    email: "aurelio@gmail.com",
    password: "hola1234"
  });


  const onSubmit = async () => {


    //valida las credenciales
    logIn(credentials.email, credentials.password);

  }


  // useEffect(() => {

  //   authenticatedUser();

  // }, [])

  return (
    <div className="login-container">
      <form class="login__form" name="frm_login">
        <header class="login__header">
          <h1 class="login__title">Login</h1>
        </header>
        <main class="login__main">
          <div class="login__group">
            <input
              class="login__input"
              type="text"
              name="input_email"
              value={credentials.email}
              onChange={(event) => {
                setCredentials({ ...credentials, ["email"]: event.target.value });
              }}
              required
            />
            <label class="login__label">Correo</label>
            <div class="login__bar"></div>
          </div>
          <div class="login__group">
            <input
              class="login__input"
              type="password"
              name="input_password"
              value={credentials.password}
              onChange={(event) => {
                setCredentials(...credentials, ...{ password: event.target.value });
              }}
              required
            />
            <label class="login__label">Contraseña</label>
            <div class="login__bar"></div>
          </div>
          <p class="login__terms">
            Al registrarme o hacer clic en continuar, confirmo que he leído y
            acepto los <a href="#">Términos</a> y{' '}
            <a href="#">la Política de privacidad</a>.
          </p>
        </main>
        <footer class="login__footer">
          <input

            onClick={onSubmit}
            class="login__button"
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
