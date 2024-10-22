import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

function Doctors() {
  const [doctors,setDoctors]  = useState();
  const {isAuthenticated} = useContext(Context);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async ()=>{
      try {
        const response = await axios.get(
          "https://hms-backend-deployment-vcal.onrender.com/api/v1/user/doctors",
          // `${window.location.origin}/api/v1/user/doctors`,
          {
            withCredentials: true
          }
        );
        setDoctors(response.data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchDoctors();
  }, [])

  // Delete doctor
  const handleDelete = async(doctorId)=>{
    try {
      const response = await axios.delete(
        `https://hms-backend-deployment-vcal.onrender.com/api/v1/user/doctor/delete/${doctorId}`,
        // `${window.location.origin}/api/v1/user/doctor/delete/${doctorId}`,
        {
          withCredentials: true
        }
      );
      setDoctors(previousDoctors=>previousDoctors.filter(doctor=>
                  doctor._id !== doctorId));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(!isAuthenticated){
    return <Navigate to =  {"/login"} />
  }

  //This is for the date format
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };
  

  return (
    <>
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {
          doctors && doctors.length > 0 ? (doctors.map(element=>{
            return (
              <div className="card">
                <img src={element.docAvatar && element.docAvatar.url} alt="Doctor avatar" />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>Email : <span>{element.email}</span></p>
                <p>Phone Number : <span>{element.phone}</span></p>
                <p>DOB : <span>{element.dob.substr(0,10)}</span></p>
                <p>Department : <span>{element.doctorDepartment}</span></p>
                <p>PAN : <span>{element.pan}</span></p>
                <p>Gender : <span>{element.gender}</span></p>
                {/* <button onClick={() => handleDelete(element._id)}>Delete</button> */}
                <MdDelete onClick={()=>handleDelete(element._id)} 
                          style={{cursor : "Pointer"}}
                          className='delete'/>
              </div>
              </div>  
            )
          })) : (<h1>No Registered Doctors Found !</h1>)
        }
      </div>
    </section>
    </>
  )
}

export default Doctors