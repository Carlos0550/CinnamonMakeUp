import React, { useState } from 'react'
import ProductModal from '../../Home/Modals/ProductModal';
import EditProductModal from '../Modals/EditProductModal';
import { useAppContext } from '../../../context';
import { Flex } from 'antd';
function ViewProducts() {
    const { productsData, deleteProduct } = useAppContext()
    const [editProductModalActive, setEditProductModalActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalProductActive, setModalProductActive] = useState(false)

    const deleteProducts = (index) => {
        const productToDelete = productsData[index];
        deleteProduct(productToDelete);
    };

    const toggleEditProductModal = (index) => {
        setSelectedProduct(productsData[index]);
        setEditProductModalActive(!editProductModalActive);
    };

    const toggleProductModal = (item) => {
        setSelectedProduct(item)
        setModalProductActive(!modalProductActive)
    }


    return (
        <>
            <div className="columns is-mobile">
                {productsData.length > 0 ? <>
                    {productsData && productsData.map((item, index) => (
                        <div className="column" key={index}>
                            <div className="card custom-card" >
                                <div className="card-image">
                                    <figure className="image is-square custom-figure" onClick={() => toggleProductModal(item)}>
                                        <img src={item.publicUrl} alt="imagenProducto" className="custom-img" />
                                    </figure>
                                </div>
                                <Flex vertical wrap justify='center' align='flex-start'>
                                    <div className="box">

                                        <p className="title has-text-primary is-size-6">
                                            {item.nombreProducto}
                                        </p>
                                        <p className='title has-text-danger is-size-6'>
                                            ${item.precioProducto}
                                        </p>
                                        <p className='title has-text-black is-size-6'>
                                            Para ver una descripción más detallada haga click en producto
                                        </p>


                                    </div>
                                </Flex>
                                <div className="box custom-box">
                                    <span className='tag is-danger custom-tag m-3' onClick={() => deleteProducts(index)}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </span>

                                    <span className='tag is-info custom-tag m-3' onClick={() => toggleEditProductModal(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 12 18 27t6 31-6 30l-529 528h168l-106 319h-319zm0 0" /></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </> : "No hay productos"}
            </div>

            {editProductModalActive ? <EditProductModal product={selectedProduct} closeModal={toggleEditProductModal} /> : ""}
            {modalProductActive ? <ProductModal product={selectedProduct} closeModal={toggleProductModal} admin={true} /> : ""}
        </>
    )
}

export default ViewProducts