import React, { useState } from 'react';
import { useAppContext } from '../../../../context';
function NewUserForm() {
  const { insertUserData,insertUserDataSuccess,errorInsertingUserData,insertingUserData, sessionId } = useAppContext()
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    phone: '',
    ciudad: '',
    provincia: '',
    direccion: '',
    newUser: false,
    uuid: sessionId

  });

  const [errors, setErrors] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    phone: false,
    ciudad: false,
    provincia: false,
    direccion: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      nombre: !formData.nombre,
      apellido: !formData.apellido,
      phone: !formData.phone,
      ciudad: !formData.ciudad,
      provincia: !formData.provincia,
      direccion: !formData.direccion,
      correo: !formData.correo || !/\S+@\S+\.\S+/.test(formData.correo),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      insertUserData(formData)
    }
  };

  return (
    <>
      <div className='box is-info m-3'>
        <article className='message is-danger'>
          <div className='message-header'>
            <p>¿Por qué veo esto?</p>
            <button className='delete' aria-label="delete"></button>
          </div>
          <div className='message-body'>
            Como es su primera vez aquí, deberá completar este formulario que será necesario para realizar cada compra.
            Solo se hará una sola vez.
            <strong> No se preocupe, podrá editarlos más tarde.</strong>
          </div>
        </article>
      </div>

      <form onSubmit={handleSubmit} className='container p-3'>

        <div className='field'>
          <label className='box label'>Nombre:
            <input
              type="text"
              name="nombre"
              className={`input ${errors.nombre ? 'is-danger' : ''}`}
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Introduce tu nombre"
            />
            {errors.nombre && <p className="help is-danger">El nombre es requerido.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Apellido:
            <input
              type="text"
              name="apellido"
              className={`input ${errors.apellido ? 'is-danger' : ''}`}
              value={formData.apellido}
              onChange={handleInputChange}
              placeholder="Introduce tu apellido"
            />
            {errors.apellido && <p className="help is-danger">El apellido es requerido.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Correo:
            <input
              type="email"
              name="correo"
              className={`input ${errors.correo ? 'is-danger' : ''}`}
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="Introduce tu correo"
            />
            {errors.correo && <p className="help is-danger">El correo es requerido y debe ser válido.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Teléfono:
            <input
              type="number"
              name="phone"
              className={`input ${errors.phone ? 'is-danger' : ''}`}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Introduce tu teléfono"
            />
            {errors.phone && <p className="help is-danger">El teléfono es requerido.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Domicilio:
            <input
              type="text"
              name="direccion"
              className={`input ${errors.direccion ? 'is-danger' : ''}`}
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Introduce tu domicilio completo"
            />
            {errors.direccion && <p className="help is-danger">El domicilio es requerido para el envío.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Ciudad:
            <input
              type="text"
              name="ciudad"
              className={`input ${errors.ciudad ? 'is-danger' : ''}`}
              value={formData.ciudad}
              onChange={handleInputChange}
              placeholder="Introduce tu ciudad"
            />
            {errors.ciudad && <p className="help is-danger">La ciudad es requerida.</p>}
          </label>
        </div>

        <div className='field'>
          <label className='box label'>Provincia:
            <input
              type="text"
              name="provincia"
              className={`input ${errors.provincia ? 'is-danger' : ''}`}
              value={formData.provincia}
              onChange={handleInputChange}
              placeholder="Introduce tu Provincia"
            />
            {errors.provincia && <p className="help is-danger">La Provincia es requerida.</p>}
          </label>
        </div>

        <div className='field'>
          <div className='control'>
          {insertingUserData ? <span className='tag is-warning'>Espere...</span> : ""}
            {insertUserDataSuccess ? <span className='tag is-success'>Datos Guardados exitosamente!</span> : ""}
            {errorInsertingUserData ? <span className='tag is-danger'>Error al guardar los datos, verifique su conexión e intente nuevamente</span> : ""}
            {insertingUserData ? "" : <button type="submit" className='button is-primary is-fullwidth'>Enviar</button> }
            
          </div>
        </div>
      </form>
    </>
  );
}

export default NewUserForm;
