import React,{useState} from 'react';
import { useAppContext } from '../../../context';
function EditProductModal({ closeModal, product }) {
    const {} = useAppContext()
    const [formData, setFormData] = useState({
        nombreProducto: product ?.nombreProducto,
        descripcionProducto: product ?.descripcionProducto,
        precioProducto: product ?.precioProducto,
        tonosProducto: product ?.tonosProducto,
        imagenProducto: null
    });

    const [errors, setErrors] = useState({
        nombreProducto: false,
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
            // uploadProduct(formDataToSend);
            setFormData({
                nombreProducto: "",
                descripcionProducto: "",
                precioProducto: "",
                tonosProducto: "",
                imagenProducto: null
            });
        }
    };
    return (
        <div className={`modal ${product ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><strong>Editar Producto</strong> </p>
        </header>
        <section className="modal-card-body">
          
          <form className='column box'>
                                <label className='label'>Nombre del producto:
                                    <input type="text" className='input' name='nombreProducto' value={formData.nombreProducto} onChange={handleInputChange} />
                                </label>
                                {errors.nombreProducto && <span className='tag is-danger'>Este campo es requerido</span>}
                                <label className='label'>Descripción del producto:
                                    <textarea type="text" className={`textarea ${errors.nombreProducto ? "is-danger" : ""}`} name='descripcionProducto' value={formData.descripcionProducto} onChange={handleInputChange} />
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
                                            <span className="file-label"> Info file… </span>
                                        </span>
                                        {formData.imagenProducto && <span className="file-name">{formData.imagenProducto.name}</span>}
                                    </label>
                                </div>
                                {errors.imagenProducto && <span className='tag is-danger'>Este campo es requerido</span>}
                                <div className='control'>
                                    {/* {insertingProducto ? "" : <button className='button primary' onClick={handleSubmit}>Subir producto</button>}
                                    {insertingProducto ? <span className='tag is-warning'>Subiendo...</span> : ""} */}
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
