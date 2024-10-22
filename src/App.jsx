import React, { useContext,useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Doctors from "./components/Doctors";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main';
import axios from 'axios';
import './App.css';



function App() {

  const {isAuthenticated, setIsAuthenticated, admin, setAdmin} = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hms-backend-deployment-vcal.onrender.com/api/v1/user/admin/me",
          // `${window.location.origin}/api/v1/user/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  },[isAuthenticated,setAdmin])

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctor/addnew' element={<AddNewDoctor />} />
        <Route path='/admin/addnew' element={<AddNewAdmin />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/doctors' element={<Doctors />} />
      </Routes>
      <ToastContainer position='top-center'/>
    </Router>
  )
}

export default App