import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddNewDoctor() {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [pan,setPan] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password,setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const {isAuthenticated} =  useContext(Context)
  const navigateTo = useNavigate();

  //handling the avatar
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();  // FormData is used to send files to the server
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      formData.append("email",email);
      formData.append("phone",phone);
      formData.append("pan",pan);
      formData.append("dob",dob);
      formData.append("gender",gender);
      formData.append("password",password);
      formData.append("doctorDepartment",doctorDepartment);
      formData.append("docAvatar",docAvatar);

      const response = await axios.post(
        "https://hms-backend-deployment-vcal.onrender.com/api/v1/user/doctor/addnew",
        // `${window.location.origin}/api/v1/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
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

  const departmentArray = [
    "Pediatrics",
    "Cardiology",
    "Neurologist",
    "Orthopedics",
    "Dermatology",
    "Gynecology",
    "Ophthalmology",
    "ENT",
    "Urology",
    "Radiology",
    "Dentist",
    "Physiotherapy",
];

  return (
    <>
    <section className="page">
    <div className='container form-component add-doctor-form'>
    <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='form-title'>Register New Doctor</h1>
      <form onSubmit={handleAddNewDoctor}>

      <div className='first-wrapper'>
        {/* Avatar */}
        <div style={{flexDirection:"column",height:"fit-content"}}>
          <img src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"} alt="Doctor Avatar" />
          <input type="file" onChange={handleAvatar} />
        </div>

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
        <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>
          <option value="">Select Department</option>
                {departmentArray.map((depart,index)=>{
                    return(
                        <option key={index} value={depart}>
                            {depart}
                        </option>
                    )
                })}
        </select>
        <button type="submit">Register New Doctor</button>
        </div>
      </div>
      </form>
    </div>
    </section>
    </>
  )
}

export default AddNewDoctor