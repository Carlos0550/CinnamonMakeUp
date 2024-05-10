import React, { useEffect, useState } from 'react';
import InputsTOCK from './InputsTOCK';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Oauth/server';
import { useAppContext } from '../context/context';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./css/controlpanel.css"

function AdminControlPanel() {
    const navigate = useNavigate();
    const { stock, getStock, setIsLogin, isAdding, updateProduct } = useAppContext();
    const [editProduct, setEditProduct] = useState();
    const [idEdit, setIdEdit] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imgFile, setImgFile] = useState(null);
    const [values, setValues] = useState({
        name: "",
        price: "",
        stock: "",
        category: ""
    });

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
        const formData = new FormData();
        formData.append("image", imgFile);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("category", values.category);
        updateProduct(formData, idEdit);
    };

    useEffect(() => {
        retrieveUser();
        // eslint-disable-next-line
    }, []);

    const retrieveUser = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (!data.session) {
            navigate("/adminLogin");
        } else if (data.session.user.id === "a334c968-0b0b-4902-8979-a57f25757f3e") {
            setIsLogin(true);
            navigate("/controlPanel");
        } else {
            setIsLogin(true);
            navigate("/");
        }
        if (error) {
            console.log("Error");
        }
    };

    useEffect(() => {
        console.log("Productos: ", stock);
    }, [stock]); // Esto se ejecutará cada vez que stock cambie

    const deleteProduct = async (id, imgUrl) => {
      console.log(imgUrl)
      try {
          const { data, error } = await supabase
              .storage
              .from('photosCinnamon')
              .remove([`${imgUrl}`]);
              console.log("Response Foto: ", data);
          if (error) {
              console.log(error);
          } else {
              const { error } = await supabase
                  .from("productos")
                  .delete()
                  .eq("id", id);
              if (error) {
                  console.log(error);
              } else {
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
                      icon: "success",
                      title: "Producto Eliminado"
                  });
                  getStock();
              }
          }
      } catch (error) {
          throw new Error("Error: ", error);
      }
  };
  
  const handleDeleteBtn = async (id, imgUrl) => {
      Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire({
                  title: "Aguarde un momento",
                  text: "No salga de esta pestaña",
                  icon: "info"
              });
              deleteProduct(id, imgUrl);
          }
      });
  };
  
  
            

    const handleEditBtn = async (e) => {
        setIsEditing(true);
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
            icon: "info",
            title: "Aguarde un momento..."
        });
        const idEdit = e.target.value;
        try {
            const { data, error } = await supabase
                .from('productos')
                .select()
                .eq("id", idEdit);
            if (error) {
                Swal.fire("Error al traer el producto de la base de datos!");
            } else {
                setEditProduct(data[0]);
                setIdEdit(idEdit);
                handleShow(true);
                
            }
        } catch (error) {
            console.log(error);
        }finally{
          setIsEditing(false);
        }
    };

    useEffect(() => {
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
            icon: "info",
            title: "Recuperando productos..."
        });
    }, []);
    return (
      <div className='admin__container'>
          <InputsTOCK editProduct={editProduct}></InputsTOCK>
          <div className="admin__products">
              {stock.map((producto, index) => (
                  <div className='admin__products-container' key={producto.id}>
                      <div className='admin__product-card'>
                      <picture className='admin__picture'><img src={producto.imgUrl} alt="imagenProducto" className='admin__img' /></picture>

                          <h2 className='admin__product-name'>{producto.name}</h2>
                          <p className='admin__product-p'>$ {producto.price}</p>
                          <p className='admin__product-p'>Stock: {producto.stock}</p>
                          <p className='admin__product-p'>Cant. Colores: {producto.cantColores}</p>
                          <p className='admin__product-p'>Color/tono: {producto.colores ? producto.colores.join(', ') : ''}</p>
                          <button onClick={() => handleDeleteBtn(producto.id,producto.imgUrl)} className='delete__btn-panel'>Eliminar</button>
                          <button value={producto.id} onClick={handleEditBtn} disabled={isEditing} className='edit__btn-panel' style={{background: isEditing ? "grey" : ""}}>Editar</button>
                      </div>
                  </div>
              ))}
          </div>
          <>

  <Modal show={show} onHide={handleClose}
  size="lg"
  aria-labelledby="example-modal-sizes-title-lg"
>
    <Modal.Header closeButton>
      <Modal.Title>Editar: {editProduct ? editProduct.name : ""}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Nombre del producto</label>
            <input
              type="text"
              id="name"
              onChange={handleInputChange}
              value={values.name}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen:</label>
            <input type="file" id="image" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Cant. Disponibles:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={values.stock}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="category"
              className="filters__Admin"
              value={values.category}
              onChange={handleInputChange}
            >
              <option selected>Seleccione una categoria</option>
              <option value="labiales">Labiales</option>
              <option value="bases">Bases</option>
              <option value="rimels">Rimels</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isAdding}
            style={{ backgroundColor: isAdding ? "grey" : "" }}
            className="btn-save"
          >
            Guardar
          </button>
        </form>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancelar
      </Button>
    </Modal.Footer>
  </Modal>
</>
      </div>
  );
}

export default AdminControlPanel;
