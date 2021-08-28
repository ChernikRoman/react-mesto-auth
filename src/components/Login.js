import React from "react";
import {useHistory} from "react-router-dom";
import { authorize } from "../utils/auth";

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory()

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSubmit(email, password)
  }

  return (
    <>
      <div className="auth">
      <h1 className="auth__title">Вход</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" placeholder="Email" type="email" value={email} onChange={handleChangeEmail}></input>
          <input className="auth__input" placeholder="Пароль" type="password" value={password} onChange={handleChangePassword}></input>    
          <input className="auth__submit-button" type="submit" value="Войти"></input>
        </form>
      </div>
      {props.children}
    </>

  )
}

export default Login