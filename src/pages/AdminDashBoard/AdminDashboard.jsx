import React,{useEffect} from 'react'
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const {sessionId, retrieveSessionUser, fetchClientData} = useAppContext()
  const navigate = useNavigate()
  useEffect(() => {

    if (sessionId === null) {
      (async()=>{
        await retrieveSessionUser()
      })()
    }else{
      fetchClientData()
    }
  }, [navigate,sessionId]);
  useEffect(()=>{
    if (sessionId !== process.env.REACT_APP_ADMIN_KEY) {
      navigate("/user-dashboard")
    }
  },[sessionId])
  return (
    <div></div>
  )
}

export default AdminDashboard