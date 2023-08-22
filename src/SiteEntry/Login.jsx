import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      console.error(error); // Handle the error
    }
  };


  return (

    <form
      onSubmit={(event) => handleRegister(event)}
      className="m-auto flex flex-col gap-4"
    >
      <input onChange={(e) => handleUsernameChange(e)} type="text" />
      <input onChange={(e) => handlePasswordChange(e)} type="text" />
      <button className="w-fit p-2 bg-slate-500 self-center" type="submit">
        Login
      </button>

    </form>
  );
}

export default Login;
