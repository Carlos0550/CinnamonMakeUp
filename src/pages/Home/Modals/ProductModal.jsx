import React from 'react';
import 'bulma/css/bulma.min.css';

function ProductModal({ product, closeModal }) {
  return (
    <div className={`modal ${product ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{product?.nombreProducto}</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <figure className="image is-square">
              <img src={product?.publicUrl} alt="Product" />
            </figure>
            <p className="subtitle has-text-primary">Precio: ${product?.precioProducto}</p>
            <p>{product?.descripcion}</p> {/* Asegúrate de tener una descripción en tus datos del producto */}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Guardar cambios</button>
          <button className="button" onClick={closeModal}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}

export default ProductModal;
