import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import logo from "../img-logo/logo.jpeg"
import { useAppContext } from '../../context';

const menuItem = [
    {
        path: "/",
        name: "Inicio"
    },
    {
        path: "/user-login",
        name: "Mi cuenta"
    },
    {
        path: "/carrito",
        name: "Carrito",
        icon: <FaShoppingCart />
    }
];

function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const { sessionId, retrievingSession, isLogout, logout } = useAppContext();

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <>
            <nav className='navbar navbar-custom-main' role='navigation' aria-label='main navigation'>
                <div className='navbar-brand is-align-items-center '>
                    <div className='image is-128x128'>
                        <img className='is-rounded m-1 p-1' src={logo} alt="Logo" />
                    </div>
                    {!retrievingSession && sessionId && (
                        <div className='navbar-start '>
                            <div className='navbar-item '>
                                {isLogout ? (
                                    <span className='tag is-warning'>Aguarde...</span>
                                ) : (
                                    <button type='button' className='button button-logout is-warning ' onClick={logout}>Cerrar Sesión</button>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        role='button'
                        className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded={isActive ? "true" : "false"}
                        data-target="navbarBasicExample"
                        onClick={toggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>
                <div id='navbarBasicExample' className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className='navbar-start'>
                        {menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className='navbar-item' onClick={closeMenu}>
                                <p className='navbar__item'>{item.name}</p>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
