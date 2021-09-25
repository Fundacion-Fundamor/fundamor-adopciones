import React, { useContext, useState, useEffect } from 'react'
import './passwordReset.scss'
import Button from '../../components/Button'
import { MyContext } from '../../context/AppContext'

function PasswordReset(props) {
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
    <div className="passwordReset-container">
      <form className="passwordReset__form" name="frm_passwordReset">
        <header className="passwordReset__header">
          <h1 className="passwordReset__title">Recuperar contraseña</h1>
        </header>
        <main className="passwordReset__main">
          <div className="passwordReset__group">
            <input
              className="passwordReset__input"
              type="text"
              name="input_email"
              value={credentials.email}
              onChange={(event) => {
                setCredentials({ ...credentials, "email": event.target.value });
              }}
              required
            />
            <label className="passwordReset__label">Correo</label>
            <div className="passwordReset__bar"></div>
          </div>

          <p className="passwordReset__terms">
            Si encontramos un usuario que coincida con este correo, enviaremos una nueva contraseña temporal para iniciar sesión a tu correo
          </p>
        </main>
        <footer className="passwordReset__footer">
          <input

            onClick={onSubmit}
            className="passwordReset__button"
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

export default PasswordReset
