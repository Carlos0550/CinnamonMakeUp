import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/SideBar'
import "./App.css"
import Home from './pages/Home'
import Login from './pages/LoginAdmin'
import AdminControlPanel from './adminComponents/AdminControlPanel'
import Carrito from './pages/Carrito'
import UserInfo from './pages/UserInfo'


function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/adminLogin' element={<Login></Login>}></Route>
          <Route path='/controlPanel' element={<AdminControlPanel></AdminControlPanel>}></Route>
          <Route path='/cart' element={<Carrito></Carrito>}></Route>
          <Route path='/userInfo' element={<UserInfo></UserInfo>}></Route>
        
        </Routes>
      </Sidebar>
    </>
  )
}

export default App
