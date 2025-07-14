import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

    if (response.status === 201) {
      const data = response.data;
      console.log(data);

      localStorage.setItem('token', data.token);
      navigate('/profile')
      
    }
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');

  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-l from-[#FFA17F] to-[#00223e]'>
      <div>
        <h1 className='text-4xl font-extrabold p-2'>Sign up</h1>
      </div>
      <div className='h-160 w-180 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl shadow-gray-900 p-10'>

        <form action="" onSubmit={(e) => {
          submitHandler(e);
        }} >

          <h3 className='text-2xl font-bold mb-2'>Enter your name</h3>
          <div className='flex gap-4 mb-8'>
            <input className='flex-1 p-2 border border-gray-300 rounded-md' required type="text" placeholder='First name'
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
            />
            <input className='flex-1 p-2 border border-gray-300 rounded-md' required type="text" placeholder='Last name'
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value)
              }}
            />
          </div>

          <h3 className='text-2xl font-bold mb-2'>Enter your email</h3>
          <input className='flex-1 py-2 px-2 w-full  border border-gray-300 rounded-md mb-8' required type="email" placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <h3 className='text-2xl font-bold mb-2'>Create a password</h3>
          <input className='flex-1 p-2 border border-gray-300 rounded-md w-full' required type="password" placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <button className='w-1/2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer mx-[25%] mt-15'>Create Account</button>
        </form>

        <p className='text-center text-gray-700 mt-4'>Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Log in</Link></p>
      </div>
    </div>
  )
}

export default Signup
