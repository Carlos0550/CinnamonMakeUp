import React, { useState } from 'react'
import { useAppContext } from '../../../context';
function EditClientData({toggleModal}) {

    const { clientData, updateClientData, errorUpdateClient, sucessUpdateClient, updatingCient } = useAppContext()
    let client = clientData[0]

    const [formData, setFormData] = useState({
        nombre: client.nombre || 0,
        apellido: client.apellido || 0,
        correo: client.email || 0,
        phone: client.telefono || 0,
        ciudad: client.ciudad || 0,
        provincia: client.provincia || 0,
        direccion: client.direccion || 0,
        uuid: client.userUuid
    })    

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
            // console.log(formData)
            updateClientData(formData)
        }
    };
    return (
        <div className='container'>
            <p className='title has-text-weight-bold is-3'>Editar mis datos</p>
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
                <div className='control'>
                    {updatingCient ? "" : <button className='button is-warning m-1'>Actualizar</button>}
                    {updatingCient ? <span className='tag is-warning'>Aguarde...</span> : ""}
                    {errorUpdateClient ? <span className='tag is-danger'>Error al actualizar sus datos, verifique su conexión e intente nuevamente!</span> : ""}
                    {sucessUpdateClient ? <span className='tag is-success'>Actualización exitosa</span> : ""}
                </div>
            </form>
            <button className="button is-primary m-1" onClick={toggleModal}>Cerrar Modal</button>

        </div>
    )
}

export default EditClientData