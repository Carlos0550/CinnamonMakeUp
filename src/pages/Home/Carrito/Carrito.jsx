import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { Spin, Flex, message } from 'antd';

const Carrito = () => {
    const { cart, removeFromCart, updateCartItem, fetchingCart, updatingItem, removingItem, removeAnItem, disableMinusButton, clientData, finallyPurchase, deleteCart, deletingCart, removingIndividualItem, purchasing } = useAppContext();
    const navigate = useNavigate();
    const messageShownRef = useRef(false);

    const handleDeleteProduct = (idx, productId) => {
        removeFromCart(idx, productId);
    };

    const handleAddMoreItems = (idx, productId) => {
        updateCartItem(idx, productId);
    };

    const handleRemoveAnItem = (productIndex, productId) => {
        removeAnItem(productIndex, productId);
    };

    function acortarTexto(texto, limite) {
        if (cart && texto && texto.length > limite) {
            return texto.substring(0, limite - 3) + "...";
        } else {
            return texto;
        }
    }

    const handleFinallyPurchase = async () => {
        await finallyPurchase({
            cart,
            clientData
        });
    };

    const handleDeleteCart = () => {
        deleteCart();
    };

    function separarTonos(entrada) {
        // console.log("entrada: ", entrada);
    
        // Si la entrada es un array, conviértela a una cadena uniendo sus elementos con un espacio
        if (Array.isArray(entrada)) {
            entrada = entrada.join(' ');
        }
    
        // Verifica si la entrada es ahora una cadena
        if (!entrada || typeof entrada !== 'string') return '';
    
        // // Expresión regular para capturar una amplia variedad de descripciones
        // // const tonos = entrada.match(/(Tono|tono|magico|transparente|mate|satinado|brillante|metalizado|Base|corrector|labial|sombras|Código|Ref\.|ID)\s*\d*|(?:\b(magico|transparente|mate|satinado|brillante|metalizado)\b)/gi);
    
        // // // Si se encuentra algún término relevante, únelos con comas
        // // if (tonos && tonos.length > 0) {
        // //     return tonos.join(', ');
        // // }
    
        // Si no se encuentran términos relevantes, devolver la entrada original sin corchetes ni comillas si no es "[]"
        if (entrada === "[]") {
            return "";
        } else {
            // Eliminar corchetes y comillas de la cadena original
            return entrada.replace(/[\[\]"]/g, '');
        }
    }
    
    

    

    useEffect(()=>{
        
        // console.log(cart)
        // cart.map(item =>{
        //     console.log("Tonos: ", item.tonos)
        // })
    },[cart])
    return (
        <>
            {fetchingCart ? (
                <Flex align="center" gap="middle">
                    <Spin size="large" />
                </Flex>
            ) : (
                <div className="p-3">
                    {cart.length === 0 ? (
                        <div className="box" style={{minHeight: "100vw"}}>
                            <p className='subtitle has-text-danger has-text-centered'>No hay productos en el carrito</p>
                        </div>
                    ) : (
                        <ul className='custom-ul__carrito'>
                            { cart.map((item, index) => (
                                <li key={index} className='custom-li__carrito'>
                                    <div className='custom__box-carrito'>
                                        <div className="picture__carrito">
                                            <img src={item.publicUrl ||item.productInfo.publicUrl } alt={item.nombreProducto || item.productInfo.nombreProducto} />
                                        </div>
                                        <div className='carrito-title-buttons'>
                                            <div className="">
                                                <p className='subtitle has-text-weight-bold has-text-danger custom-p-carrito'>{acortarTexto(item.nombreProducto || item.productInfo.nombreProducto, 25)}</p>
                                                <div className="">
                                                    <p className='custom-p-carrito-secondary has-text-weight-bold'>${item.precioProducto || item.productInfo.precioProducto} c/u</p>
                                                    <p className='custom-p-carrito-secondary'>{item.quantity || item.productInfo.quantity} {item.quantity || item.productInfo.quantity > 1 ? "items" : "item"}</p>
                                                    <p>{separarTonos(item ?.tonos || item.tones)}</p>
                                                </div>
                                            </div>
                                            <div className='custom__box-buttons'>
                                                <button className='button is-danger' onClick={() => handleDeleteProduct(index, item.id || item.productInfo.quantity)} disabled={removingItem === index}>
                                                    <span>
                                                        {removingItem === index ? (
                                                            <Flex gap="small">
                                                                <Spin />
                                                            </Flex>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M4 7l16 0" />
                                                                <path d="M10 11l0 6" />
                                                                <path d="M14 11l0 6" />
                                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </button>
                                                <button className='button is-warning' onClick={() => handleAddMoreItems(index, item.id || item.productInfo.id)} disabled={updatingItem === index}>
                                                    <span>
                                                        {updatingItem === index ? (
                                                            <Flex gap="small">
                                                                <Spin />
                                                            </Flex>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-circle-plus">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M9 12h6" />
                                                                <path d="M12 9v6" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </button>
                                                <button className='button is-info' onClick={() => handleRemoveAnItem(index, item.id || item.productInfo.id)} disabled={disableMinusButton}>
                                                    <span>
                                                        {removingIndividualItem === index ? (
                                                            <Flex gap="small">
                                                                <Spin />
                                                            </Flex>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-minus">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                            <path d="M5 12l14 0" />
                                                        </svg>
                                                        )}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {cart.length > 0 && (
                        <div className="box custom-box-payments">
                            {!purchasing && <button className='button is-success' onClick={handleFinallyPurchase}>Terminar compra</button>}
                            {purchasing && <span className='tag is-warning'>Aguarde un segundo...</span>}
                            {!purchasing && <button className='button is-danger' onClick={handleDeleteCart} disabled={deletingCart}>
                                {deletingCart ? <Flex gap="small"><Spin /></Flex> : "Eliminar Todo"}
                            </button>}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Carrito;
