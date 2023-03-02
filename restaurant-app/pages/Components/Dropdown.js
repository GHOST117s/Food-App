import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';


const Dropdown = ({ user, setUser }) => {

  const router = useRouter();


  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  if (!user) {
    // Render the login/signup links if user is not defined
    return (
      <div className='flex'>       

        <Link className=" ml-2 flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" href="/login">Login</Link>
        <Link className=" ml-2 flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" href="/register">Sign up</Link>
      </div>
    )
  }
  // logout function

  const logoutEvent = async e => {

    try {
      // Call the logout API endpoint and remove the token from local storage

      const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.post('http://127.0.0.1:8000/api/logout');
      localStorage.removeItem('token');
    
      // Navigate to the home page and show a sweet alert
      router.push('/');
      // Set the user state to null
      setUser(null);

      setIsOpen(!isOpen);

      await Swal.fire({
        title: 'Logged out successfully!',
        icon: 'success'
      });

    } catch (err) {
      console.log(err);
    }

    } 



  // Render the dropdown if user is defined
  return (
    <div>
      <div className="relative mr-14">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          type="button"
          onClick={toggle}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src={'http://127.0.0.1:8000/' + user.picture}
            alt="user photo"
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            id="dropdownAvatar"
            className="absolute z-10 bg-gray-100 divide-y divide-gray-400 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user.name}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <Link
                  href="/userpage"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                onClick={e => logoutEvent(e)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
