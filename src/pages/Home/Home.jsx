import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import ProductModal from './Modals/ProductModal';

function Home() {
  const { fetchProducts, productsData } = useAppContext();
  const navigate = useNavigate();
  const [modalProductActive, setModalProductActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [navigate]);

  const toggleProductModal = (product) => {
    setSelectedProduct(product);
    setModalProductActive(!modalProductActive);
  };

  return (
    <>
      <div className="columns is-mobile">
        {productsData && productsData.map((item, index) => (
          <div className="column" key={index}>
            <div className="card custom-card" onClick={() => toggleProductModal(item)}>
              <div className="card-image">
                <figure className="image is-square">
                  <img src={item.publicUrl} alt="imagenProducto" className="img-producto" />
                </figure>
              </div>
              <div className="box">
                <p className="title has-text-primary is-size-5">
                  {item.nombreProducto}
                  <hr />
                </p>
                <p className="subtitle has-text-danger mt-5 has-text-weight-bold">${item.precioProducto} c/u</p>
                <hr />
                <span className="tag is-danger">
                  <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalProductActive && (
        <ProductModal product={selectedProduct} closeModal={toggleProductModal} />
      )}
    </>
  );
}

export default Home;
