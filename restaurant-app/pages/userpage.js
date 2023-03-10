import React from 'react'
import Link from 'next/link'
import Navbar from './Components/Navbar'
import axios from 'axios';
import { useState, useEffect } from 'react';

const userpage = () => {
  const [user, setUser] = useState([]);
  const [History, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://127.0.0.1:8000/api/user')
      .then((response) => {
        setUser(response.data.user);
        console.log(response.data);
        setHistory(response.data.history);


      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  return (
    <div>
      <Navbar />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src={"http://127.0.0.1:8000/" + user.picture} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{user.name}
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mb-8 leading-relaxed">{user.email} </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>

                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      City
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      State
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      Zip Code
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      Phone
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {user.address && user.address.map((address) => (
                    <tr key={address.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {address.address}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address.city}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address.state}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address.zip_code}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address.phone}</td>


                    </tr>
                  ))}



                </tbody>
              </table>
            </div>
            



          </div>
          


        </div>
        <div class="w-full ml-12 max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">


              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order History</h5>
                <p class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                 
                </p>
              </div>
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                <div class="overflow-x-auto">
  <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
    <thead>
      <tr>
        <th
          class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
        >
          
        </th>
        <th
          class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
        >
          Name
        </th>
        <th
          class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
        >
         quantity
        </th>
        <th
          class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
        >
          Price
        </th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-200">
    {History.map((order) => (
      <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          <img className="w-32 p-4" src={`http://127.0.0.1:8000/` + order.picture} ></img>
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{order.food_name}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{order.quantity}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{order.price}</td>
      </tr>
    ))}
      

     
    </tbody>
  </table>
</div>




                </ul>
              </div>
            </div>

      </section>

    </div>
  )
}

export default userpage
