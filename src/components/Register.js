import React from "react";
import {Link} from "react-router-dom"

function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="auth">
    <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form">
        <input className="auth__input" placeholder="Email"></input>
        <input className="auth__input" placeholder="Пароль"></input>    
        <input className="auth__submit-button" type="submit" value="Регистрация"></input>
      </form>
      <span className="auth__already-reg">Уже зарегистрированны? <Link to="/sign-in">Войти</Link></span>
    </div>
  )
}

export default Register