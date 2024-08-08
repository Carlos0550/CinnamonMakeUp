import React, { useState } from 'react';
import { useAppContext } from '../../../context';

function EditProductModal({ closeModal, product }) {
    const { editProduct } = useAppContext();
    const [formData, setFormData] = useState({
        nombreProducto: product?.nombreProducto || '',
        encabezadoDescripcionProducto: product?.encabezadoDescripcionProducto || '',
        descripcionProducto: product?.descripcionProducto || '',
        precioProducto: product?.precioProducto || '',
        tonosProducto: product?.tonosProducto || '',
        imagenProducto: null,
        lastImagenProducto: product?.imagenProducto || '',
        productId: product?.id || ''
    });

    const [errors, setErrors] = useState({
        nombreProducto: false,
        precioProducto: false,
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
            precioProducto: !formData.precioProducto,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (key !== 'imagenProducto' || formData[key]) {
                    formDataToSend.append(key, formData[key]);
                }
            }
            // Si no hay nueva imagen, usar la imagen anterior
            if (!formData.imagenProducto) {
                formDataToSend.append('lastImagenProducto', formData.lastImagenProducto);
            }
            editProduct(formDataToSend);
            setFormData({
                nombreProducto: '',
                descripcionProducto: '',
                encabezadoDescripcionProducto: '',
                precioProducto: '',
                tonosProducto: '',
                imagenProducto: null,
                lastImagenProducto: '',
                productId: ''
            });
            closeModal();
        }
    };

    return (
        <div className={`modal ${product ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title"><strong className='subtitle has-text-black has-text-weight-bold'>Editar Producto</strong></p>
                </header>
                <section className="modal-card-body">
                    <form className='column box' onSubmit={handleSubmit}>
                        <label className='label'>Nombre del producto:
                            <input type="text" className='input' name='nombreProducto' value={formData.nombreProducto} onChange={handleInputChange} />
                        </label>
                        {errors.nombreProducto && <span className='tag is-danger'>Este campo es requerido</span>}
                        
                        <label className='label'>Encabezado:
                            <input type="text" className='input' name='encabezadoDescripcionProducto' value={formData.encabezadoDescripcionProducto} onChange={handleInputChange} />
                        </label>
                        
                        <label className='label'>Descripción del producto:
                            <textarea className={`textarea ${errors.nombreProducto ? "is-danger" : ""}`} name='descripcionProducto' value={formData.descripcionProducto} onChange={handleInputChange} />
                        </label>
                        
                        <label className='label'>Precio del producto:
                            <input type="text" className={`input ${errors.precioProducto ? "danger" : ""}`} name='precioProducto' value={formData.precioProducto} onChange={handleInputChange} />
                        </label>
                        {errors.precioProducto && <span className='tag is-danger'>Este campo es requerido</span>}
                        
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
                                    <span className="file-label"> Subir una imagen</span>
                                </span>
                                {formData.imagenProducto && <span className="file-name">{formData.imagenProducto.name}</span>}
                            </label>
                        </div>
                        
                        {errors.imagenProducto && <span className='tag is-danger'>Falta subir la imagen!</span>}
                        
                        <div className='control'>
                            <button type="submit" className="button is-info">Actualizar producto</button>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={closeModal}>Cancelar</button>
                </footer>
            </div>
        </div>
    );
}

export default EditProductModal;
