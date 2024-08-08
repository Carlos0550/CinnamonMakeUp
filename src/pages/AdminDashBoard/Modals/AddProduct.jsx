import React, { useState, useEffect } from 'react'

import { useAppContext } from '../../../context';
function AddProduct() {
    const { uploadProduct, insertingProducto, productsData, fetchProducts, deleteProduct } = useAppContext();


    const [formData, setFormData] = useState({
        nombreProducto: "",
        encabezadoDescripcionProducto: "",
        descripcionProducto: "",
        precioProducto: "",
        tonosProducto: "",
        imagenProducto: null
    });

    const [errors, setErrors] = useState({
        nombreProducto: false,
        encabezadoDescripcionProducto: false,
        descripcionProducto: false,
        precioProducto: false,
        imagenProducto: false
    });

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (name === 'imagenProducto') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            nombreProducto: !formData.nombreProducto,
            encabezadoDescripcionProducto: !formData.encabezadoDescripcionProducto,
            descripcionProducto: !formData.descripcionProducto,
            precioProducto: !formData.precioProducto,
            imagenProducto: !formData.imagenProducto
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (validateForm()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            uploadProduct(formDataToSend);
            setFormData({
                nombreProducto: "",
                encabezadoDescripcionProducto: "",
                descripcionProducto: "",
                precioProducto: "",
                tonosProducto: "",
                imagenProducto: null
            });
        }
    };

    

    return (
        <>
            <div className='container'>
                <div className='columns'>
                    <form className='column '>
                        <label className='label'>Nombre del producto:
                            <input type="text" className='input' name='nombreProducto' value={formData.nombreProducto} onChange={handleInputChange} placeholder='Achinador Pestañas' />
                        </label>
                        {errors.nombreProducto && <span className='tag is-danger custom-tag-uploadProduct m-1'>Este campo es requerido</span>}

                        <label className='label'>Encabezado de la descripción del producto:
                            <textarea type="text" className={`textarea ${errors.encabezadoDescripcionProducto ? "is-danger" : ""}`} name='encabezadoDescripcionProducto' value={formData.encabezadoDescripcionProducto} onChange={handleInputChange} placeholder='Transforma tu mirada al instante con nuestro enchinador de pestañas de calidad profesional.' />
                        </label>
                        {errors.encabezadoDescripcionProducto && <span className='tag is-danger custom-tag-uploadProduct m-1'>Este campo es requerido</span>}


                        <label className='label'>Descripción del producto:
                            <div className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth custom-table">
                                <tbody>
                                    <tr>
                                        <th className='title is-size-4 is-info'>Para un subtitulo</th>
                                        <td>
                                            <li>Encierra una palabra entre <p className='subtitle has-text-black is-size-5 has-text-weight-bold'>guiones altos "-texto-"</p> al comienzo y al final</li>
                                        </td>
                                    </tr>
                                    <div style={{margin: ".5rem"}}></div>
                                    <tr>
                                        <th className='title is-size-4 is-info'>Para dar formato de lista</th>
                                        <td>
                                            <li>Agrega un <p className='subtitle has-text-black is-size-5 has-text-black'>"_"</p> al comienzo y al final, por ejemplo <p className='has-text-black'>"_lista_"</p></li>
                                        </td>
                                    </tr>
                                </tbody>
                            </div>


                            <textarea type="text" className="textarea" content name='descripcionProducto' value={formData.descripcionProducto} onChange={handleInputChange} />
                        </label>
                        {errors.descripcionProducto && <span className='tag is-danger custom-tag-uploadProduct m-1'>Este campo es requerido</span>}


                        <label className='label'>Precio del producto:
                            <input type="text" className={`input ${errors.precioProducto ? "danger" : ""}`} name='precioProducto' value={formData.precioProducto} onChange={handleInputChange} />
                        </label>
                        {errors.precioProducto && <span className='tag is-danger custom-tag-uploadProduct m-1'>Este campo es requerido</span>}

                        <label className='label'>Tonos:
                            <input type="text" className='input' name='tonosProducto' value={formData.tonosProducto} onChange={handleInputChange} />
                        </label>

                        <div className="file is-info has-name">
                            <label className="file-label">
                                <input className={`file-input ${errors.imagenProducto ? "danger" : ""}`} type="file" name="imagenProducto" onChange={handleInputChange} />

                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>

                                    <span className="file-label"> Subir una imagen </span>
                                </span>

                                {formData.imagenProducto && <span className="file-name">{formData.imagenProducto.name}</span>}
                                {errors.imagenProducto && <span className='tag is-danger custom-tag-uploadProduct m-1'>Este campo es requerido</span>}

                            </label>

                        </div>
                        <div className='control'>
                            {insertingProducto ? "" : <button className='button primary' onClick={handleSubmit}>Subir producto</button>}
                            {insertingProducto ? <span className='tag is-warning'>Subiendo...</span> : ""}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )


}

export default AddProduct