import React,{useEffect} from 'react'
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  // const {adminLogged, sessionData} = useAppContext()
  // useEffect(() => {
  //   if (adminLogged) {
  //     navigate("/admin-dashboard")
  //   }
  //   if (sessionData) {
  //     navigate("/user-dashboard");
  //   }
  // }, [sessionData, navigate]);
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard