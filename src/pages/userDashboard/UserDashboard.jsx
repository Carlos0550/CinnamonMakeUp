import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import "./userDashBoard.css";
import { useAppContext } from '../../context';
import { Flex, Spin, message } from 'antd';
import NewUserForm from '../Home/Forms/FormNewUser/NewUserForm';
import { useNavigate } from 'react-router-dom';

import EditClientData from './Forms/EditClientData';
function UserDashboard() {
  const { fetchingClientData, clientData, sessionId, } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId && sessionId === process.env.REACT_APP_ADMIN_KEY) {
      navigate("/admin-dashboard")
    } else if (clientData.length === 0) {
      setShowForm(true)
    }

    // console.log(clientData)

  }, [clientData, navigate])
  const [isModalActive, setIsModalActive] = useState(false)

  const toggleModal = () => {
    setIsModalActive(!isModalActive)
  }
  return (
    <>
      {fetchingClientData ?
        <div className='cointainer spinner'>
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        </div>
        : !fetchingClientData && clientData && clientData.length !== 0 ?


          <div className='container'>
            <div className='columns is-flex-direction-column'>
              <div className='block'>
                <p className='title is-3'>Mis datos</p>
              </div>
              {clientData && clientData.map((item, index) => {
                return (
                  <div className='column' key={index}>
                    <div className='field '>
                      <div className='box '>
                        <p className='has-text-weight-bold is-size-5' >Nombre completo: {item.nombre} | {item.apellido}</p>
                      </div>
                    </div>
  
                    <div className='field'>
                      <div className='box custom-box-user'>
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

      {showForm && clientData.length === 0 && <NewUserForm />}
      

      {!fetchingClientData && <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-content">
          <div className="box">
            {clientData && clientData.length !== 0 ?
              <EditClientData toggleModal={toggleModal} /> : ""}
          </div>

        </div>
      </div>}

    </>
  );
}

export default UserDashboard;
