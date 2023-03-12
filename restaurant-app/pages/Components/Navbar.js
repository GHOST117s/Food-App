import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Dropdown from './Dropdown'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';



const Navbar = ({ counter, onCounterChange, totalquantity, handlecartchange }) => {
  console.log("totalquantity:", totalquantity);
  


  
  const [user, setUser] = useState(false);
  const [carts, setCart] = useState(totalquantity);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     const intervalId = setInterval(() => {
  //       axios.get(`http://127.0.0.1:8000/api/cartitems`).then((res) => {
  //         setCart(res.data.totalquantity);
  //         // console.log(res.data);
  //         // log each item quantity
  //       });
  //     }, 1000); // set the interval to 1000ms (1 second)

  //     // clean up the interval when the component unmounts or the token changes
  //     return () => clearInterval(intervalId);
  //   }
  // }, [counter]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get(`http://127.0.0.1:8000/api/cartitems`)
        .then((res) => {
        setCart(res.data.totalquantity);

        // console.log(res.data.carts);
        console.log(res.data);
        //log each item quantity
      });
    }
  }, [counter]);

  const handleCounterChange = (value) => {
    onCounterChange(value); // Update the counter value in parent component

    setCart(value);
    // Update the carts value in this component
    
  };
  

  



  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get("http://127.0.0.1:8000/api/user")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  //update the cart to quantity

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm6.997 20.486c2.444-2.019 4.003-5.072 4.003-8.486 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 4.27 2.439 7.975 5.998 9.798v-3.228c0-.691-.441-.917-1.384-1.673-.698-.56-1.177-1.433-1.089-2.322.252-2.537.862-7.575.862-7.575l.909.003-.597 5.997h1.291l.005-6h1l-.002 6h1.003l-.001-6h1l.004 6 1.34.002-.675-6.002h.887c.002.011.675 5.008.951 7.55.098.902-.409 1.792-1.121 2.356-.95.751-1.382.967-1.382 1.669v4.243c.649.12 1.318.182 2.001.182 1.409 0 2.756-.265 3.994-.749l.001-3.251h-2.467c.802-6.996 3.103-12 4.66-12 .447 0 .804.357.807.851.008 1.164.004 6.814.002 12.635zm-7.563-6.486h-5.845c-.067.642-.26 1.387.651 2.117.938.754 1.758 1.231 1.758 2.453v3.678c.326.128.66.24 1.001.337v-4.01c0-1.237.811-1.7 1.761-2.453.944-.747.75-1.464.674-2.122zm6.561 7.222l.002-13.029c-1.14 1.352-2.563 4.206-3.31 9.809h2.308l-.001 3.8c.345-.176.679-.37 1.001-.58z" />
            </svg>
            <span className="ml-3 text-xl">Food App</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/wishlistpage">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </Link>

            {/* <Link href='/userpage' className="mr-5 hover:text-gray-900">Profile</Link> */}

            <Link href="/orderpage" className="m-2 ml-6 mr-7">
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <div role="button" className="relative flex">
                  <svg
                    className="flex-1 w-8 h-8 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                  </svg>
                  <span className="absolute right-0 top-0 rounded-full bg-red-600 w-3.5 h-3.5 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {carts}
                  </span>
                </div>
              </li>
            </Link>
            <div className="mr-6">
              <Dropdown user={user} setUser={setUser} />
            </div>
          </nav>

          {/* login drop down */}
        </div>
      </header>
    </div>
  );
};

export default Navbar
