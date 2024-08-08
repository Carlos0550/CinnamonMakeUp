import React, { useState } from 'react'
import { useAppContext } from '../../../context'
import { useNavigate } from 'react-router-dom'
function RecoverPassword() {
    const navigate = useNavigate()
    const { recoverPassword } = useAppContext()
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    
    const goBack = () => {
        navigate("/user-login")
    }
    const handleInputChange = (e)=>{
        setValue(e.target.value)
    }

    const validateEmail = (email) =>{
        const regex = /\S+@\S+\S.\S+/
        return regex.test(email.trim())
    } 
    const validateField = () =>{
        

        if (!validateEmail(value)) {
            setError(true)
            return false

        }
        setError(false)
        return  true
    }

    
    const sendData = (e) =>{
        e.preventDefault();
       
        if (validateField()) {
            recoverPassword(value)
        }
    }
    return (
        <div className='container'>
            <div className='columns is-flex-direction-column'>
                <div className='column'>
                <div className="field">
                    <span className='button is-danger' onClick={goBack}>Volver atras</span>
                </div>
                    <form className='box'>
                        <div className="field">
                            <label className='label'>Correo: 
                                <input type="email" className={`input ${error ? 'is-danger' : ""}`} onChange={handleInputChange}  placeholder='Ingresa tu correo con el que te registraste'/>
                            </label>
                            {error ? <p className='subtitle is-size-6 has-text-danger'>Email invalido</p> : ""}
                        </div>
                        <div className="control">
                            <button className="button" onClick={sendData}>Recuperar contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecoverPassword