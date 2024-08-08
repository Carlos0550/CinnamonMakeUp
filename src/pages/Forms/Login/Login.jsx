import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context'; // Ajusta la ruta según sea necesario
import { message } from 'antd';
import "./login.css"
function Login() {
  const navigate = useNavigate();
  const { login, errorUser, sending,sessionId} = useAppContext();

  useEffect(() => {

    if (sessionId !== null) {
      navigate("/user-dashboard")
    }
  }, [navigate, sessionId]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPsw, setErrorPsw] = useState(false);

  const loginUser = (ev) => {
    ev.preventDefault();
    if (!values.email) {
      setErrorEmail(true);
      setTimeout(() => {
        setErrorEmail(false);
      }, 2000);
    } else if (!values.password) {
      setErrorPsw(true);
      setTimeout(() => {
        setErrorPsw(false);
      }, 2000);
    } else {
      login(values);
    }
  };

  

  return (
    <>
      <h1 className='title is-3'>Que bueno verte de nuevo!</h1>
      <div className="box">
        <button className='button is-primary' onClick={()=> navigate("/")}>Ver productos</button>
      </div>
      <div className='columns is-flex-direction-column custom-login'>
        <div className="">
          <div className="title has-text-danger">Iniciá sesión con tu cuenta</div>
        </div>
        <div className='column'>
          <form onSubmit={loginUser}>
            <div className='field'>
              <label className='label'>Correo:
                <input type="email" name='email' value={values.email} onChange={handleInputChange} className='input' placeholder='Introduce tu correo'  />
              </label>
              {errorEmail ? <span className="tag is-danger">Este campo no puede estar vacio</span> : ""}
            </div>
            <div className='field'>
              <label className='label'>Contraseña:
                <input type="password" className='input' name='password' value={values.password} onChange={handleInputChange} placeholder='Introduce tu contraseña'  />
              </label>
              {errorPsw ? <span className="tag is-danger">Este campo no puede estar vacio</span> : ""}
            </div>
            <div className='field'>
              <div className='control'>
                {sending ? "" : <button className='button is-primary is-fullwidth' type='submit'>Iniciar Sesión</button>}
                {sending ? <span className='tag is-info'>Aguarde un momento...</span> : ""}
                {errorUser ? <span className="tag is-danger">Correo o contraseña incorrectos</span> : ""}
              </div>
            </div>
            <div className='control'>
              <div className='field'>
                <label className='label'>
                  <p>¿No tienes una cuenta Cinnamon? <span className='subtitle is-6 is-link' onClick={() => navigate("/user-register")}>Crear Cuenta</span></p>
                  {/* <p>¿Olvidaste tu contraseña? <span className='tag is-warning custom-tag ml-3' onClick={()=> navigate("/recovery-password")}>recuperar contraseña</span></p> */}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
