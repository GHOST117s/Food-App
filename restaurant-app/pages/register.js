import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState,useEffect} from 'react'

const register = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [password_confirmation, setpassword_confirmation] = useState('')
    const [picture,setpicture] = useState(null)
    

async function handlSubmit(e){

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
                                onChange={(e)=>{setname(e.target.value)}}
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
                              onChange={(e)=>{setemail(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter email" 
                               />
                            
                        </div>
                      
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"                               
                                name="password"
                                onChange={(e)=>{setpassword(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                />
                         
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                               
                                name="password_confirmation"
                                onChange={(e)=>{setpassword_confirmation(e.target.value)}}
                                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Enter password" 
                                />
                         
                        </div>
                        <div className="mb-4">

                        <input type="file" className=" file:border-solid block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0    file:text-sm file:font-semibold      file:bg-violet-50 file:text-violet-700        hover:file:bg-violet-100 " name='picture' 
                                onChange={(e)=>{setpicture(e.target.files[0])}}
                                />
                         
                            </div>
                            {/* <span>{formError && <p style={{color:"red"}}>{formError.email}</p>}</span> */}

                            <div className='flex justify-center'>

                        <button  type='submit'  className="group relative inline-block focus:outline-none focus:ring border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 hover:bg-sky-200 ..." onClick={handlSubmit}>   Sign Up  </button>
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
