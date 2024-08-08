import React, { useState } from 'react';
import { useAppContext } from '../../../context';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdatePassword() {
  const navigate = useNavigate();
  const { updatePassword } = useAppContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const accessToken = new URLSearchParams(location.search).get('access_token');

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const validateField = () => {
    if (!password || password.length < 6) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (validateField()) {
      const response = await updatePassword(accessToken, password);
      if (response.success) {
        setMessage(response.message);
        
      } else {
        setMessage(response.message);
      }
    }
  };

  return (
    <div className='container'>
      <div className='columns is-flex-direction-column'>
        <div className='column'>
          <form className='box' onSubmit={sendData}>
            <div className="field">
              <label className='label'>Ingrese su nueva contraseña:
                <input type="password" className={`input ${error ? 'is-danger' : ''}`} onChange={handleInputChange} placeholder='Nueva contraseña' />
              </label>
              {error && <p className='subtitle is-size-6 has-text-danger'>Contraseña inválida</p>}
            </div>
            <div className="control">
              <button type="submit" className="button">Actualizar contraseña</button>
            </div>
            {message && <p className='subtitle is-size-6'>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
