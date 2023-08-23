import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/AppContext";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {login} = useApp()

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
      })
      localStorage.setItem("token", response.data.token)
      login()
      navigate("/main");
    } catch (error) {
      console.error(error); // Handle the error
    }
  };


  return (
    <>
       {/* <form
      onSubmit={(event) => handleRegister(event)}
      className="m-auto flex flex-col gap-4"
    >
      <input onChange={(e) => handleUsernameChange(e)} type="text" />
      <input onChange={(e) => handlePasswordChange(e)} type="text" />
      <button className="w-fit p-2 bg-slate-500 self-center" type="submit">
        Login
      </button>

  </form>*/}
    <div className="flex w-full flex-1 flex-col justify-center px-6 py-28 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Company Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-t">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(event) => handleRegister(event)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-t">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  onChange={(e) => handleUsernameChange(e)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-t">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-second hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => handlePasswordChange(e)}
                  required
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-second px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/signup" className="font-semibold leading-6 text-second hover:text-indigo-500">
              Sign up for free!
            </a>
          </p>
        </div>
      </div>
    </>
);
}

export default Login;
