import React from 'react'
import { useAppContext } from '../../../context'
function Product({product}) {
    
  return (
    <div className='section'>
        <div className='container'>
            <div className="box">
                <h1 className='title is-size-3'>{product.nombreProducto}</h1>
                <p className='subtitle'>Precio: {product.precioProducto}</p>
                <div className="control">
                    <buton className="button is-primary" onClick={handleAddToCart}>Agregar al carrito</buton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product