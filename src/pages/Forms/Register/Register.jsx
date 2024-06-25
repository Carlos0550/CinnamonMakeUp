import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../context'
import { Spin } from 'antd';
import "./register.css"
function Register() {
    const navigate = useNavigate()
    const { register, errorRegister, sending } = useAppContext()
    const goToLogin = () => {
        navigate("/user-login")
    }
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false
    })

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const [passwordDontMatch, setPasswordDontMatch] = useState(false)
    const validateForm = () => {
        const newErrors = {
            email: !formData.email ,
            password: !formData.password,
            confirmPassword: !formData.confirmPassword
        }
        if (formData.confirmPassword !== formData.password) {
            setPasswordDontMatch(true)
            setTimeout(() => {
                setPasswordDontMatch(false)
            }, 2000);
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            register(formData)
        }
    };

useEffect(()=>{
    console.log(formData)
},[formData])
    return (
        <>
            <h1 className='box title is-3 m-3'>Bienvenido a Cinnamon Make Up</h1>

            <div className='columns'>
                <form onSubmit={handleSubmit} className='container'>
                    <label className='box label '>Correo:
                        <input
                            type="email"
                            name="email"
                            className={`input ${errors.email ? 'is-danger' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Introduce tu correo"
                        />
                        {errors.email && <p className="help is-danger">El correo es requerido y debe ser válido.</p>}
                    </label>
                    <label className='box label'>Contraseña:
                        <div className=''>
                            <input
                                type="password"
                                name="password"
                                className={`input ${errors.password ? 'is-danger' : ''}`}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Introduce tu contraseña"
                            />
                        </div>
                        {errors.password && <p className="help is-danger">La contraseña es requerido y debe ser válido.</p>}
                    </label>
                    <label className='box label'>Ingresa nuevamente tu contraseña:
                        <div className=''>
                            <input
                                type="password"
                                name="confirmPassword"
                                className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Introduce tu contraseña nuevamente"
                            />
                        </div>
                        {errors.confirmPassword && <p className="help is-danger">Este campo es requerido.</p>}
                    </label>
                    <div className='box'>
                        {!passwordDontMatch && sending ? "" : <button className='button is-primary is-fullwidth is-white' type='submit'>Registrar</button>}
                        {!passwordDontMatch && sending ? <span className='tag is-info'>Aguarde un momento...</span> : ""}
                        {passwordDontMatch ? <span className='tag is-danger'>Las contraseñas no coinciden</span> : ""}

                    </div>

                    <div className=''>
                        <div className='field'>
                            <label className='label'>
                                <p>¿Ya tiene una cuenta? <span className='subtitle is-5 link' onClick={goToLogin}>Iniciar Sesión</span></p>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register