import React from "react";

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="auth">
    <h1 className="auth__title">Вход</h1>
      <form className="auth__form">
        <input className="auth__input" placeholder="Email"></input>
        <input className="auth__input" placeholder="Пароль"></input>    
        <input className="auth__submit-button" type="submit" value="Войти"></input>
      </form>
    </div>
  )
}

export default Login