import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { supabase } from "./componentes/Auth";
import { message, Result, Modal, Button } from "antd";
import { v4 as uuidv4 } from "uuid"


import axios from "axios";
import FinallyPurchase from "./pages/Home/Modals/FInalizarCompra/FinallyPurchase";

export const AppContext = createContext();



export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return ctx;
};

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [purchasing, setPurchasing] = useState(false)
  const [deletingCart, setDeletingCart] = useState(false)
  const [updatingItem, setUpdatingItemIndex] = useState(false)

  const [removingItem, setRemovingItem] = useState()
  const [addingProduct, setAddingProduct] = useState(false);
  const [productsData, setProductsData] = useState([])
  const [fetchingProducts, setFetchingProducts] = useState(false)
  const [insertingProducto, setInsertingProduct] = useState(false)

  const [updatingCient, setUpdatingClient] = useState(false);
  const [errorUpdateClient, setErrorUpdateClient] = useState(false);
  const [sucessUpdateClient, setSucessUpdateClient] = useState(false)
  const [insertingUserData, setInsertingUserData] = useState(false)
  const [errorInsertingUserData, seterrorInsertingUserData] = useState(false)
  const [insertUserDataSuccess, setinsertUserDataSuccess] = useState(false)
  const [fetchingClientData, setFetchingClientData] = useState(false)
  const [clientData, setClientData] = useState([])
  const [retrievingSession, setRetrievingSession] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [isLogout, setIsLogout] = useState(false)
  const [errorUser, setErrorUser] = useState(false)
  const [sending, setSending] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [cart, setCart] = useState([])
  const [fetchingCart, setFetchingCart] = useState(false)
  const [removingIndividualItem, setRemovingIndividualItem] = useState(false)


  //Registrar un usuario
  const register = async (values) => {
    setSending(true);
    try {
      // Intentar registrar el usuario
      const { user, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // Verificar si el error es de correo ya registrado
        if (error.message.includes("User already registered")) {
          message.error("El correo ya está registrado.");
        } else {
          console.error(error);
          setErrorRegister(true);
          setTimeout(() => {
            setErrorRegister(false);
          }, 2000);
        }
        setSending(false);
        return;
      }

      message.info("Verifique su casilla de correo para terminar el registro");
      console.info(user);
      message.success("Registro exitoso");
      setSending(false);

    } catch (error) {
      message.error("Error interno del servidor, por favor, intente nuevamente");
      console.error(error);
      setSending(false);
    } finally {
      setSending(false);
    }
  };

  //logear un usuario
  const login = async (values) => {
    setSending(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      console.log(error)
      // console.log(data)

      if (error) {
        setErrorUser(true)
        setSending(false)
        setTimeout(() => {
          setErrorUser(false)
        }, 2000);
        message.error("El usuario o contraseña no es correcto", 2)
      }
      if (data.user.id) {
        message.success("Usuario logueado")
        setSending(false)
        navigate("/user-dashboard")
        setSessionId(data.user.id)
      }
    } catch (error) {
      message.error("Error interno del servidor, por favor, intente nuevamente")
    } finally {
      setSending(false)
    }

  }

  useEffect(() => {
    (async () => {

      const { data: { user } } = await supabase.auth.getUser()
      if (user?.id) {
        setSessionId(user.id)
      }
    })()
  }, [])


  const fetchClientData = async () => {
    setFetchingClientData(true)
    if (clientData.length === 0) {
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select()
          .eq("userUuid", sessionId)

        if (data) {
          setClientData(data)
          setFetchingClientData(false)

        }
        if (error) {
          message.error("Hubo un error al mostrar su cuenta")
          setFetchingClientData(false)

        }
      } catch (error) {
        message.error("Hubo un error al mostrar su cuenta")

      } finally {
        setFetchingClientData(false)
      }
    }
  }
  //Carrito del usuario en la base de datos
  const fetchCarrito = async () => {
    try {
      const { data, error } = await supabase
        .from("carrito")
        .select()
        .eq("userId", sessionId)
      if (error) {
        console.log(error)
        message.error("Error al mostrar los items del carrito")

      } else {
        setCart(data)
        setFetchingCart(false)
      }
    } catch (error) {
      console.log(error)
      message.error("Error al mostrar los items del carrito")

    } finally {
      setFetchingCart(false)

    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchClientData()
      fetchCarrito()
    }
  }, [sessionId])

  //Cerrar sesion
  const logout = async () => {
    setIsLogout(true)
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        message.error("Error al cerrar la sesión");
      } else {
        message.success("Sesión cerrada exitosamente");
        setClientData([])
        setSessionId(null)
      }
    } catch (error) {
      message.error("Error al cerrar la sesión");
    } finally {
      setIsLogout(false)

    }
  };

  const recoverPassword = async (email) => {
    console.log(email)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    try {
      if (error) {
        message.error("Hubo un error, por favor intente nuevamente")
      }
      if (data) {
        message.success("Enviamos un correo a su email para recuperar su contraseña")
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePassword(accessToken, newPassword) {
    const { user, error } = await supabase.auth.updateUser(accessToken, {
      password: newPassword,
    });

    if (error) {
      message.error("Error al restablecer su contraseña")
      return
    }

    message.success("Contraseña actualizada correctamente!")
  }




  //Obtiene los datos del cliente


  useEffect(() => {
    if (sessionId !== null) {
      navigate("/")
    } else {
      navigate("/")
    }

  }, [sessionId])

  //Añadir datos al perfil del cliente
  const insertUserData = async (val) => {
    console.log(val)
    setInsertingUserData(true)
    try {
      const { error } = await supabase
        .from('usuarios')
        .insert({
          "userUuid": val.uuid,
          "newUser": val.newUser,
          "nombre": val.nombre,
          "apellido": val.apellido,
          "email": val.correo,
          "telefono": val.phone,
          "ciudad": val.ciudad,
          "provincia": val.provincia,
          "direccion": val.direccion
        })
      if (error) {
        seterrorInsertingUserData(true)
        setInsertingUserData(false)
        message.error("Ups, No se pudo enviar sus datos, por favor intente nuevamente")
        setTimeout(() => {
          seterrorInsertingUserData(false)
        }, 2000);
      }
      message.success("Datos guardados correctamente")
      setinsertUserDataSuccess(true)
      setInsertingUserData(false)
      setTimeout(() => {
        setinsertUserDataSuccess(false)
      }, 2000);
      fetchClientData()
    } catch (error) {
      message.error("Ups, No se pudo enviar sus datos, por favor intente nuevamente")

    } finally {
      setInsertingUserData(false)
    }
  }

  //Actualizar el perfil del cliente
  const updateClientData = async (val) => {
    setUpdatingClient(true)
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          "nombre": val.nombre,
          "apellido": val.apellido,
          "email": val.correo,
          "direccion": val.direccion,
          "telefono": val.phone,
          "ciudad": val.ciudad,
          "provincia": val.provincia
        })
        .eq('userUuid', val.uuid)
      if (!error) {
        message.success("Datos actualizados!")
        setSucessUpdateClient(true)
        setTimeout(() => {
          setSucessUpdateClient(false)

        }, 2000);
        setUpdatingClient(false)
        message.info("Refrescando página en 3...")
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      } else {
        console.error(error)
        message.error("Hubo un error al actualizar los datos")
        setErrorUpdateClient(true)
        setTimeout(() => {
          setErrorUpdateClient(false)
        }, 5000);
        setUpdatingClient(false)

      }
    } catch (error) {
      message.error("Hubo un error al actualizar los datos")
      setErrorUpdateClient(true)
      setTimeout(() => {
        setErrorUpdateClient(false)
      }, 5000);
    } finally {
      setUpdatingClient(false)
    }
  }

  //Carga de productos para la venta
  const uploadProduct = async (formData) => {
    message.loading("Subiendo producto");
    setInsertingProduct(true);

    try {
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const { imagenProducto, ...productData } = formDataObject;
      const uniqueImageName = `${uuidv4()}-${imagenProducto.name}`;

      // Subir la imagen al bucket
      const { data: uploadImage, error: uploadError } = await supabase
        .storage
        .from('photos') // Asegúrate de que el nombre del bucket sea correcto
        .upload(`public/${uniqueImageName}`, imagenProducto, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        message.error("Error al subir el producto");
        return;
      }

      // if (uploadImage) {
      //   message.success("Imagen guardada");
      // }

      const imagePath = `public/${uniqueImageName}`;

      // Obtener la URL pública de la imagen subida
      const { data: publicUrlData } = supabase
        .storage
        .from('photos')
        .getPublicUrl(imagePath);

      const publicUrlImage = publicUrlData.publicUrl;

      // Insertar los datos del producto en la base de datos
      const { data: insertData, error: insertError } = await supabase
        .from('productos')
        .insert({
          nombreProducto: productData.nombreProducto,
          encabezadoDescripcionProducto: productData.encabezadoDescripcionProducto,
          descripcionProducto: productData.descripcionProducto,
          precioProducto: productData.precioProducto,
          tonosProducto: productData.tonosProducto,
          imagenProducto: imagePath,
          publicUrl: publicUrlImage
        });

      if (insertError) {
        message.error("Error al insertar el producto");
        console.log(insertError);
      } else {
        message.success("Producto guardado");
        fetchProducts()
      }
    } catch (error) {
      console.error(error);
      message.error("Error al insertar el producto");
    } finally {
      setInsertingProduct(false);
    }
  };

  //Traer todos los productos 
  const fetchProducts = async () => {
    setFetchingProducts(true);
    try {
      const { data, error } = await supabase
        .from("productos")
        .select()

      if (data) {
        setProductsData(data)
        setFetchingProducts(false)
      }
      if (error) {
        console.log(error)
      }

    } catch (error) {
      console.log(error)

    } finally {
      setFetchingProducts(false)
    }
  }

  //Eliminar algun producto
  const deleteProduct = async (product) => {
    message.loading("Eliminando producto")
    const productIdDelete = product.id || product
    console.log(productIdDelete)
    try {
      const { data: dataImagen, error: errorImagen } = await supabase
        .storage
        .from('photos')
        .remove([`${product.imagenProducto}`])

      // if (dataImagen) {
      //   console.log(dataImagen)
      // }
      if (errorImagen) {
        message.error("Error al borrar el producto")
        return
      }

      if (!errorImagen) {
        const response = await supabase
          .from('productos')
          .delete()
          .eq('id', productIdDelete)
        if (response.status === 204) {
          message.success("Producto Eliminado")
          fetchProducts()
        }
      }

    } catch (error) {

    }
  }

