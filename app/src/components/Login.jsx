import React,{useState} from 'react'
import { useAppContext } from '../context/context';
import "./css/login.css"
function Login() {
    const {LoginUser} = useAppContext();
    const [values, setValues] = useState({
        email:"",
        password:""
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        LoginUser(values)
    }
  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit} className="formulario-form">
        <label className="formulario-label">
          Usuario
          <input
            type="text"
            name='email'
            value={values.email}
            onChange={handleInputChange}
            className="formulario-input"
          />
        </label>
        <label className="formulario-label">
          Contraseña
          <input
            type="text"
            name='password'
            value={values.password}
            onChange={handleInputChange}
            className="formulario-input"
          />
        </label>
        <button className="formulario-button">Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default Login
