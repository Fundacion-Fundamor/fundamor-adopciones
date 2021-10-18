import React, { useContext, useState, useEffect } from 'react'
import './login.scss'
import { Alert, Button, CircularProgress, FormHelperText } from '@mui/material';
import { Link } from "react-router-dom";
import AuthContext from '../../context/auth/authContext';

function Login(props) {

  const { login, authenticated, message, loading } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "aurelio@gmail.com",
    password: "hola1234"
  });

  const [errors, setErrors] = useState({
    password: null,
    email: null
  })

  const onSubmit = async () => {
    //valida las credenciales
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (credentials.email === "" || re.test(credentials.email) === false) {
      setErrors({ ...errors, ["email"]: true })
    } else if (credentials.password === "") {
      setErrors({ ...errors, ["password"]: true })
    } else {
    
      login(credentials.email, credentials.password);
    }
  }


  useEffect(() => {

    if (authenticated) {
      props.history.push("/gallery");
    }

  }, [authenticated, message, props.history])

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
                setErrors({ ...errors, ["email"]: false });
              }}
              required
            />

            <label className="login__label">Correo</label>
            <div className="login__bar"></div>
            {errors.email && <FormHelperText error={true}>Debe ingresar una ccorreo válido</FormHelperText>}

          </div>
          <div className="login__group">
            <input
              className="login__input"
              type="password"
              name="input_password"
              value={credentials.password}
              onChange={(event) => {
                setCredentials({ ...credentials, ...{ password: event.target.value } });
                setErrors({ ...errors, ["password"]: false });

              }}
              required
            />
            <label className="login__label">Contraseña</label>
            <div className="login__bar"></div>
            {errors.password && <FormHelperText error={true}>Debe ingresar una contraseña</FormHelperText>}

          </div>
          <p className="login__terms">
            <Link to="/passwordReset" style={{ textDecorationLine: "underline" }} >¿Olvidaste tu contraseña?</Link>
          </p>
        </main>

        {loading && <div style={{ marginTop: 15, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress color="success" />
          <p style={{ marginLeft: 10 }}>Cargando...</p>
        </div>}
        {message && <Alert severity="error" variant="filled" style={{ marginTop: 20, marginBottom: 5, marginLeft: 35, marginRight: 35 }} >{message}</Alert>}

        <footer className="login__footer">
          <Button variant="contained" style={{ width: "100%" }} onClick={() => { if (!loading) { onSubmit() } }}>Iniciar sesión</Button>
        </footer>
      </form>
      {/* Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Charles Deluvio</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}
    </div>
  )
}

export default Login
