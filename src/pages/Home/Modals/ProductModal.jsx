import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useAppContext } from '../../../context';
import { message, Flex, Spin, Modal, Button } from 'antd';
import CarritoSVG from '../../../componentes/SVGs/Carrito';
function ProductModal({ product, closeModal, admin }) {
  const { addToCart, sessionId, addingProduct } = useAppContext();
  const [productInfo, setProductInfo] = useState(null);

  const [desestrTonos, setDesestrTonos] = useState([]);
  const [arrayTonos, setArrayTonos] = useState([]);

  const [selectedTone, setSelectedTone] = useState([])

  const handlePushTones = (keyTone, tone) => {
    setSelectedTone(prevSelectedTone =>{
      const isSelected = prevSelectedTone.some(item => item.key === keyTone)
      if (isSelected) {
        return prevSelectedTone.filter(item => item.key !== keyTone)
      }else{
        return [...selectedTone, { key: keyTone, tone }]
      }
    })
  }

  // useEffect(() => {
  //   console.log("Tonos seleccionados: ", selectedTone)
  // }, [selectedTone])

  useEffect(() => {
    if (product.tonosProducto) {
      setArrayTonos(product.tonosProducto);
    }
  }, [product]);

  useEffect(() => {
    if (Array.isArray(arrayTonos)) {
      setDesestrTonos(arrayTonos);
    } else if (typeof arrayTonos === 'string') {
      const tonosArray = arrayTonos.split(',').map(tone => tone.trim());
      setDesestrTonos(tonosArray);
    }
  }, [arrayTonos]);

  const handleAddToCart = () => {
    setProductInfo(product);
  };
  
  const [tones, setTones] = useState([]);

  const saveCarrito = async () => {
    const hiddenMessage = message.loading("Añadiendo...", 0);
  
    if (selectedTone.length > 0) {
      const newTones = selectedTone.map(el => el.tone);
      setTones(newTones);
  
      await addToCart({
        productInfo,
        tones: newTones,
        quantity: 1,
        sessionId,
      });
  
      hiddenMessage();
      setProductInfo(null);
    } else {
      await addToCart({
        productInfo,
        tones: [],
        quantity: 1,
        sessionId,
      });
  
      hiddenMessage();
      setProductInfo(null);
    }
  };

  useEffect(() => {
    if (productInfo !== null) {
      saveCarrito();
    }
  }, [productInfo]);


  const formatDescriptionToList = (description) => {
    if (!description) return [];

    // Esta expresión considera que los delimitadores `-` y `_` son seguidos o precedidos por espacios opcionales
    const regex = /(-[^-]+-|_[^_]+_|[^-_]+)/g;

    // Dividir el texto en fragmentos
    const items = description.match(regex) || [];

    // Mapear los fragmentos y determinar el tipo
    return items.map(item => {
      const trimmedItem = item.trim();

      if (trimmedItem.startsWith('-') && trimmedItem.endsWith('-')) {
        return { type: 'subtitle', content: trimmedItem.slice(1, -1).trim() };
      } else if (trimmedItem.startsWith('_') && trimmedItem.endsWith('_')) {
        return { type: 'list', content: trimmedItem.slice(1, -1).trim() };
      } else {
        return { type: 'unknown', content: trimmedItem.trim() }; // Para casos no esperados

      }
    });
  };

  const formattedDescription = formatDescriptionToList(product?.descripcionProducto);

  const RenderFormattedDescription = ({ formattedDescription }) => (

    <>
      {formattedDescription.map((item, index) => (
        item.type === 'subtitle' ?
          <h5 className='has-text-black is-size-5' key={`subtitle-${index}`}>{item.content}</h5>
          : item.type === 'list' ?
            <ul key={`list-${index}`}>
              <li>{item.content}</li>
            </ul>
            : <p key={`unknown-${index}`}>{item.content}</p>
      ))}
    </>
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", getWidth)
    getWidth()

    return () => {
      window.removeEventListener("resize", getWidth)
    }
  }, [])

  return (
    <Modal
      title=""
      visible={true}
      closeIcon={false}
      width={screenWidth}
      footer={[
        <Button type='primary' danger onClick={closeModal}>Volver atras</Button>
      ]}
    >

      <section className="modal-card-body ">

        <div className="content label box is-background-white">
          <p className="title is-size-3">{product?.nombreProducto}</p>

          <figure className="image is-square custom-figure" style={{ maxWidth: "450px", height: "auto" }}>
            <img src={product?.publicUrl} alt="imagenProducto" className="custom-img" />
          </figure>
          <p className="subtitle has-text-danger mt-5 has-text-weight-bold is-size-4">${product?.precioProducto} C/U</p>

          <div className='encabezadoProducto m-3'>
            <h4 className='has-text-danger'>{product.encabezadoDescripcionProducto}</h4>
          </div>
          <div className='descripcionProducto m-3'>
            <RenderFormattedDescription formattedDescription={formattedDescription} />

          </div>
          <Flex gap="middle" vertical justify='flex-start' align='flex-start'>

            <Flex wrap gap={"middle"}>
            {desestrTonos && desestrTonos.length > 0 ? (
              <>
                {desestrTonos.map((tone, index) => {
                  const isSelected = selectedTone.some(item => item.key === index);
                  return (
                    <Button
                      type={isSelected ? 'primary' : 'default'}
                      onClick={() => handlePushTones(index, tone)}
                      key={index}
                    >
                      {tone}
                    </Button>
                  );
                })}
              </>
            ) : (
              ""
            )}
            </Flex>

            {addingProduct ? (
              <Flex gap="small">
                <Spin />
              </Flex>
            ) : (
              admin ? "" : <span style={{ maxWidth: "200px" }} className='tag is-danger' onClick={handleAddToCart}>Añadir al carrito
                <CarritoSVG />
              </span>
            )}
          </Flex>
        </div>
      </section>
    </Modal>
  );
}

export default ProductModal;
// product.nombreProducto, product.publicUrl, product.precioProducto, product.productId