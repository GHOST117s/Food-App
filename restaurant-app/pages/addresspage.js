import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Swal from 'sweetalert2'

const addresspage = () => {
  const router = useRouter();


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip_code, setZip_code] = useState('')
    const [country, setCountry] = useState('')
    const [phone, setPhone] = useState('')

    async function handlesubmit(e){
        e.preventDefault();
        const fromData = new FormData();
        fromData.append('address', address);
        fromData.append('city', city);
        fromData.append('state', state);
        fromData.append('zip_code', zip_code);
        fromData.append('country', country);
        fromData.append('phone', phone);
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/address`, fromData);
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Address Added Successfully',
                showConfirmButton: false,
                timer: 1500
            })

            router.push('/confirmation')
        } catch (error) {
            console.log(error)
        }

      
    }
 


  return (
    <div>
        <Navbar />
        <div className="flex justify-center">
<div className="container ">
<div className="flex justify-center">
  <form className="max-w-md w-full">
    <div className="mb-4">
      <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
      <input type="text" id="address" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City:</label>
      <input type="text" id="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State:</label>
      <input type="text" id="state" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="zip_code" className="block text-gray-700 font-bold mb-2">Zip Code:</label>
      <input type="text" id="zip_code" name="zip_code" placeholder="Zip Code" value={zip_code} onChange={(e) => setZip_code(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country:</label>
      <input type="text" id="country" name="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-4">
      <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone:</label>
      <input type="text" id="phone" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="flex justify-center">
      <button type="submit" onClick={handlesubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </div>
  </form>
</div>






</div>
</div>
        
      
    </div>
  )
}

export default addresspage
