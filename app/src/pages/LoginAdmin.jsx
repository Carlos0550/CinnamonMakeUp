import React from 'react';
import { useAppContext } from '../context/context';
import { useState, useEffect } from 'react';
import "./css/login.css"
function Login() {
  const { createUser, LoginUser, retrieveUser, waitingServer } = useAppContext();
  useEffect(()=>{
    retrieveUser()
  },[])

  const [registrationValues, setRegistrationValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [showLogin, setShowLogin] = useState(false)

  const [waiting, setWaiting] = useState(false)
 
  const handleRegistrationInput = (event) => {
    const { name, value } = event.target;
    setRegistrationValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signIn = (event) => {
    event.preventDefault();
    if (registrationValues.password !== registrationValues.confirmPassword) {
      setPasswordMatch(false);
      return;
    } else {
      setWaiting(true)
      try {
        createUser(registrationValues);
      }catch{
        console.log("Error al registrar usuario")
     } finally {
        setWaiting(false)
      }
    }
  };

  const handleLoginInput = (event) => {
    const { name, value } = event.target;
    setLoginValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = (event) => {
    event.preventDefault();
    setWaiting(true);
    setTimeout(async () => {
      try {
        await LoginUser(loginValues);
      } finally {
        setWaiting(false);
      }
    }, 1000); // Se puede ajustar el tiempo de espera según sea necesario
  };

  const toggleForm = () => {
    setShowLogin(!showLogin)
    
  }

  return (
    <div className='container'>
   
      <div className="container__form">
      <h1>Bienvenido a CinnamonMakeUp & Accesorios</h1>
      {showLogin ? (
        <>
        <form onSubmit={signIn} className='register__form'>
          <label className='register__label-title'>Registro</label>
          <label className='register__label-email'>
            Email
            <input
              type="email"
              name="email"
              value={registrationValues.email}
              onChange={handleRegistrationInput}
              placeholder="myemail@gmail.com"
              className='register__input'
            />
          </label>
          

          <label className='register__label-password'>
            Contraseña
            <input
              type="password"
              name="password"
              value={registrationValues.password}
              onChange={handleRegistrationInput}
              placeholder="********"
              className='register__input'
            />
          </label>
          <label className='register__label-confirmPassword'>
            Ingrese su contraseña nuevamente
            <input
              type="password"
              name="confirmPassword"
              value={registrationValues.confirmPassword}
              onChange={handleRegistrationInput}
              placeholder="********"
              className='register__input'
            />
          </label>
          {!passwordMatch && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
          <div className='btn__register-container'><button class="registro-btn">Registrarme</button></div>
          {waitingServer && <p style={{color: 'black'}}>Aguarde un momento...</p>}
        </form>
        
        <span class="custom-button">
        <button onClick={toggleForm}>Tengo cuenta de Cinnamon</button>
        
      </span>
      </>
      ) : (
        <> 
        <form onSubmit={loginUser} className='login__form'>
          <label className='login__form-title'>Iniciar sesión</label>
          <label className='login__form-email'>
            Email
            <input
              type="email"
              name="email"
              value={loginValues.email}
              onChange={handleLoginInput}
              placeholder="carlos@gmail.com"
              className='login__input'
            />
          </label>
          <label className='login__form-password'>
            Contraseña
            <input
              type="password"
              name="password"
              value={loginValues.password}
              onChange={handleLoginInput}
              placeholder="********"
              className='login__input'
            />
          </label>
          {!passwordMatch && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
          <div className='btn__login-container'>
          <button type="submit" className='login-btn'>Iniciar sesión</button>
          </div>
          
        </form>
        {waitingServer && <p style={{color: 'black'}} >Aguarde un momento...</p>}

        <span className="custom-button">
        <button onClick={toggleForm}>No tengo cuenta de Cinnamon</button>
      </span>
      </>
        )}
      </div>
    </div>
  );
}

export default Login;