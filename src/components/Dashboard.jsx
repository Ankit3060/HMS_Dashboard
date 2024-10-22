import React, { useContext, useState,useEffect } from 'react';
import {Context} from "../main"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import {GoCheckCircleFill} from "react-icons/go";
import {AiFillCloseCircle} from "react-icons/ai";
import { MdDelete } from "react-icons/md";


function Dashboard() {
  const {isAuthenticated,admin} = useContext(Context);
  const [appointments,setAppointments] = useState([]);
  const [doctors,setDoctors]  = useState([]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async ()=>{
      try {
        const response = await axios.get(
          "https://hms-backend-deployment-vcal.onrender.com/api/v1/appiontment/get",
          // `${window.location.origin}/api/v1/appiontment/get`,
          {
            withCredentials: true
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchAppointments();  
  }, [])
  
  // Update status of appointment
  const handleUpdateStatus = async(appointmentId,status)=>{
    try {
      const {data} = await axios.put(
        `https://hms-backend-deployment-vcal.onrender.com/api/v1/appiontment/update/${appointmentId}`,
        // `${window.location.origin}/api/v1/appiontment/update/${appointmentId}`,
        {status},
        {
          withCredentials: true
        }
      );
      setAppointments(previousAppointments=>previousAppointments.map(appointment=>{
        // appointment._id === appointmentId ? {...appointment,status} : appointment
        //We can use above and below code to update the status of appointment
        if(appointment._id === appointmentId){
          return {...appointment,status}
        }
        return appointment
    }))
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Delete appointment
  const deleteAppointment = async(appointmentId)=>{
    try {
      const {data} = await axios.delete(
        `https://hms-backend-deployment-vcal.onrender.com/api/v1/appiontment/delete/${appointmentId}`,
        // `${window.location.origin}/api/v1/appiontment/delete/${appointmentId}`,
        {
          withCredentials: true
        }
      );
      setAppointments(previousAppointments=>previousAppointments.filter(appointment=>
                        appointment._id !== appointmentId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message); 
    }
  }

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

  if(!isAuthenticated){
    return <Navigate to = {"/login"} />
  }
  return (
    <>
    <section className="dashboard page">
      <div className="banner">

        <div className="firstBox">
          <img src="/doc.png" alt="Doctor Img" />
          <div className="content">
            <div>
              <p>Hello ,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>Together, we are committed to excellence, innovation, and compassionate care, 
              driving <br/>our hospital to new heights and transforming lives every day.
            </p>
          </div>
        </div>

        <div className="secondBox">
          <p>Total Appointments :</p>
          <h3>{appointments.length}</h3>
        </div>

        <div className="thirdBox">
          <p>Registered Doctors :</p>
          <h3>{doctors.length}</h3>
        </div>
      </div>

      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              appointments && appointments.length > 0 ? (
                appointments.map(appointment=>{
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appoinntment_date.substring(0,16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select className={
                                            appointment.status == 'Pending' ? "value-pending" : 
                                            appointment.status == "Rejected" ? "value-rejected" : 
                                            "value-accepted"
                                          }
                                style={{cursor : "Pointer"}}
                                value={appointment.status}
                                onChange={(e)=>handleUpdateStatus(appointment._id,e.target.value)}
                        >
                          <option value="Pending" className='value-pending'>Pending</option>
                          <option value="Accepted" className='value-accepted'>Accepted</option>
                          <option value="Rejected" className='value-rejected'>Rejected</option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? 
                                  <GoCheckCircleFill className='green'/> : 
                                  <AiFillCloseCircle className='red'/>}</td>
                      <td><MdDelete 
                              onClick={()=>deleteAppointment(appointment._id)} 
                              style={{cursor : "Pointer"}}
                              className='delete'/>
                      </td>
                    </tr>
                  )
                })
              ) : (<h1>No Appointments</h1>)
            }
          </tbody>
        </table>
      </div>

    </section>
    </>
  )
}

export default Dashboard