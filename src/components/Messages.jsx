import React, { useContext, useState,useEffect} from 'react'
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";


function Messages() {
  const [messages,setMessages] = useState([]);
  const {isAuthenticated} = useContext(Context);

  //Fetching all the messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://hms-backend-deployment-vcal.onrender.com/api/v1/message/getall",
          // `${window.location.origin}/api/v1/message/getall`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log("Error occured while fetching the message",error);
      }
    };
    fetchMessages();
  }, [])

  //Delete the message
  const deleteMessage = async(messageId)=>{
    try {
      const response = await axios.delete(
        `https://hms-backend-deployment-vcal.onrender.com/api/v1/message/delete/${messageId}`,
        // `${window.location.origin}/api/v1/message/delete/${messageId}`,
        {
          withCredentials: true,
        }
      );
      setMessages(previousMessages=>previousMessages.filter(message=>
                  message._id !== messageId));
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(!isAuthenticated){
    return <Navigate to = {"/login"} />
  }

  return (
    <section className='page messages'>
      <h1>Messages</h1>
      <div className="banner">
        {
          messages && messages.length > 0 ? (messages.map(element=>{
            return (
              <div>
              <div className="card" key={element._id}>
                <div className='details'>
                <p>First Name : <span>{element.firstName}</span></p>
                <p>Last Name : <span>{element.lastName}</span></p>
                <p>Email : <span>{element.email}</span></p>
                <p>Phone Number: <span>{element.phone}</span></p>
                <p>Message : <span>{element.message}</span></p>
                </div>

                <div className='action'>
                  <button className="delete" onClick={()=>deleteMessage(element._id)}><MdDelete /></button>
                </div>
              </div>
              </div>
            )
          })) : (<h1> No messages !</h1>)
        }
      </div>
    </section>
  )
}

export default Messages