// Editar algún producto
const editProduct = async (formData) => {
  const hiddenMessage = message.loading("Actualizando producto...", 0);
  const lastImageDelete = formData.get("lastImagenProducto");
  const productId = formData.get("productId");
  const nuevaImagen = formData.get("imagenProducto");

  try {
    let imageUrl;
    let urlBucket;
    if (nuevaImagen) {

      // Eliminar la imagen anterior si hay una nueva
      const { data: dataImagen, error: errorImagen } = await supabase
        .storage
        .from('photos')
        .remove([`${lastImageDelete}`]);

      if (errorImagen) {
        hiddenMessage();
        message.error("Error al borrar la imagen del producto");
        console.log("Error al borrar la imagen anterior:", errorImagen);
        return;
      }


      const uniqueImageName = `${uuidv4()}-${nuevaImagen.name}`;

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('photos')
        .upload(`${productId}/${uniqueImageName}`, nuevaImagen);

      if (uploadError) {
        hiddenMessage();
        message.error("Error al subir la nueva imagen");
        console.log("Error al subir la nueva imagen:", uploadError);
        return;
      }

      // Obtener la URL pública de la nueva imagen
      const { data: publicUrlData } = supabase
        .storage
        .from('photos')
        .getPublicUrl(`${productId}/${uniqueImageName}`);

      imageUrl = publicUrlData.publicUrl; //Url publica
    } else {
      // Mantener la imagen anterior si no ha sido modificada
       urlBucket = lastImageDelete; //contenido de la ruta en el bucket
    }

    // Actualizar el producto en la base de datos
    const updatedProduct = {
      nombreProducto: formData.get("nombreProducto"),
      encabezadoDescripcionProducto: formData.get("encabezadoDescripcionProducto"),
      descripcionProducto: formData.get("descripcionProducto"),
      precioProducto: formData.get("precioProducto"),
      tonosProducto: formData.get("tonosProducto"),
      imagenProducto: urlBucket,
      publicUrl: imageUrl,
      id: productId
    };

    const { data: updateData, error: updateError } = await supabase
      .from('productos')
      .update(updatedProduct)
      .eq('id', productId);

    if (updateError) {
      hiddenMessage();
      message.error("Error al actualizar el producto");
      console.log("Error al actualizar el producto:", updateError);
      return;
    }

    hiddenMessage();
    message.success("Producto actualizado con éxito");
    fetchProducts()
  } catch (error) {
    console.log("Error durante la actualización del producto:", error);
    hiddenMessage();
    message.error("Error al actualizar el producto");
  } finally {
    hiddenMessage();
  }
};
  //Añadir un producto al carrito, ya sea local o en la base de datos si exister sessionId
  const addToCart = async (product) => {
    const carritoInfo = product.productInfo
    if (sessionId === null) {
      const cloneCart = [...cart]
      const updatedCart = [...cloneCart, product];
      setCart(updatedCart);
      message.success(`${carritoInfo.nombreProducto} añadido!`);

    } else {
      try {
        setAddingProduct(true);
        const { error } = await supabase
          .from("carrito")
          .insert({
            "nombreProducto": carritoInfo.nombreProducto,
            "precioProducto": carritoInfo.precioProducto,
            "publicUrl": carritoInfo.publicUrl,
            "tonos": product.tones,
            "quantity": product.quantity,
            "userId": product.sessionId
          });

        if (error) {
          console.log(error);
          message.error("Error al añadir el producto al carrito");
          setAddingProduct(false);
          return;
        }
        message.success(`${carritoInfo.nombreProducto} añadido!`);
        fetchCarrito()
      } catch (error) {
        console.log(error);
        message.error("Error al añadir el producto al carrito");
      } finally {
        setAddingProduct(false);
      }
    }

  };

  //Eliminar un producto del carrito, ya sea local o en la base de datos si exister sessionId
  const removeFromCart = async (productIndice, productId) => {
    if (sessionId === null) {
      setCart(prevCart => prevCart.filter((_, idx) => idx !== productIndice))
    } else {
      setRemovingItem(productIndice)
      try {
        const response = await supabase
          .from("carrito")
          .delete()
          .eq("id", productId)

        if (response.status === 204) {
          message.success("Producto eliminado!")
          await fetchCarrito()
        } else {
          message.error("Error al eliminar el producto")
          setRemovingItem(null)
        }
      } catch (error) {
        message.error("Error al eliminar el producto")
        console.log(error)
      } finally {
        setRemovingItem(null)
      }
    }

  };

  //Aumentar en 1 la cantidad de un producto, ya sea local o en la base de datos si exister sessionId
  const updateCartItem = async (productIndex, productId) => {
    let newQuantity;

    if (sessionId === null) {
      const updatedCart = [...cart];


      if (productIndex >= 0 && productIndex < updatedCart.length) {
        newQuantity = parseInt(updatedCart[productIndex].quantity) + 1;
      } else {
        message.error("Índice de producto no válido");
        setUpdatingItemIndex(null);
        return;
      }

      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: newQuantity.toString()
      };

      setCart(updatedCart);
    } else {
      let currentQuantity = 0
      let newQuantity = 0
      setUpdatingItemIndex(productIndex);
      try {
        const { data, error } = await supabase
          .from("carrito")
          .select("quantity")
          .eq("id", productId)

        currentQuantity = data[0].quantity
        newQuantity = parseInt(currentQuantity) + 1
        // console.log("Item del carrito: ",newQuantity)
        if (!error) {
          try {
            const { error } = await supabase
              .from("carrito")
              .update({ quantity: newQuantity })
              .eq("id", productId);

            if (error) {
              console.log(error);
              message.error("Ocurrió un error, por favor, intente nuevamente");
              setUpdatingItemIndex(null);
              return;
            }
            message.success("Se añadió otro ítem al carrito");
            fetchCarrito()
          } catch (error) {
            console.log(error);
          } finally {
            setUpdatingItemIndex(null);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  //Restar en 1 la cantidad de un producto del carrito,, ya sea local o en la base de datos si exister sessionId
  const removeAnItem = async (productIndex, productId) => {
    // console.log("Index: ", productIndex)
    // console.log("ID producto: ", productId)
    let currentQuantity;
    if (sessionId === null) {
      const cloneCart = [...cart];

      if (productIndex >= 0 && productIndex < cloneCart.length) {
        const product = cloneCart[productIndex];
        currentQuantity = parseInt(product.quantity);

        if (isNaN(currentQuantity)) {
          message.error("Ups, hubo un error inesperado, por favor reintente nuevamente")
          return;
        }

        const newQuantity = currentQuantity - 1;

        if (newQuantity < 1) {
          removeFromCart(productIndex, productId)
        } else {
          cloneCart[productIndex] = {
            ...product,
            quantity: newQuantity.toString() // Asegúrate de que quantity sea un string
          };
          setCart(cloneCart);
          message.success("Se removió un item del carrito");
        }
      }
    } else {
      let currentQuantity = 0
      let newQuantity = 0
      setRemovingIndividualItem(productIndex);
      try {
        const { data, error } = await supabase
          .from("carrito")
          .select("quantity")
          .eq("id", productId)

        currentQuantity = data[0].quantity

        newQuantity = parseInt(currentQuantity) - 1

        if (newQuantity < 1) {
          await removeFromCart(productIndex, productId)
          return;
        }
        if (!error) {
          try {
            const { error } = await supabase
              .from("carrito")
              .update({ quantity: newQuantity })
              .eq("id", productId);

            if (error) {
              console.log(error);
              message.error("Ocurrió un error, por favor, intente nuevamente");
              setUpdatingItemIndex(null);
              return;
            }
            message.success("Se añadió otro ítem al carrito");
            fetchCarrito()
          } catch (error) {
            console.log(error);
          } finally {
            setRemovingIndividualItem(null);
          }
        }
      } catch (error) {
        console.log(error)
      }

    }
  };

  //Eliminar todos los productos del carrito, ya sea local o en la base de datos si exister sessionId
  const deleteCart = async () => {
    setDeletingCart(true)
    if (sessionId === null) {
      setCart([])
      setDeletingCart(false)
    } else {
      try {
        const response = await supabase
          .from("carrito")
          .delete()
          .eq("userId", sessionId)
        if (response.status === 204) {
          message.success("Carrito Eliminado")
          setCart([])
          setDeletingCart(false)
        } else {
          message.error("Error al eliminar el carrito")
          console.log(response)
        }
      } catch (error) {
        console.log(error)
        message.error("Error al eliminar el carrito")
      } finally {
        setDeletingCart(false)
      }
    }
  }

  const [showModalPurchase, setShowModalPurchase] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleModalPurchase = () => {
    setShowModalPurchase(!showModalPurchase)
  }
  const finallyPurchase = async (values) => {
    const { cart, clientData } = values

    if (sessionId === null) {
      handleModalPurchase()
    } else {
      setPurchasing(true)
      try {
        const response = await axios.post("https://cinnamon-server.vercel.app/send-email", {
        // const response = await axios.post("http://localhost:3001/send-email", {
          cart,
          clientData
        })
        if (response.status === 500) {
          message.error("No pudimos realizar la compra, intenta nuevamente!")
          console.log(response)
        } else {
          message.success("Compra realizada exitosamente!")
          setShowSuccess(true)
          setTimeout(() => {
            deleteCart()
          }, 1500);
        }
      } catch (error) {
        console.log(error)
        message.error("No pudimos realizar la compra, intenta nuevamente!")

      } finally {
        setPurchasing(false)

      }
    }


  }
  return (
    <AppContext.Provider value={{

      login, errorUser,
      register, errorRegister, sending,
      recoverPassword, updatePassword,

      logout, isLogout, retrievingSession, sessionId,
      fetchClientData, fetchingClientData, clientData,
      insertUserData, insertUserDataSuccess, errorInsertingUserData, insertingUserData,
      updateClientData, errorUpdateClient, sucessUpdateClient, updatingCient,
      uploadProduct, insertingProducto, editProduct,
      fetchProducts, fetchingProducts, productsData,
      deleteProduct, removingIndividualItem,
      cart, addToCart, removeFromCart, updateCartItem, fetchingCart, fetchCarrito, updatingItem, removingItem, addingProduct, removeAnItem,
      finallyPurchase, deleteCart, deletingCart, purchasing
    }}>
      {children}
      {showModalPurchase && <FinallyPurchase closeModal={() => setShowModalPurchase(false)} />}
      <Modal
        visible={showSuccess}
        footer={[
          <Button type='primary' onClick={() => setShowSuccess(false)}>
            Cerrar
          </Button>
        ]}
      >
        <Result
          status="success"
          title="¡Muchas gracias por tu compra!"
          subTitle="Recibirás el comprobante de pago en el correo proporcionado. Pronto nos contactaremos contigo para que puedas abonar el total de la compra :)"
        />
      </Modal>

    </AppContext.Provider>
  );
};