import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { Flex, Spin, Pagination, message } from 'antd';
import ProductModal from './Modals/ProductModal';
import Carrito from './Carrito/Carrito';
function Home() {
  const { fetchProducts, fetchingProducts, productsData } = useAppContext();
  const navigate = useNavigate();
  const [modalProductActive, setModalProductActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Puedes ajustar este número según lo necesites

  useEffect(() => {
    fetchProducts();
  }, [navigate]);

  const toggleProductModal = (product = null) => {
    setSelectedProduct(product);
    setModalProductActive(!modalProductActive);
  };

  // Calcular los productos mostrados en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


 

  return (
    
    <>
            <div className="columns is-mobile">
                {fetchingProducts ? (
                    <div className='container spinner'>
                        <Flex align="center" gap="middle">
                            <Spin size="large" />
                        </Flex>
                    </div>
                ) : (
                    <>
                        {currentProducts && currentProducts.map((item, index) => (
                            <div className='column' key={index}>
                                <div className="card custom-card" onClick={() => toggleProductModal(item)}>
                                    <div className='card-image'>
                                        <figure className="image is-square custom-figure">
                                            <img src={item.publicUrl} alt="imagenProducto" className="custom-img" />
                                        </figure>
                                    </div>
                                    <div className='box'>
                                        <p className="title has-text-primary is-size-5">{item.nombreProducto}
                                            <hr />
                                        </p>
                                        <p className='subtitle has-text-danger mt-5 has-text-weight-bold'>${item.precioProducto} c/u</p>
                                        <hr />
                                        {item?.tonosProducto ? <p>Tonos: {item?.tonosProducto}</p> : ""}
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="box pagination-box">
                <Pagination
                    current={currentPage}
                    total={productsData.length}
                    pageSize={productsPerPage}
                    onChange={handlePageChange}
                />
            </div>
            {modalProductActive && <ProductModal product={selectedProduct} closeModal={toggleProductModal} />}
        </>
  );
}

export default Home;
