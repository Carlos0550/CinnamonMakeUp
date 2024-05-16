import React, {  useState } from 'react';
import { useAppContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Oauth/server';
import "./css/home.css"
import { FaInstagram, FaGithub,FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import Swal from 'sweetalert2'
import Whatsapp from '../components/Whatsapp';




function Home() {
    const { stock, fetchProduct } = useAppContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15); // Número de productos por página
    const navigate = useNavigate();
    const [adding, setAdding] = useState(null); 
    const handleLinkGit = () => {
        window.location.href = "https://github.com/Carlos0550"
      }
      const handleLinkIg = () =>{
        window.location.href = "https://www.instagram.com/carlos._ok/"
      }
      const handleLinkGmail = () =>{
        window.location.href = "mailto:carlospelinski03@gmail.com"
      }
      const handleLinkWhatsapp = () =>{
        window.location.href = "https://wa.me/3765223959"
      }

    // Calcula el índice inicial y final de los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = stock.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcula el número total de páginas
    const totalPages = Math.ceil(stock.length / productsPerPage);

    // Cambia a la página siguiente
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Cambia a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Cambia a una página específica
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductId = async(e) =>{
        setAdding(true);
        try {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                const idProduct = e.target.value;
                fetchProduct(idProduct);
            } else {
                navigate("/adminLogin");
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setAdding(false);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-start",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Producto añadido al carrito"
                  });
            
            }, 500);
        } 
    };
    
    return (
        <>
            <main className="main">
                <aside className="aside">
                    <ol>
                        <li><div><h3 style={{fontSize:"40px", textDecoration:"underline"}}><center>Cómo comprar</center></h3></div></li>
                        <ol className='ol__aside'>
                            <li >
                                <div>
                                    <h3 className='text__aside'>Para comprar primero debes registrarte, encontraras el formulario de registro en la seccion <strong>Mi Usuario</strong>, luego de introducir tu correo y contraseña, te llegará un correo a tu gmail el cual deberás seguir los pasos que dice ese correo para activar tu cuenta,por ultimo, lo único que tienes que hacer es agregar los productos que quieras en el carrito.</h3>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <h3 style={{marginBottom:".3em"}} className='text__aside'>Para finalizar la compra, no te olvides de agregar tus datos de envios, el cual los mismos se encuentran en la sección <strong>Mi usuario</strong> </h3>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <h3 style={{marginBottom:".3em"}} className='text__aside'>Cuando termines, recibiremos un correo con tus datos y la información de tus productos, el cual nos pondremos en contacto contigo para abonar el total de la compra.</h3>
                                </div>
                            </li>
                        </ol>
                    </ol>
                </aside>
                <section className='section__personalizado'>
                        <div className='conteiner__product'>
                        {currentProducts.map((producto, index) => (
                                <div className='product__card' key={producto.id}>
                                    <h2 className='product__name'>{producto.name}</h2>
                                    <img src={producto.imgUrl} alt="imagenProducto" className='product__img'/>
                                    <p className='product__p'>$ {producto.price}</p>
                                    <p className='product__p'>Stock: {producto.stock}</p>
                                    <p className='product__p'>Colores/Tonos: {producto.cantColores || "1"}</p>
                                    <p className='product__p'>Tonos: {producto.colores || "/"}</p>
                                    <button value={producto.id} onClick={handleProductId} className='producto__btn' disabled = {adding ? true : false}>{adding ? "Añadiendo un producto" : "Añadir al carrito"}</button>
                                </div>
                        ))}
                        </div>
                    {/* Controles de navegación */}
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1} className='pagination__btn'>Anterior</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i + 1} onClick={() => goToPage(i + 1)} className='page__number'>{i + 1}</button>
                        ))}
                        <button onClick={nextPage} disabled={currentPage === totalPages} className='pagination__btn'>Siguiente</button>
                    </div>
                </section>
                <section className='section__personalizado'>
                    <h2>Envios a todo el país</h2>
                    <ol className='ol__aside'>
                        <li className='li__aside' style={{marginLeft: "2em"}}><p>El precio del envio se debe coordinar por whatsapp, el precio varía dependiendo de la ubicación</p></li>
                    </ol>
                </section>

            </main>
            <Whatsapp></Whatsapp>

            <footer className='footer'>

                <p>Created By Pelinski Carlos</p>
                <FaInstagram style={{width:"30px", height:"auto", cursor:"pointer", marginLeft:".3em"}} onClick={handleLinkIg}/>
                <FaGithub style={{width:"30px", height:"auto", cursor:"pointer", marginLeft:".3em"}} onClick={handleLinkGit}/>
                <CgMail style={{width:"30px", height:"auto", cursor:"pointer", marginLeft:".3em"}} onClick={handleLinkGmail}/>
                <FaWhatsapp style={{width:"30px", height:"auto", cursor:"pointer", marginLeft:".3em"}} onClick={handleLinkWhatsapp}/>
            </footer>
        </>
    );
}


export default Home;