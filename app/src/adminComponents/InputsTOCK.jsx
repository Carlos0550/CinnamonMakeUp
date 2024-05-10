import React, { useState } from 'react';
import { useAppContext } from '../context/context';
import "./css/InputsTOCK.css"; // Importa el archivo CSS de estilos
import Swal from 'sweetalert2';

function InputsTOCK() {
    const { addProduct, isAdding } = useAppContext();
    const [imgFile, setImgFile] = useState(null);
    const [values, setValues] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        cantColores: "",
        colores: []
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'cantColores') {
            setValues({
                ...values,
                [name]: value,
                colores: Array.from({ length: parseInt(value, 10) }, (_, i) => values.colores[i] || "")
            });
        } else if (name.startsWith('color-')) {
            const updatedColores = [...values.colores];
            updatedColores[index] = value;
            setValues({
                ...values,
                colores: updatedColores
            });
        } else {
            setValues((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };
    let colores = []
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imgFile);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("category", values.category);
        formData.append("cantColores", values.cantColores);
        for (let i = 0; i < 1; i++){
            colores.push(values.colores)
        }
        console.log(colores)
        let emptyFields = {}
        for (let pair of formData.entries()) {
            if (typeof pair[1] === "string" && pair[1].trim() === "") {
                emptyFields[pair[0]] = true
            }
        }
        if (Object.keys(emptyFields).length > 0) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Hay algunos campos vacios"
            });
        } else {
            
            addProduct(formData, colores);
            setValues({
                name: "",
                price: "",
                stock: "",
                category: "",
                cantColores: "",
                colores: []
            })
        }
    };

    if (isAdding) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "warning",
            title: "Guardando producto, no salga de esta sección"
        });
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name" className='label__input'>Nombre del producto</label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInputChange}
                            value={values.name}
                            name='name'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className='label__input'>Imagen:</label>
                        <input type='file' id="image" onChange={handleFileChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price" className='label__input'>Precio:</label>
                        <input
                            type="number"
                            id="price"
                            name='price'
                            value={values.price}
                            onChange={handleInputChange}
                            style={{ width: "30%" }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock" className='label__input'>Cant. Disponibles:</label>
                        <input
                            type="number"
                            id="stock"
                            name='stock'
                            value={values.stock}
                            onChange={handleInputChange}
                            style={{ width: "30%" }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className='label__input'>Categoría:</label>
                        <select id="category" name='category' className='filters_admin' value={values.category} onChange={handleInputChange} required>
                            <option selected>Seleccione una categoria</option>
                            <option value="labiales">Labiales</option>
                            <option value="bases">Bases</option>
                            <option value="rimels">Rimels</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="promos">Promociones</option>
                            <option value="sombras">Sombras</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock" className='label__input'>Cant. Tonos:</label>
                        <input
                            type="number"
                            id="cantColores"
                            name='cantColores'
                            value={values.cantColores}
                            onChange={handleInputChange}
                            style={{ width: "40%" }}
                        />
                    </div>
                    {values.colores.map((color, index) => (
                        <div key={index} className="form-group">
                            <label htmlFor={`color-${index}`} className='label__input'> {index + 1}°:</label>
                            <input
                                type="text"
                                id={`color-${index}`}
                                name={`color-${index}`}
                                value={color}
                                onChange={(e) => handleInputChange(e, index)}
                                style={{ width: "40%" }}
                            />
                        </div>
                    ))}
                    <button type='submit' disabled={isAdding} style={{ background: isAdding ? "grey" : "" }} className='btn-save'>Guardar</button>
                    {isAdding ? <div className="dot-spinner">
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                    </div>
                        :
                        ""}
                </form>
            </div>
        </>
    );
}

export default InputsTOCK;
