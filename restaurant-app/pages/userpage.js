import React from 'react'
import Link from 'next/link'
import Navbar from './Components/Navbar'
import axios from 'axios';
import { useState,useEffect } from 'react';

const userpage = () => {
  const [user, setUser] = useState([]);

  useEffect(() => { 
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://127.0.0.1:8000/api/user')
    .then((response) => {
      setUser(response.data.user);
     
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);


  return (
    <div>
        <Navbar/>
       
        <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="object-cover object-center rounded" alt="hero"  src={"http://127.0.0.1:8000/" + user.picture }/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{user.name}
        <br className="hidden lg:inline-block"/>
      </h1>
      <p className="mb-8 leading-relaxed">{user.email}</p>
      <div className="flex justify-center">
       
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default userpage
