import React, { useEffect } from 'react';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { Spin, Flex } from 'antd';
const Carrito = () => {
    const { cart, removeFromCart, updateCartItem, fetchingCart, fetchCarrito, updatingItem, removingItem } = useAppContext();
    const navigate = useNavigate()
    const handleDeleteProduct = (idx, productId) => {
        console.log(productId)
        removeFromCart(idx, productId)
    }

    const handleAddMoreItems = (idx, productId) => {
        updateCartItem(idx, productId)
    }

    useEffect(() => {
        fetchCarrito()
    }, [navigate])
    return (
        <div className=" p-3">
            {cart.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                <ul className='custom-ul__carrito'>
                    {cart.map((item, index) => (
                        <li key={index} className='custom-li__carrito'>
                            <div className='custom__box-carrito'>
                                <div className="picture__carrito">
                                    <img src={item.publicUrl} alt={item?.product} />
                                </div>
                                <div className='carrito-title-buttons'>
                                    <div className="">
                                        <p className='subtitle has-text-weight-bold has-text-danger custom-p-carrito'>{item.nombreProducto}</p>
                                        <div className="">
                                            <p className='custom-p-carrito-secondary has-text-weight-bold'>${item.precioProducto} c/u</p>
                                            <p className='custom-p-carrito-secondary'>{item.quantity} {item.quantity > 1 ? "items" : "item"}</p>
                                        </div>
                                    </div>
                                    <div className=' custom__box-buttons'>
                                        <button className='button is-danger' onClick={() => handleDeleteProduct(index, item.id)} disabled={removingItem === index}>
                                            <span >
                                                {removingItem === index ? <Flex gap="small">
                                                    <Spin />
                                                </Flex>
                                                    :

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4 7l16 0" />
                                                        <path d="M10 11l0 6" />
                                                        <path d="M14 11l0 6" />
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                    </svg>
                                                }
                                            </span>
                                        </button>
                                        <button className='button is-warning' onClick={() => handleAddMoreItems(index, item.id)} disabled={updatingItem === index}>
                                            <span >
                                                {updatingItem === index ?
                                                    <Flex gap="small">
                                                        <Spin />
                                                    </Flex>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-circle-plus">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M9 12h6" />
                                                        <path d="M12 9v6" />
                                                    </svg>
                                                }
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

            )}
        </div>
    );
};

export default Carrito;



