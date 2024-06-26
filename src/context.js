import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { supabase } from "./componentes/Auth";
import { message } from "antd";

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

  //Registrar un usuario
  const [errorRegister, setErrorRegister] = useState(false);
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
  const [errorUser, setErrorUser] = useState(false)
  const [sending, setSending] = useState(false);
  const login = async (values) => {
    setSending(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      console.log(error)
      console.log(data)

      if (error) {
        setErrorUser(true)
        setSending(false)
        setTimeout(() => {
          setErrorUser(false)
        }, 2000);
        message.error("El usuario o contraseña no es correcto")
      }
      if (data.user) {
        message.success("Usuario logueado")
        setSending(false)
        console.log(data.user)
        navigate("/user-dashboard")
      }
    } catch (error) {
      message.error("Error interno del servidor, por favor, intente nuevamente")
    } finally {
      setSending(false)
    }

  }
  
  //Obtener la sesion del usuario
  const [retrievingSession, setRetrievingSession] = useState(false)
  const [sessionId, setGetSessionId] = useState(null)
  const retrieveSessionUser = async () => {
    setRetrievingSession(true)
    message.info("Un momento...")
    try {
      const { data, error } = await supabase.auth.getSession()
      if (data) {
        setGetSessionId(data.session.user.id)
        setRetrievingSession(false)
      }
      if (error) {
        message.error("Error al obtener el usuario")
      }
    } catch (error) {

    } finally {
      setRetrievingSession(false)
    }
  }

  //Cerrar sesion
  const [isLogout, setIsLogout] = useState(false)
  const logout = async () => {
    setIsLogout(true)
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        message.error("Error al cerrar la sesión");
      } else {
        message.success("Sesión cerrada exitosamente");
        setClientData([])
        setGetSessionId(null)
      }
    } catch (error) {
      message.error("Error al cerrar la sesión");
    } finally {
      setIsLogout(false)

    }
  };
  //Obtiene los datos del cliente
  const [fetchingClientData, setFetchingClientData] = useState(false)
  const [clientData, setClientData] = useState([])
  const fetchClientData = async() => {
    setFetchingClientData(true)
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select()
        .eq("userUuid",sessionId)

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

    }finally{
      setFetchingClientData(false)
    }
  }

  //Hook para que cuando el usuario entra a la pagina se habilite automaticamente su sesion
  useEffect(() => {
    if (sessionId !== null) {
      navigate("/user-dashboard")
    } else {
      navigate("/user-login")
    }
    console.log("sessionId: ", sessionId)
  }, [sessionId])

  const [insertingUserData, setInsertingUserData] = useState(false)
  const [errorInsertingUserData, seterrorInsertingUserData] = useState(false)
  const [insertUserDataSuccess, setinsertUserDataSuccess] = useState(false)
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
            "ciudad":val.ciudad,
            "provincia": val.provincia,
            "direccion":val.direccion
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

    }finally{
      setInsertingUserData(false)
    }
  }

  const [updatingCient, setUpdatingClient] = useState(false);
  const [errorUpdateClient, setErrorUpdateClient] = useState(false);
  const [sucessUpdateClient,setSucessUpdateClient] = useState(false)
  const updateClientData = async(val) =>{
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
      }else{
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
    }finally{
      setUpdatingClient(false)
    }
  }
  return (
    <AppContext.Provider value={{
      login, errorUser,
      register, errorRegister, sending,
      retrieveSessionUser,
      logout, isLogout, retrievingSession, sessionId,
      fetchClientData, fetchingClientData,clientData,
      insertUserData,insertUserDataSuccess,errorInsertingUserData,insertingUserData,
      updateClientData, errorUpdateClient, sucessUpdateClient, updatingCient
    }}>
      {children}
    </AppContext.Provider>
  );
};