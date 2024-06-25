import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import "./userDashBoard.css";
import { useAppContext } from '../../context';
import { Flex, Spin, message } from 'antd';
import NewUserForm from '../Home/Forms/FormNewUser/NewUserForm';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { fetchingUser, userData, sessionData} = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionData) {
      navigate("/user-login");
    } else if (!userData) {
      setShowForm(true);
    }
  }, [fetchingUser, userData, sessionData, navigate]);

 

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
      {console.log(userData)}
    </>
  );
}

export default UserDashboard;
