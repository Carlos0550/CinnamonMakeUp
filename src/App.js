// App.js

import React from 'react';
import './App.css';
import Navbar from './componentes/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Forms/Login/Login';
import Register from './pages/Forms/Register/Register';
import UserDashboard from './pages/userDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashBoard/AdminDashboard';
import Carrito from './pages/Home/Carrito/Carrito';
import RecoverPassword from './pages/Forms/recoverPassword/RecoverPassword';
import UpdatePassword from './pages/Forms/updatePassword/UpdatePassword';
function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/carrito' element={<Carrito/>}></Route>
        <Route path='/recovery-password' element={<RecoverPassword/>}/>
        <Route path="/update-password" element={<UpdatePassword/>} />

      </Routes>
    </>
  );
}

export default App;
