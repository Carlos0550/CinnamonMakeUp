import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase} from "../Oauth/server"
import {v4} from "uuid"
import Swal from 'sweetalert2'


export const AppContext = createContext();



export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
};

export const AppContextProvider = ({ children }) => {
    const [category, setCategory] = useState("")
   const [carrito, setCarrito] = useState([])
   const [isLogin, setIsLogin] = useState(null)
   const [isAdding, setIsAdding] = useState(null)
   const [userData, setUserData] = useState(null)
    // eslint-disable-next-line
    useEffect(() => {
        getStock();
        // eslint-disable-next-line
    }, [category]);
    useEffect(()=>{
        retrieveUser()
    },[])
    const agregarCarrito = (producto) =>{
        setCarrito([...carrito, ...producto])
        console.log("Producto añadido al carrito:", producto);
    }
    const numberOfElementsInCarrito = carrito.length
    const eliminarDelCarrito = (index) => {
        const nuevoCarrito = [...carrito];
        nuevoCarrito.splice(index, 1); // Elimina el producto en el índice especificado
        setCarrito(nuevoCarrito); // Actualiza el estado del carrito
        console.log("Producto del carrito eliminado");
    };

    const [stock, setStock] = useState([]);
    const navigate = useNavigate()

    //Peticiones relacionadas con los productos
    let imgUrl;
    let imgPathBucket;
    const addProduct = async (formData, colores) => {
        setIsAdding(true);
        
        const fileName = formData.get("image").name
        const uniqueName = v4(fileName)
        try {
            // Subir la imagen al bucket de Supabase
            const { data, error } = await supabase.storage.from('photosCinnamon').upload(uniqueName, formData.get('image'));
            console.log(data)
            if (error) {
                console.error("Error al subir la imagen al bucket:", error);
                return;
            }

            imgUrl = data.fullPath
            imgPathBucket = `https://tlkoodvdgmresxlexzsj.supabase.co/storage/v1/object/public/${imgUrl}?t=2024-04-29T12%3A58%3A55.727Z`

            console.log("imgUrl: ", imgUrl)
            
    
            const { error: insertError } = await supabase
                .from('productos')
                .insert({
                    name: formData.get('name'),
                    price: formData.get('price'),
                    stock: formData.get('stock'),
                    category: formData.get('category'),
                    cantColores: formData.get('cantColores'),
                    colores: colores,
                    imgUrl: imgPathBucket
                });
    
            if (insertError) {
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
                    title: "No pudimos guardar la imagen, intente nuevamente."
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
                title: "Producto añadido correctamente"
              });
            getStock();
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Error guardando el producto, intente nuevamente"
              });
        } finally {
            setIsAdding(false);
        }
    };
    
    const getStock = async () => {
        try {

            let query = supabase.from('productos').select();
    
            if (category) {
                query = query.eq("category", category);
            }
    
            const { data, error } = await query;
    
            if (error) {
                console.log(error);
            } else {
                setStock(data);
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };  
    
    useEffect(()=>{
        console.log(stock)
    },[stock])
    const fetchProduct = async(productId) =>{
        console.log(productId)
        try {
        const { data, error } = await supabase
        .from('productos')
        .select()
        .eq("id", productId)
        if (error) {
            console.log("Error al obtener el producto: ", error);
        }else{
            agregarCarrito(data)
        }
        } catch (error) {
            
        }
    }

    const updateProduct = async(formData, idEdit) =>{
        setIsAdding(true);
        
        const fileName = formData.get("image").name
        const uniqueName = v4(fileName)
        if (formData.get("image") !== null || formData.get("image") !== undefined) {
            try {
                const { data, error } = await supabase.storage.from('photosCinnamon').upload(uniqueName, formData.get('image'));
                console.log(data)
                if (error) {
                    console.error("Error al subir la imagen al bucket:", error);
                    return;
                }
                imgUrl = data.fullPath
                console.log("ImgUrl: ", imgUrl)
                imgPathBucket = `https://tlkoodvdgmresxlexzsj.supabase.co/storage/v1/object/public/${imgUrl}?t=2024-04-29T12%3A58%3A55.727Z`
                
                const {  } = await supabase
                .from('productos')
                .update({ name: formData.get("name"), stock: formData.get("stock"), price: formData.get("price"), 
                category: formData.get("category"), imgUrl:imgPathBucket })
                .eq('id', idEdit)
                if (error) {
                    throw new Error("No se pudo actualizar los datos")
                }
                Swal.fire({
                    title: "Tarea exitosa",
                    text: "Se actualizo el producto con exito!",
                    icon: "success"
                  });
                  setIsAdding(false)
                getStock()
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const { error } = await supabase
                .from('productos')
                .update({ name: formData.get("name"), stock: formData.get("stock"), price: formData.get("price"), category: formData.get("category") })
                .eq('id', idEdit)
                if (error) {
                    console.log(error)
                }else{
                    getStock()
                    Swal.fire({
                        title: "Tarea exitosa",
                        text: "Se actualizo el producto con exito!",
                        icon: "success"
                      });
                      setIsAdding(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    

    //Peticiones relacionadas con Usuarios
    const LoginUser = async (values)=>{
        
        try {
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password
              })
            console.log(data)
            if (!error) {
              retrieveUser()
            }else{
                Swal.fire({
                    title: "Error al iniciar sesión",
                    text: "Credenciales inválidas",
                    icon: "error"
                  });
                console.log("Credenciaes invalidas: ",error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const retrieveUser = async() => {
        const { data, error } = await supabase.auth.getSession()
        if (!data.session) {
          navigate("/adminLogin")
        }else if(data.session.user.id === "a334c968-0b0b-4902-8979-a57f25757f3e"){
          setIsLogin(true)
          navigate("/controlPanel")
        }else{
          setIsLogin(true)  
          navigate("/userInfo")
          setUserData(data)
        if (error) {
          console.log("Error")
        }
        }
      }
      const [waitingServer, setWaitingServer] = useState(false)

    const createUser = async (registrationValues) =>{
        setWaitingServer(true)
        try {
          const { data, error } = await supabase.auth.signUp(
            {
              email: registrationValues.email,
              password: registrationValues.password,
              
            }
          )
            if (error) {
                alert("El correo introducido ya existe o hubo muchos intentos")
                console.log(error)
            }
             
            
        } catch (error) {
            console.log("Lo sentimos, ha ocurrido un error, consulta la consola de comandos para más informacion")
            console.log("Error interno: ", error)
        }finally{
            setWaitingServer(false)
            Swal.fire({
                title: "Registro exitoso!",
                text: "Verifica tu casilla de correo para confirmar tu cuenta",
                icon: "success"
              });
                navigate('/adminLogin')
        }
      }
    const LogoutUser = async ()=>{
        try {
            const { error } = await supabase.auth.signOut()
            console.log(error)
        } catch (error) {
            console.log(error)
        }
    }
    const [getIdUser, setGetIdUser] = useState(null)
    const getUser = async() =>{
       try {
            const { data: { user } } = await supabase.auth.getUser()
            setGetIdUser(user.id)
       } catch (error) {
            console.log(error)
       }
    }


    const [shopData, setShopData] = useState(null)
    
    const setShopDataUser = async () => {
        console.log("UserID", getIdUser);
        console.log("Carrito", shopData);
        const fechaActual = new Date();
        const year = fechaActual.getFullYear()
        const month = fechaActual.getMonth() + 1
        const day = fechaActual.getDate()
        try {
            if (shopData && shopData.length > 0) {
                const productsArray = []; // Crear un array para almacenar los productos
                
                for (const item of shopData) {
                    const product = {
                        nombre: item.name,
                        price: item.price,
                        cantidad: item.cantidad || "1",
                        fecha: `${day}-${month}-${year}`
                    };
                    
                    productsArray.push(product); // Agregar el producto al array
                }
    
                // Enviar el array de productos al servidor
                const { data, error } = await supabase
                    .from("compras")
                    .insert({ "userID": getIdUser, "products": productsArray })
                    .select();
    
                if (error) {
                    throw error;
                } else {
                    console.log("Datos insertados:", data);
                }
            } else {
                console.log("shopData está vacío o no es un array");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        console.log(shopData);
    
        if (shopData) {
            console.log(shopData);
            setShopDataUser();
        }
    }, [shopData]);

    
    
    return (
        <AppContext.Provider value={{ 
            stock,
            getStock, 
            addProduct, 
            LoginUser,
            createUser,
            LogoutUser, 
            setCategory, 
            fetchProduct,
            numberOfElementsInCarrito,
            eliminarDelCarrito, 
            carrito,
            setCarrito,
            isLogin,
            setIsLogin,
            isAdding,
            updateProduct,
            retrieveUser,
            userData,
            getUser,
            getIdUser,
            setShopData,
            waitingServer
            }}>
            {children}
        </AppContext.Provider>
    );
};
