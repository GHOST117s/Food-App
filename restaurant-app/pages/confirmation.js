import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

const confirmation = () => {
  const [user , setUser] = useState(false)

  const [carts, setCart] = useState([])
  const [total, setTotal] = useState()

  const router = useRouter();

//user
  useEffect(() => {
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      axios.get('http://127.0.0.1:8000/api/user')
      .then((response) => {
        setUser(response.data.user);
        // console.log(response.data.user);
      
      })
      .catch((error) => {
        console.log(error);
      });
      setUser(true)
    }
    else{
      setUser(false)
    }

  }, [])
//cart
useEffect(() => {
  const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axios.get(`http://127.0.0.1:8000/api/cartitems`)
      .then(res => {
          setCart(res.data.carts)
          setTotal(res.data.total)
          // console.log(res.data.carts);
          console.log(res.data);
          //log each item quantity


      })
      .catch(err => {
          console.log(err)
      })

}, [])

// checkout
async function handleCheckout (e) {
  e.preventDefault();
  
  const selectedAddressValue = e.target.selectAddress.value;
  if (!selectedAddressValue) {
    // Display error message to user
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please select a valid address OR Add a new address',
    });
    return;
  }

  const selectedAddressId = user.address.find((address) => address.address === selectedAddressValue).id;
  console.log(selectedAddressId);
  const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const data = {
    address_id: selectedAddressId,
  }

  axios.post(`http://127.0.0.1:8000/api/order` , data)
    .then(res => {
      console.log(res.data);

if(res.data.status === 404){
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Cart is empty',
    showConfirmButton: false,
    timer: 1500
  })
  
}
 if(res.data.status === 200){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Order Placed',
    showConfirmButton: false,
    timer: 2500
  })
  router.push('/')
}



      
    })
     
    .catch(err => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(err)
    })
}




  return (
    <div>
      <Navbar />



<section>
  <h1 className="sr-only">Checkout</h1>

  <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
    <div className="bg-gray-50 py-12 md:py-24">
      <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="h-10 w-10 rounded-full bg-blue-700"></span>

          <h2 className="font-medium text-gray-900">BambooYou</h2>
        </div>

        <div>
          <p className="text-2xl font-medium tracking-tight text-gray-900">
          ₹{total}
          </p>

          <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
        </div>

        <div>
          <div className="flow-root">
            {carts.map((cart) => (
            <ul className="-my-4 divide-y divide-gray-100" key={cart.id}>
              <li className="flex items-center gap-4 py-4" >
                <img
                  src={"http://127.0.0.1:8000/" + cart.food.picture}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{cart.food.food_name
}</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Quantity:</dt>
                      <dd className="inline">{cart.quantity}</dd>
                    </div>

                    <div>
                      <dt className="inline">price:</dt>
                      <dd className="inline">{cart.food.price}</dd>
                    </div>
                  </dl>
                </div>
              </li>
             
            </ul>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
      {user.address && (
  <form 
    className="grid grid-cols-6 gap-4"
  onSubmit={(e) => {handleCheckout(e)}}
  >
    <fieldset className="col-span-6">
      <legend className="block text-sm font-medium text-gray-700">
        Address
      </legend>
      <div className="relative">
        <select
          name="selectAddress"
          className="block max-w-sm p-3 m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          defaultValue=""
        >
          <option value="" disabled>
            Select an address
          </option>
          {user.address.map((address, index) => (
            <option key={index} value={address.address}>
              {address.address}, {address.city}, {address.state}, {address.zip_code}, {address.country}, {address.phone}
            </option>
          ))}
        </select>
        OR
      </div>

    <Link href='/addresspage'>  <button  type="button" className="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add a NewAddress</button></Link>
    </fieldset>
    

    <div className="col-span-6">
      <button type="submit"  
        className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
      >
        Checkout
      </button>
    </div>
  </form>
)}


      </div>
    </div>
  </div>
</section>


   
  
  </div>
  )
}

export default confirmation
