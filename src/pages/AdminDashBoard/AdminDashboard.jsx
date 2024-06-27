import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const { sessionId, retrieveSessionUser, fetchClientData, uploadProduct, insertingProducto } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId === null) {
      (async () => {
        await retrieveSessionUser();
      })();
    } else {
      fetchClientData();
    }
  }, [navigate, sessionId]);

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
      })
    }
  };

  return (
    <div className='grid'>
      <div className="cell">
        <div className='container'>
          <div className='columns'>
            <form className='column box'>
              <label className='label'>Nombre del producto:
                <input type="text" className='input' name='nombreProducto' onChange={handleInputChange} />
              </label>
              {errors.nombreProducto && <span className='tag is-danger'>Este campo es requerido</span>}
              <label className='label'>Descripción del producto:
                <input type="text" className={`input ${errors.nombreProducto ? "danger" : ""}`} name='descripcionProducto' onChange={handleInputChange} />
              </label>
              <label className='label'>Precio del producto:
                <input type="text" className={`input ${errors.precioProducto ? "danger" : ""}`} name='precioProducto' onChange={handleInputChange} />
              </label>
              {errors.precioProducto && <span className='tag is-danger'>Este campo es requerido</span>}
              <label className='label'>Tonos:
                <input type="text" className='input' name='tonosProducto' onChange={handleInputChange} />
              </label>
              <div class="file is-info has-name">
                <label class="file-label">
                  <input class={`file-input ${errors.imagenProducto ? "danger" : ""}`} type="file" name="imagenProducto" onChange={handleInputChange} />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Info file… </span>
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
  )
}

export default AdminDashboard