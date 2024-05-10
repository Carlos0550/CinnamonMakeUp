import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/sidebar.css";
import logo from "./logoCinnamon.jpg"

import { useAppContext } from '../context/context';
import { supabase } from '../Oauth/server';

import Swal from 'sweetalert2'



const Sidebar = ({ children }) => {
    const { setCategory, numberOfElementsInCarrito, isLogin, setIsLogin } = useAppContext()
    const [selectedOption, setSelectedOption] = useState("")
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate()


    const handleCategory = (e)=>{
        setSelectedOption(e.target.value)
        const value = e.target.value;
        if (value==="all") {
            setCategory("")
        }else{
            setCategory(value);
        }
        console.log(value)
    }

    const handleLoginOrLogOut = async() =>{
        if (isLogin === true) {
            try {
                const { error } = await supabase.auth.signOut()
                if (error) {
                    throw error
                }else{
                    setIsLogin(false)
                    Swal.fire({
                        title: "Exito",
                        text: "Cerraste la sesion correctamente",
                        icon: "success"
                      });
                }
                window.location.reload()
                
            } catch (error) {
                console.log(error)
            }
        }else{
            navigate("/adminLogin")
            
        }
    }
    
    const closeMenu = () =>{
        document.getElementById("menu_hamburguesa").checked = false
    }

    const menuItem = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/adminLogin",
            name: "Mi usuario",
        },
        {
            path: "/cart",
            name: "Carrito",
            CantElements: `${numberOfElementsInCarrito}`,
        }
    ];

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Cambia 768 por el ancho deseado para considerar como "móvil"
      };
  
      handleResize(); // Llamada inicial para establecer el estado inicial
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



      return (
        <div>
      <header className='header'>
      <nav className='navbar'>
          <div className='left-section'>
              <img src={logo} alt="logo" className="logo_navbar" />
                <button onClick={handleLoginOrLogOut} className="btn__login" >
                    {isLogin ? "Cerrar Sesión" : "Iniciar Sesión"}
                </button>
          </div>
            <select
                name="categorias"
                className="filters"
                style={{
                    border: "3px solid white",
                    color: "white",
                }}
                value={selectedOption}
                onChange={handleCategory}>
                    <option value="all">Filtrar</option>
                    <option value="labiales">Labiales</option>
                    <option value="bases">Bases</option>
                    <option value="rimels">Rimels</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="promos">Promociones</option>
                    <option value="sombras">Sombras</option>
                </select>
          <label htmlFor="menu_hamburguesa" className='label_hamburguesa'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="list_icon" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
          </label>
          <input type={isMobile ? 'checkbox' : 'hidden'} className='menu_hamburguesa' id="menu_hamburguesa" />
          <ul className='ul_links'>
          
              {menuItem.map((item, index)=>{
                return(
                  <NavLink to={item.path} key={index} onClick={closeMenu}>
                      <li className='li_links'>
                        <p className='link'>{item.name}</p>
                      </li>
                      
                  </NavLink>
                )
              })}
          </ul>
      </nav>
      <main>{children}</main>
      </header>
      
    </div>
    );
};

export default Sidebar;
