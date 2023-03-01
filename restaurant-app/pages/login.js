import React from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';



const login = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({});

  const validateform = () => { 
    let errors = {}

    if(formData.email.length === 0){
      errors.email = "Email is required"
    }
    if(formData.password.length === 0){
      errors.password = "Password is required"
    }

    setFormError({...errors})
    return false
  }

  const { email, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault()
    validateform()
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const body = JSON.stringify({ email, password })
  
      const res = await axios.post('http://127.0.0.1:8000/api/login', body, config)
      localStorage.setItem('token', JSON.stringify(res.data.token))
  
      console.log(res.data)
  
      if (res.data.token) {
        setIsAuth(true)
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        })
      
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'OOps! Something went wrong ',
          showCancelButton: false,
          timer: 2500
        })
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Invalid details ',
        showCancelButton: false,
        timer: 2500
      })
    }

  }  
      if(isAuth){
         router.push('/');
      }
  




  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <p className="text-center text-2xl font-bold mb-6">Login Page</p>
          <form onSubmit={e => onSubmit(e)}>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {onInputChange(e)}}
                placeholder="Enter email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {onInputChange(e)}}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               
              />
            </div>
            <p className="text-red-500"></p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200"
              >
                Sign In
              </button>
             

            </div>
            
          </form>
          <div className="mt-3 text-center">
          <Link className="text-blue-500 hover:underline mt-4" href="/register">Not yet a user?Register here</Link>

                    
                    </div>
        </div>
      </div>
   
  )
}

export default login
