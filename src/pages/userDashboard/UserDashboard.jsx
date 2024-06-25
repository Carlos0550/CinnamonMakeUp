import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import "./userDashBoard.css";
import { useAppContext } from '../../context';
import { Flex, Spin, message } from 'antd';
import NewUserForm from '../Home/Forms/FormNewUser/NewUserForm';
import { useNavigate } from 'react-router-dom';

import EditClientData from './Forms/EditClientData';
function UserDashboard() {
  const { fetchingUser, userData, sessionData } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionData) {
      navigate("/user-login");
    } else if (!userData) {
      setShowForm(true);
    }
  }, [fetchingUser, userData, sessionData, navigate]);

  const [isModalActive, setIsModalActive] = useState(false)

  const toggleModal = () =>{
    setIsModalActive(!isModalActive)
  }
  return (
    <>
      {fetchingUser ?
        <div className='cointainer spinner'>
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        </div>
        : ""}

      {showForm && userData === null && <NewUserForm />}
      {userData && userData !== null ?

        <div className='container'>
          <div className='columns is-flex-direction-column'>
            <div className='block'>
              <p className='title is-3'>Mis datos</p>
            </div>
            {userData && userData.map((item, index) => {
              return (
                <div className='column' key={index}>
                  <div className='field '>
                    <div className='box '>
                      <p className='has-text-weight-bold is-size-5' >Nombre completo: {item.nombre} | {item.apellido}</p>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='box'>
                      <p className='has-text-weight-bold is-size-5'>Correo: {item.email}</p>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='box'>
                      <p className='has-text-weight-bold is-size-5'>Teléfono: {item.telefono}</p>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='box'>
                      <p className='has-text-weight-bold is-size-5'>Dirección: {item.direccion}</p>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='box'>
                      <p className='has-text-weight-bold is-size-5'>Ciudad: {item.ciudad}</p>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='box'>
                      <p className='has-text-weight-bold is-size-5'>Provincia: {item.provincia}</p>
                    </div>
                  </div>

                  <div className='control'>
                    <button className='button is-danger has-text-weight-bold is-size-5' onClick={toggleModal}>Editar datos</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        : ""}
        <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content">
          {/* Aquí va el contenido del modal */}
          <div className="box">
            {userData && userData.length !== 0 ?
          <EditClientData toggleModal={toggleModal}/> : ""  }
          </div>
          
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
