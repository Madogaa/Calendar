import React, { useEffect } from "react";
import IconNav from "./IconNav";
import Calendar from "./Calendar";

import "./Main.css";
import EventsDetail from "./EventsDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/AppContext";


function Main() {
  const navigate = useNavigate();
  const { logout} = useApp();

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
    }catch(error){
      logout();
      navigate('/login');
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
