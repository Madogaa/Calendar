import React, { useState } from 'react'
import axios from 'axios'

function SignUp() {
  const [username,setUsername] = useState(null)
  const [password,setPassword] = useState(null)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    console.log(username)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    console.log(password)
  }

  const handleRegister = async (event) => {
    try {
      event.preventDefault()
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(error); // Handle the error
    }
  }
  return (
    <form onSubmit={(event)=>handleRegister(event)} className='m-auto flex flex-col gap-4'>
        <input onChange={(e) => handleUsernameChange(e)} type="text" />
        <input onChange={(e) => handlePasswordChange(e)} type="text" />
        <button className='w-fit p-2 bg-slate-500 self-center' type='submit' >Registrar</button>
    </form>
  )
}

export default SignUp