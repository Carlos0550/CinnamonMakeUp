import React, { Children, useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { Flex, Spin, Pagination, message, Collapse } from 'antd';
import ProductModal from './Modals/ProductModal';
import Carrito from './Carrito/Carrito';
function Home() {
    const { fetchProducts, fetchingProducts, productsData } = useAppContext();
    const navigate = useNavigate();
    const [modalProductActive, setModalProductActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(null)
    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Puedes ajustar este número según lo necesites

    useEffect(() => {
        fetchProducts();
    }, [navigate]);

    const toggleProductModal = (product,idx) => {
        setSelectedProduct(product);
        setSelectedIdx(idx)
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

    function acortarTexto(texto,limite) {
            if (texto.length > limite) {
                return texto.substring(0, limite - 3) + "..."
            }else{
                return texto
            }
    }
    
    const items = [
        {
          key: "1",
          label: "¿Cómo comprar? Tips y ayuda",
          children: (
            <ul>
              <li>
                - Para cargar productos al carrito, puedes apretar en cualquier producto, deslizar hacia abajo y apretar en <strong className='has-text-black'>Añadir al carrito</strong>, Si existen tonalidades del producto vas a poder ver y seleccionar los tonos o colores que esten disponibles
              </li>
              <li>
                - Una vez termines de cargar tus productos, podras ver tu carrito haciendo click en los <strong className='has-text-black'>3 palitos de la esquina superior > Mi carrito</strong> en el que podras ver todos los items cargados.

            </li>
            <li>
                - No es necesario contar con efectivo o tarjeta a la hora de hacer una compra, puesto que al presionar en finalizar una compra dependiendo de si tienes una cuenta Cinnamon o no se te mostrará un formulario para rellenar tus datos de envio y se te enviará un comprobante de pago al correo introducido.
            </li>
            <li>
              - Rellenar tus datos cada vez que hagas una compra puede ser un poco lento, asi que puedes evitar esto creando una cuenta Cinnamon, la misma la puedes crear apretando en los <strong className='has-text-black'>3 palillos en la esquina superior > Mi cuenta > Crear Cuenta.</strong>
            </li>
            </ul>
          ),
        },
      ];
    return (

        <>
        <Collapse items={items} />
            <div className="columns is-mobile">
                {fetchingProducts ? (
                    <div className='container spinner'>
                        <Flex align="center" gap="middle">
                            <Spin size="large" />
                        </Flex>
                    </div>
                ) : (
                    <>
                    
                        {productsData.length > 0 ? (
                            currentProducts && currentProducts.map((item, index) => (
                                <div className='column' key={index}>
                                    <div className="card custom-card" onClick={() => toggleProductModal(item, index)}>
                                        <div className='card-image'>
                                            <figure className="image is-square custom-figure">
                                                <img src={item.publicUrl} alt="imagenProducto" className="custom-img" />
                                            </figure>
                                        </div>
                                        <div className='box'>
                                            <p className="title has-text-primary custom-title-home">{acortarTexto(item.nombreProducto, 45)}
                                                <hr />
                                            </p>
                                            <p className='subtitle has-text-danger mt-5 has-text-weight-bold'>${item.precioProducto} c/u</p>
    
                                        </div>
                                    </div>
                                </div>
                            ))
                        ):(
                            <div className="columns">
                                <div className="column">
                                    <div className="box">
                                        <h1 className='title has-text-centered has-text-danger'>Estamos agregando cosas bonitas para ti :)</h1>
                                    </div>
                                </div>
                            </div>
                        )}
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
            {modalProductActive && <ProductModal product={selectedProduct} productIdx={selectedIdx} closeModal={toggleProductModal} />}
        </>
    );
}

export default Home;
