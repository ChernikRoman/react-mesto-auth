import React from "react";
import {Link, useHistory} from "react-router-dom";
import { register } from "../utils/auth";

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory()

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    register(email, password)
      .then(()=>{
        setEmail('');
        setPassword('');
        props.handleSubmitOK();
      })
      .catch((err)=>{
        props.handleSubmitErr();
        console.log(err)
      })

  }

  return (
    <>
      <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" placeholder="Email" type="email" value={email} onChange={handleEmailChange}></input>
          <input className="auth__input" placeholder="Пароль" type="password" value={password} onChange={handlePasswordChange}></input>    
          <input className="auth__submit-button" type="submit" value="Регистрация"></input>
        </form>
        <span className="auth__already-reg">Уже зарегистрированны? <Link to="/sign-in">Войти</Link></span>
      </div>
      {props.children}
    </>
  )
}

export default Register