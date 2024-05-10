import React, { useState } from 'react';
import { useAppContext } from '../context/context';
import './css/carrito.css'; // Importa tu archivo de estilos CSS
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import { supabase } from '../Oauth/server';

function Carrito() {
    const { carrito, setCarrito, eliminarDelCarrito, getIdUser, setShopData } = useAppContext();
    const [totalPrice, setTotalPrice] = useState(0);
    const [isPurchase, setIsPurchase] = useState(false);
    const [added, setAdded] = useState(null)
    const [idUserLoaded, setIdUserLoaded] = useState(false);
    
    const [isSending, setIsSending] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const [userData, setUserData] = useState("")

    const fetchUserValues = async()=>{
      try {
        const { data, error } = await supabase
        .from('usuarios')
        .select()
        .eq("userId", getIdUser )
        if (error) {
          console.log(error)
        }
        setUserData(data)  
               
      } catch (error) {
          console.log(error)
      }
    }
    useEffect(() => {
      if (getIdUser && !idUserLoaded) {
        setIdUserLoaded(true); 
        fetchUserValues()
      }
    }, [getIdUser, idUserLoaded]);

    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      setInputValues(prevState => ({
        ...prevState,
        [index]: value
      }));
    };
    function finishPurchase() {
      
      if (!isSending) {
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
          title: "Compra realizada con exito"
        });
      }
      window.location.reload()
    }
    const handleAddMoreItems = (index) => {
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
      }, 1000);
      
      const producto = carrito[index];
      const cantidadSeleccionada = parseInt(inputValues[index] || 0, 10);
      if (cantidadSeleccionada > producto.stock) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No puedes añadir más cantidad de la que hay en stock",
        });
        return;
      }
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
        title: "Añadido o actualizado correctamente"
      });
      const updatedCarrito = [...carrito];
      updatedCarrito[index] = {
        ...producto,
        cantidad: cantidadSeleccionada
      }
      setCarrito(updatedCarrito)
      console.log("Cantidad ingresada")
    };
    
    const HandlePurchase = async () => {
      setIsSending(true);
      
      try {
        const response = await axios.post("https://cinnamon-make-up.vercel.app/send-email",{
        // const response = await axios.post("http://localhost:3000/send-email",{
          carrito,
          userData,
          totalPrice
        });
        
        if (response.status = 500) {
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
            icon: "error",
            title: "Hubo un error al momento de procesar la compra"
          });
          setIsSending(false);
          
        }
        if (response.status = 200) {
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
            title: "Compra Realizada con éxito"
          });
        }
        setShopData(carrito)
        setIsSending(false);
        finishPurchase()
        
      } catch (error) {
        console.log(error);
      }
    };

    const handleItemId = (index) => {
      Swal.fire({
        title: "Estas seguro?",
        text: "Tendras que seleccionar nuevamente el producto si lo quieres devuelta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado",
            text: "Este item fue eliminado del carrito",
            icon: "success"
          });
          eliminarDelCarrito(index);
        }
      });
    };

    const handleConfirmPurchase = async() => {
      const cantidadMayorQueStock = carrito.some(producto => producto.cantidad > producto.stock);
      if (cantidadMayorQueStock) {
        alert("La cantidad seleccionada es mayor que el stock disponible");
        return;
      }
      const total = carrito.reduce((acc, item) => acc + parseFloat(item.price) * (item.cantidad || 1), 0);
      setTotalPrice(total);
      setIsPurchase(true); 
      
    };

    return (
      <div className='container__carrito'>
        <ol className='carrito-lista'>
          {carrito.length === 0 ? (
              <p style={{color:"white"}}>Aquí aparecerán los items que añadas al carrito</p>
          ) : (
              carrito.map((item, index) => (
                  <div className='carrito-item' key={index}>
                      <li>
                          <div className="carrito-contenido">
                            <picture className='conteiner-img'><img src={item.imgUrl} alt="imagenProducto" className='carrito-imagen'/></picture>
                              <p className="carrito-p">{item.name}</p>
                              <p className="carrito-p">${item.price}</p>
                              <p className='carrito-p'>Cantidad a comprar: {item.cantidad || "1"}</p>
                              <p className='carrito-p'>En stock: {item.stock}</p>

                              <label className='carrito__label'>Cantidad: 
                                <input className='carrito__label-input' type="number" value={inputValues[index] || ''} onChange={(e) => handleInputChange(e, index)} />
                              </label>
                              <button className="carrito-edit" onClick={() => handleAddMoreItems(index)}> {added ? "Añadido" : "Añadir o actualizar"} </button>
                              <button className="carrito-boton" onClick={() => handleItemId(index)}>Eliminar</button>
                          </div>
                      </li>
                  </div>
              ))
          )}
          {carrito.length === 0 ? (
            <p style={{color: "white"}}>Nada que mirar por aquí...</p>
          ) : (
            <button className='btn__confirm-purchase' onClick={handleConfirmPurchase}>Confirmar Compra</button>
          )}
        </ol>
        {isPurchase && (
          <Modal show={isPurchase} onHide={() => setIsPurchase(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Formulario de confirmación de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Por favor le pedimos encarecidamente que complete sus datos en su perfil en caso que no vea nada en esta ventana💓</p>
              <p style={{fontWeight: "bold"}}>Total de compra: {totalPrice}</p>
              {userData.map((item, index) => (
                <p key={index}>
                  Nombre completo: {item.nombre} <br/>
                  Apellido: {item.apellido} <br/>
                  Email: {item.email} <br/>
                  Telefono: {item.telefono} <br/>
                  Provincia: {item.provincia} <br/>
                  Dirección: {item.direccion} <br/>
                  Ciudad: {item.ciudad} <br />
                </p>
              ))}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsPurchase(false)}>
                Cerrar
              </Button>
              <Button variant="success" onClick={HandlePurchase} disabled= {isSending} style={{backgroundColor: isSending ? "grey" : ""}}>
                Realizar Compra
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
}

export default Carrito;