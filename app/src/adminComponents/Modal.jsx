import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/context';
function Modal({ onClose, valuesEdit, id }) {
    const {updateData} = useAppContext()
    const [imgFile, setImgFile] = useState(null);
    const [values, setValues] = useState({
        name: "",
        price: "",
        stock: "",
        category: ""
    });

    useEffect(() => {
        console.log("En el modal tengo: ", values)
        if (valuesEdit ==! undefined || valuesEdit ==! null && Object.keys(valuesEdit).length > 0) {
            const { name, price, stock, category } = valuesEdit[0];
            setValues({ name, price, stock, category });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("id: ",id)
        const formData = new FormData();
        formData.append("image", imgFile);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("category", values.category);
        updateData(formData,id)
        // Aquí puedes hacer lo que necesites con formData
    };
const handleCloseModal = () =>{
    if(onClose){
        onClose()
    }
}
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="form-container">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3>Editar Producto</h3>
                        <div className="form-group">
                            <label htmlFor="name">Nombre del producto</label>
                            <input
                                type="text"
                                id="name"
                                onChange={handleInputChange}
                                value={values.name}
                                name='name'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Imagen:</label>
                            <input type='file' id="image" onChange={handleFileChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Precio:</label>
                            <input
                                type="number"
                                id="price"
                                name='price'
                                value={values.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">Cant. Disponibles:</label>
                            <input
                                type="number"
                                id="stock"
                                name='stock'
                                value={values.stock}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Categoría:</label>
                            <select id="category" name='category' className='filters' value={values.category} onChange={handleInputChange}>
                                <option selected>Seleccione una categoria</option>
                                <option value="labiales">Labiales</option>
                                <option value="bases">Bases</option>
                                <option value="rimels">Rimels</option>
                                <option value="accesorios">Accesorios</option>
                            </select>
                        </div>
                        <button type='submit'>Guardar</button>
                        <button onClick={handleCloseModal}>Cerrar modal</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
