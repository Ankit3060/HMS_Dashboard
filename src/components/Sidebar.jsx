import React, { useContext, useState } from 'react';
import { Context } from '../main';
import {TiHome} from "react-icons/ti";
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillMessage} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import {MdAddModerator} from "react-icons/md";
import {IoPersonAddSharp} from "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Sidebar() {

  const [show,setShow] = useState(false);

  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const gotoHome = ()=>{
    navigateTo("/");
    setShow(!show);
  }
  const gotoDoctorPage = ()=>{
    navigateTo("/doctors");
    setShow(!show);
  }
  const gotoMessagePage = ()=>{
    navigateTo("/messages");
    setShow(!show);
  }
  const gotoAddNewDoctor = ()=>{
    navigateTo("/doctor/addnew");
    setShow(!show);
  }
  const gotoAddNewAdmin = ()=>{
    navigateTo("/admin/addnew");
    setShow(!show);
  }

  // Logout function
  const handleLogout = async () => {
    await axios.get(
        "https://hms-backend-deployment-vcal.onrender.com/api/v1/user/admin/logout",
        // `${window.location.origin}/api/v1/user/admin/logout`,
        {
            withCredentials: true,
        }
    ).then((res)=>{
        toast.success(res.data.message);
        setIsAuthenticated(false);
    })
    .catch((error)=>{
        toast.error(error.response.data.message);
    })
}

console.log("Sidebar - isAuthenticated:", isAuthenticated);

  return (
    <>
    <nav 
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      className={show?"show sidebar":"sidebar"}
    >
      <div className="links">
        <TiHome onClick={gotoHome}/>
        <FaUserDoctor onClick={gotoDoctorPage}/>
        <MdAddModerator onClick={gotoAddNewAdmin}/>
        <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
        <AiFillMessage onClick={gotoMessagePage}/>
        <RiLogoutBoxFill onClick={handleLogout}/>
      </div>
    </nav>

    <div className='wrapper' style={!isAuthenticated?{display:"none"}:{display:"flex"}}>
      <GiHamburgerMenu className='hamburger' onClick={()=>setShow(!show)}/>
    </div>

    </>
  )
}

export default Sidebar