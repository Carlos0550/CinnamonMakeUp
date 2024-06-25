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
        fetchSession()

        navigate("/user-dashboard")

        setSending(false)
      }
    } catch (error) {
      message.error("Error interno del servidor, por favor, intente nuevamente")
    } finally {
      setSending(false)
    }

  }

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

  const [retrieveSession, setRetrieveSession] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [userMail, setUserMail] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      setRetrieveSession(true);
      message.info("Aguarde un segundo...");
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        if (data.session !== null) {
          setSessionData(data.session);
          setUserMail(data.session.user.email);
        }
      } catch (error) {
        message.error("Error al iniciar sesion automaticamente");
      } finally {
        setRetrieveSession(false);
      }
    };

    fetchSession();
  }, []);
  const fetchSession = async () => {
    setRetrieveSession(true);
    message.info("Aguarde un segundo...");
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (data.session !== null) {
        setSessionData(data.session);
        setUserMail(data.session.user.email);
      }
    } catch (error) {
      message.error("Error al iniciar sesion automaticamente");
    } finally {
      setRetrieveSession(false);
    }
  };

  const [isLogout, setIsLogout] = useState(false)
  const logout = async () => {
    setIsLogout(true)
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        message.error("Error al cerrar la sesión");
      } else {
        setSessionData(null);
        setUserMail(null);
        setIsLogout(false)
        message.success("Sesión cerrada exitosamente");
      }
    } catch (error) {
      message.error("Error al cerrar la sesión");
    }finally{
      setIsLogout(false)

    }
  };
  const [fetchingUser, setFetchingUser] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      setFetchingUser(true)

      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select()
          .eq("email", userMail)

          console.log(data)

        if (error) {
          message.error("Hubo un problema, recargue la pagina e intente nuevamente")
        }
        if (data.length > 0) {
          setFetchingUser(false)
          setUserData(data)
        } else {
          setUserData(null)
          setFetchingUser(false)

        }
      } catch (error) {
        message.error("Hubo un problema, recargue la pagina e intente nuevamente")
      } finally {
        setFetchingUser(false)

      }
    }
    fetchUserData()

  }, [sessionData])

  const fetchUserData = async () => {
    setFetchingUser(true)

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select()
        .eq("email", userMail)

      if (error) {
        message.error("Hubo un problema, recargue la pagina e intente nuevamente")
      }

      if (data.length > 0) {
        setFetchingUser(false)
        setUserData(data)
      } else {
        setUserData(null)
        setFetchingUser(false)

      }
    } catch (error) {
      message.error("Hubo un problema, recargue la pagina e intente nuevamente")
    } finally {
      setFetchingUser(false)

    }
  }
  


  const [insertingUserData, setInsertingUserData] = useState(false)
  const [errorInsertingUserData, seterrorInsertingUserData] = useState(false)
  const [insertUserDataSuccess, setinsertUserDataSuccess] = useState(false)
  const insertUserData = async (val) => {
    setInsertingUserData(true)
    try {
      const { error } = await supabase
        .from('usuarios')
        .insert({ 
            "userId": val.uuid,
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
        fetchUserData()
    } catch (error) {
      message.error("Ups, No se pudo enviar sus datos, por favor intente nuevamente")

    }finally{
      setInsertingUserData(false)
    }
  }

  
  return (
    <AppContext.Provider value={{
      login, errorUser,
      register, errorRegister, sending,
      retrieveSession, sessionData,fetchSession,
      fetchingUser, userData,
      logout,isLogout,
      insertUserData,insertUserDataSuccess,errorInsertingUserData,insertingUserData
    }}>
      {children}
    </AppContext.Provider>
  );
};