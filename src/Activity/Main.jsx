import React, { useEffect } from "react";
import IconNav from "./IconNav";
import Calendar from "./Calendar";

import "./Main.css";
import EventsDetail from "./EventsDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Main() {
  const navigate = useNavigate();

  const authenticate = async () => {
    const token = localStorage.getItem('token');
    try{
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/authenticate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    )
    console.log(response.data)
    }catch(error){
      navigate('/login')
      console.log(error)
    }
  }

  useEffect(()=>{

    authenticate()
  },[])

  return (
    <div className="flex w-screen h-screen">
        <IconNav />
        <Calendar />
        <EventsDetail />
    </div>
  );
}

export default Main;
