import React, { useEffect } from 'react';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
    const { cart, removeFromCart, updateCartItem,fetchingCart,fetchCarrito } = useAppContext();
    const navigate = useNavigate()
    const handleDeleteProduct = (idx) =>{
        console.log(idx)
        removeFromCart(idx)
    }

    useEffect(()=>{
        fetchCarrito()
    },[navigate])
    return (
        <div className="box p-3">
            {cart.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                fetchingCart ? <p>Aguarde un segundo</p> : <div className='column'>
                <ul className='custom-ul__carrito'>
                    {cart.map((item, index) => (
                        <li key={index} className='custom-li__carrito'>
                            <div className='custom__box-carrito'>
                                <div className="picture__carrito">
                                    <img src={item.publicUrl} alt={item?.product} />
                                </div>
                                <div className='carrito-title-buttons'>
                                    <div className="box">
                                        <p className='subtitle has-text-weight-bold has-text-danger custom-p-carrito'>{item.product}</p>
                                        <div className="box">
                                            <p className='custom-p-carrito-secondary'>${item.precioProducto} c/u</p>
                                            <p className='custom-p-carrito-secondary'>{item.quantity} item</p>
                                        </div>
                                    </div>
                                    <div className='box custom__box-buttons'>
                                        <button className='button is-danger'>
                                            <span onClick={() => handleDeleteProduct(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M4 7l16 0" />
                                                    <path d="M10 11l0 6" />
                                                    <path d="M14 11l0 6" />
                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                </svg>
                                            </span>
                                        </button>
                                        <button className='button is-warning'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-circle-plus">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                                                    <path d="M9 12h6" />
                                                    <path d="M12 9v6" />
                                                </svg>
                                            </span>
                                        </button>
                                        <button className='button is-info'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-minus">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l14 0" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            )}
        </div>
    );
};

export default Carrito;



