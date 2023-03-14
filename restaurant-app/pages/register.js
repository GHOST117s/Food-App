import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router';


const register = () => {
  const router = useRouter();

  const [isAuth, setAuth] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [picture, setPicture] = useState(null);
  
    

    async function handleSubmit(e) {
        e.preventDefault();
    
        const fromData = new FormData();
        fromData.append('name', name);
        fromData.append('email', email);
        fromData.append('password', password);
        fromData.append('password_confirmation', password_confirmation);
        fromData.append('picture', picture);
    
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/register', fromData);
        
          
          // let result = await axios.post(process.env.NEXT_APP_REGISTER, formData);

          // extract the token from the response object
          const token = res.data.token;
    
          // save the token in localStorage
          localStorage.setItem('token', token);
    
          // set isAuth to true and navigate to the userprofile page
          setAuth(true);
        } catch (err) {
          let errorMessage = '';
          for (const key in err.response.data.errors) {
            
            errorMessage += `${err.response.data.errors[key][0]}\n`;
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
            confirmButtonColor: '#dc3545',
          });
        }
      }
      if (isAuth) {
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            showConfirmButton: false,
            timer: 1500
          });
        router.push('/')
      }


  return (
    <div>
        
       
      <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        REGISTRATION PAGE
                    </h2>
                    <form encType="multipart/form-data" >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2" req>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e)=>{setName(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter Name"
                            />
                        </div>
                       
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                              onChange={(e)=>{setEmail(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter email" 
                               />
                            
                        </div>
                      
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"                               
                                name="password"
                                onChange={(e)=>{setPassword(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                />
                         
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                               
                                name="password_confirmation"
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                />
                         
                        </div>
                        <div className="mb-4">

                        <input type="file" className=" file:border-solid block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0    file:text-sm file:font-semibold      file:bg-violet-50 file:text-violet-700        hover:file:bg-violet-100 " name='picture' 
                                onChange={(e)=>{setPicture(e.target.files[0])}}
                                />
                         
                            </div>
                            {/* <span>{formError && <p style={{color:"red"}}>{formError.email}</p>}</span> */}

                            <div className='flex justify-center'>

                        <button  type='submit'  className="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200 ..." onClick={handleSubmit}>   Sign Up  </button>
                            </div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link className="text-blue-500 hover:underline" href="/login">Already Have an Account?Sign In</Link>


                    
                    </div>
                </div>
            </div>
    </div>
  )
}

export default register
