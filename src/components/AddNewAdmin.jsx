import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddNewAdmin() {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [pan,setPan] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password,setPassword] = useState("");

  const {isAuthenticated} =  useContext(Context)
  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hms-backend-deployment-vcal.onrender.com/api/v1/user/admin/addnew",
        // `${window.location.origin}/api/v1/user/admin/addnew`,
        {firstName,lastName,email,phone,pan,dob,gender,password},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      toast.success(response.data.message);
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }
  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }


  return (
    <>
    <section className="page">
    <div className='container form-component add-admin-form'>
    <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='form-title'>Add New Admin</h1>
      <form onSubmit={handleAddNewAdmin}>
        <div>
        <input 
              type="text" 
              placeholder='First Name' 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)} 
        />
        <input 
              type="text" 
              placeholder='Last Name' 
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)} 
        />
        </div>

        <div>
        <input 
              type="text" 
              placeholder='Email' 
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
        />
        <input 
              type="tel" 
              placeholder='Phone' 
              value={phone}
              onChange={(e)=>setPhone(e.target.value)} 
        />
        </div>

        <div>
        <input 
              type="text" 
              placeholder='PAN' 
              value={pan}
              onChange={(e)=>setPan(e.target.value)} 
        />
        <input 
              type="date" 
              placeholder='DOB' 
              value={dob}
              onChange={(e)=>setDob(e.target.value)} 
        />
        </div>

        <div>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={(e)=>setPassword(e.target.value)} 
        />
        </div>

        {/* Register button */}
        <div style={{justifyContent:"center" , alignItems:"center"}}>
          <button type="submit">Add New Admin</button>
        </div>

      </form>
    </div>


    </section>
    </>
  )
}

export default AddNewAdmin