import React from 'react'
import './login.scss'

function Login() {
  return (
    <div className="login-container">
      <form class="login__form" method="POST" name="frm_login" action="#">
        <header class="login__header">
          <h1 class="login__title">Login</h1>
        </header>
        <main class="login__main">
          <div class="login__group">
            <input
              class="login__input"
              type="text"
              name="input_email"
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
              required
            />
            <label class="login__label">Contraseña</label>
            <div class="login__bar"></div>
          </div>
          <p class="login__terms">
          Al registrarme o hacer clic en continuar, confirmo que he leído y acepto los <a href="#">Términos</a> y {' '}
            <a href="#">la Política de privacidad</a>.
          </p>
        </main>
        <footer class="login__footer">
          <input
            class="login__button"
            type="button"
            name="btn_signin"
            value="Login"
          />
        </footer>
      </form>
    </div>
  )
}

export default Login
