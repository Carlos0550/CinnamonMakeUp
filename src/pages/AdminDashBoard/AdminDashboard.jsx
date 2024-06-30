import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import EditProductModal from './Modals/EditProductModal';

function AdminDashboard() {
    const { sessionId, retrieveSessionUser, fetchClientData, uploadProduct, insertingProducto, productsData, fetchProducts, deleteProduct } = useAppContext();
    const navigate = useNavigate();
    
    const [editProductModalActive, setEditProductModalActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (sessionId === null) {
            (async () => {
                await retrieveSessionUser();
            })();
        } else {
            fetchClientData();
            fetchProducts();
        }
    }, [sessionId]);

    useEffect(() => {
        if (sessionId !== process.env.REACT_APP_ADMIN_KEY) {
            navigate("/user-dashboard");
        }
    }, [sessionId]);

    const [formData, setFormData] = useState({
        nombreProducto: "",
        descripcionProducto: "",
        precioProducto: "",
        tonosProducto: "",
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
            uploadProduct(formDataToSend);
            setFormData({
                nombreProducto: "",
                descripcionProducto: "",
                precioProducto: "",
                tonosProducto: "",
                imagenProducto: null
            });
        }
    };

    const deleteProducts = (index) => {
        const productToDelete = productsData[index];
        deleteProduct(productToDelete);
    };

    const toggleEditProductModal = (index) => {
        setSelectedProduct(productsData[index]);
        setEditProductModalActive(!editProductModalActive);
    };

    return (
        <>
            <div className='grid'>
                <div className="cell">
                    <div className='container'>
                        <div className='columns'>
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
                                    {insertingProducto ? "" : <button className='button primary' onClick={handleSubmit}>Subir producto</button>}
                                    {insertingProducto ? <span className='tag is-warning'>Subiendo...</span> : ""}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box">
                <p className='title is-danger'>Productos publicados</p>
            </div>

            <div className="columns is-mobile">
                {productsData && productsData.map((item, index) => (
                    <div className="column" key={index}>
                        <div className="card custom-card">
                            <div className="card-image">
                                <figure className="image is-square custom-figure">
                                    <img src={item.publicUrl} alt="imagenProducto" className="custom-img" />
                                </figure>
                            </div>
                            <div className="box">
                                <p className="title has-text-primary is-size-6">
                                    {item.nombreProducto}
                                    <hr />
                                </p>
                                <p className="subtitle has-text-danger mt-5 has-text-weight-bold is-size-6">${item.precioProducto} c/u</p>
                                {item.tonosProducto && <p>Tonos: {item.tonosProducto}</p>}
                                {item.descripcionProducto && <p><strong>Descripcion: </strong>{item.descripcionProducto}</p>}
                                <div className="box custom-box">
                                    <span className='tag is-danger custom-tag m-3' onClick={() => deleteProducts(index)}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </span>

                                    <span className='tag is-info custom-tag m-3' onClick={() => toggleEditProductModal(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 12 18 27t6 31-6 30l-529 528h168l-106 319h-319zm0 0"/></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <EditProductModal product={selectedProduct} closeModal={toggleEditProductModal} />
        </>
    );
}

export default AdminDashboard;
