import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/context'
import { useEffect } from 'react'

import { supabase } from '../Oauth/server'
import Swal from 'sweetalert2'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "./css/userInfo.css"

function UserInfo() { 
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Finmodal
    const [idUserLoaded, setIdUserLoaded] = useState(false);
    const {getUser,  getIdUser} = useAppContext()
    const [isSubmit, setIsSubmit] = useState(false)
    useEffect(()=>{
      getUser()
      
    },[])
    const [userData, setUserData] = useState("")
    const [userShopData, setUserShopData] = useState(null)

    let isNewUser = true
   
  const fetchUserValues = async()=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "info",
        title: "Aguarde un momento"
      });
    try {
      const { data, error } = await supabase
      .from('usuarios')
      .select()
      .eq("userId", getIdUser )
      if (error) {
        console.log(error)
      }
      setUserData(data)
      isNewUser= data.newUser
           
    } catch (error) {
        console.log(error)
    }
  }

  const fetchUserShops = async () =>{
    try {
      const { data, error } = await supabase
      .from('compras')
      .select('products')
      .eq("userID", getIdUser)
        if (error) {
          console.log("Error",error)

        }else{
          setUserShopData(data)
          console.log(data)
        }
    } catch (error) {
      
    }
  }
 
    
    const [values, setValues] = useState({
      nombre:"",
      apellido:"",
      direccion:"",
      provincia: "",
      ciudad:"",
      telefono:"",
      email:""
    })
  
  const handleInput = (e) =>{
    const {value, name} = e.target
    setValues((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsSubmit(true)
    if (!values.nombre || !values.apellido || !values.direccion || !values.email || !values.ciudad || !values.telefono) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Hay algunos campos que estan vacios"
      });
      setIsSubmit(false)
      return
    }
    try {
      const { error } = await supabase
      .from('usuarios')
      .insert({ 
                nombre: values.nombre,
                apellido: values.apellido,
                direccion: values.direccion,
                ciudad: values.ciudad,
                provincia: values.provincia,
                telefono: values.telefono,
                email: values.email,
                newUser: false,
                userId: getIdUser
      })
     
      if (error) {
        alert("No se pudieron guardar tus datos")
        console.log(error)
      }else{
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
          title: "Datos añadidos correctamente"
        });
      }
    } catch (error) {
      alert("Error al guardar tus datos")
      console.log(error)
    }
  }

  const handleEditUserValues = async(event)=>{
    event.preventDefault()
    setIsSubmit(true)
    const {nombre, apellido, direccion, email, ciudad, telefono, provincia} = values
    if (!nombre || !apellido || !direccion || !email || !ciudad || !telefono || !provincia) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Hay algunos campos que estan vacios"
      });
      setIsSubmit(false)
      return
    }
    try {
      const { error } = await supabase
      .from('usuarios')
      .update({ 
                nombre,
                apellido,
                direccion, 
                email, 
                provincia,
                ciudad, 
                telefono
      })
      .eq("userId", getIdUser)
     
      if (error) {
        alert("No se pudieron Actualizar sus datos")
        console.log(error)
      }else{
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
          title: "Datos actualizados correctamente"
        });
      }
      setIsSubmit(false)
    } catch (error) {
      alert("Error al guardar tus datos")
      console.log(error)
    }
  }

  useEffect(() => {
    if (getIdUser && !idUserLoaded) {
      
      // Realizar la lógica que deseas ejecutar una sola vez aquí
      setIdUserLoaded(true); // Marcar que el efecto ya se ha ejecutado
      fetchUserValues()
      fetchUserShops()
      
    }
  }, [getIdUser, idUserLoaded]);

  useEffect(() => {
    if (getIdUser && !idUserLoaded) {
      fetchUserShops()
    }
  }, [getIdUser, idUserLoaded]);


  

  return (
    <div className='infoUser__container'>
      <h1 className='infoUser__H1'>Hola {userData && userData.map((item)=> item.nombre)}👋</h1>
      <h2 className='infoUser__H2'>Bienvenido a tu perfil 📍</h2>
  
      {userData <= 0 && (
         isNewUser === true && (
          <div className='infoUser__container-user'>
            <p className='infoUser__p'>Si es la primera vez que te registras puedes completar este formulario para agilizar el proceso de envío.💖</p>
            <p className='infoUser__p' style={{fontWeight: "bold"}}>No te preocupes, tus datos estan seguros desde el momento en el que se envian y se guardan bajo estrictos mecanismos de seguridad</p>
            
            <form className='infoUser__form'>
              <label className='label__user-label'>Nombre: 
                <input type="text" name='nombre' value={values.nombre} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Apellido: 
                <input type="text" name='apellido' value={values.apellido} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Ciudad: 
                <input type="text" name='ciudad' value={values.ciudad} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Provincia: 
                <input type="text" name='provincia' value={values.provincia} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Direccion de envio: 
                <input type="text" name='direccion' value={values.direccion} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Correo: 
                <input type="text" name='email' value={values.email} onChange={handleInput} className='input__user-input' required/>
              </label>
              <label className='label__user-label'>Telefono: 
                <input type="number" name='telefono' value={values.telefono} onChange={handleInput} className='input__user-input' required/>
              </label>

              <button className='btn__user-save' onClick={handleSubmit} disabled={isSubmit} style={{backgroundColor: isSubmit ? "grey" : ""}}>Guardar</button>
            </form>
          </div>
        )
      )}
  
      {(userData || !isNewUser) && (
        <div>
          {userData && userData.map((item, index) => (
            <div key={index} className='infoUser__container-user'>
              <p className='infoUser__p'>Nombre: {item.nombre} 🩷</p>
              <p className='infoUser__p'>Apellido: {item.apellido} 🧡</p>
              <p className='infoUser__p'>Ciudad: {item.ciudad} 🌆</p>
              <p className='infoUser__p'>Provincia: {item.provincia} 🌎</p>
              <p className='infoUser__p'>Direccion de envio: {item.direccion} 🛣️</p>
              <p className='infoUser__p'>Contacto: {item.telefono} 📞</p>
              <button onClick={handleShow} className='infoUser__btn-edit'>Editar mis datos 🖋️</button>
            </div>
          ))}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body><form>
            <label className='label__user-label'>Nombre: 
                <input type="text" name='nombre' value={values.nombre} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Apellido: 
                <input type="text" name='apellido' value={values.apellido} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Ciudad: 
                <input type="text" name='ciudad' value={values.ciudad} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Provincia: 
                <input type="text" name='provincia' value={values.provincia} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Direccion de envio: 
                <input type="text" name='direccion' value={values.direccion} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Correo: 
                <input type="text" name='email' value={values.email} onChange={handleInput} className='input__user-input'/>
              </label>
              <label className='label__user-label'>Telefono: 
                <input type="number" name='telefono' value={values.telefono} onChange={handleInput} className='input__user-input'/>
              </label>
              
              <button className='btn__user-save' onClick={handleEditUserValues} disabled={isSubmit} style={{backgroundColor: isSubmit ? "grey" : ""}}>Actualizar</button>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className='infoUser__container-user'>
            <h2>Compras Realizadas 🛍️</h2>
            {userShopData && userShopData.length < 1 ? (
              "No hay compras registradas"
            ) : (
             userShopData && userShopData.map((compra, indiceCompra) => (
                <div key={indiceCompra} className='compra__conteiner'>
                   <p className='infoUser__p'><strong>Compra N° {indiceCompra + 1}</strong></p>
                  {compra && compra.products.map((producto, indiceProducto) => (
                    <div key={indiceProducto} className='compra__productos'>
                      <p><strong>{indiceProducto+1}°</strong></p>
                      <p>Nombre: {producto.nombre}</p>
                      <p>Precio: ${producto.price} c/u</p>
                      <p>Cantidad: {producto.cantidad}</p>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo