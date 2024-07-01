import React from 'react';
import 'bulma/css/bulma.min.css';
import { useAppContext } from '../../../context';
import { message, Flex, Spin } from 'antd';
function ProductModal({ product, closeModal }) {
  const { addToCart, sessionId, addingProduct } = useAppContext()
  const handleAddToCart = (nombreProducto, publicUrl, precioProducto) => {
    addToCart({
      nombreProducto,
      precioProducto,
      publicUrl,
      quantity: 1,
      sessionId,

    });
  };
  return (
    <div className={`modal ${product ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card box">
        <header className="modal-card-head">
          <p className="modal-card-title">{product?.nombreProducto}</p>
          {/* <button className="delete" aria-label="close" onClick={closeModal}></button> */}
        </header>
        <section className="modal-card-body box">
          <div className="content label box">
            <figure className="image is-square custom-figure">
              <img src={product?.publicUrl} alt="imagenProducto" className="custom-img" />
            </figure>
            <p className="subtitle has-text-danger mt-5 has-text-weight-bold">Precio: ${product?.precioProducto}</p>
            <p>{product?.descripcionProducto}</p>
            {addingProduct ? <Flex gap="small">
              <Spin />
            </Flex> : <span className='tag is-danger' onClick={() => handleAddToCart(product.nombreProducto, product.publicUrl, product.precioProducto)}>
              <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-info" onClick={closeModal}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}

export default ProductModal;
