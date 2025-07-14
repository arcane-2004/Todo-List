import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // <-- error state

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // clear previous error

    try {
      const newUser = { email, password };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, newUser);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        navigate('/profile');
      }
    } catch (err) {
      // Show error message from backend or a default one
      setError(err.response?.data?.message || "Invalid email or password!");
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-l from-[#FFA17F] to-[#00223e]'>
      <div>
        <h1 className='text-4xl font-extrabold p-2'>Login</h1>
      </div>
      <div className='h-140 w-160 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl shadow-gray-900 p-10'>
        <form onSubmit={submitHandler}>
          <h3 className='text-2xl font-bold mb-2'>Enter your email</h3>
          <input className='flex-1 py-2 px-2 w-full  border border-gray-300 rounded-md mb-8' required type="email" placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className='text-2xl font-bold mb-2'>Create a password</h3>
          <input className='flex-1 p-2 border border-gray-300 rounded-md w-full' required type="password" placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='w-1/2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer mx-[25%] mt-15'>Log in</button>
        </form>
        <p className='text-center text-gray-700 mt-4'>Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Sign up</Link></p>
        {error && <p className="text-red-600 text-center mt-6">{error}</p>}
      </div>
    </div>
  )
}

export default Login
