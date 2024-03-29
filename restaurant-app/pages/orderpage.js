import React from 'react'
import Link from 'next/link'
import Navbar from './Components/Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

const orderpage = ({counter,onCounterChange}) => {
    const [carts, setCart] = useState([])
    const [total, setTotal] = useState()
    const [totalquantity, setTotalquantity] = useState(0)

  const [wishlist, setWishlist] = useState([])



  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/^"(.*)"$/, '$1')}`;
      axios.get('http://127.0.0.1:8000/api/user')
        .then((response) => {
          const wishlist = response.data.wishlist;
          const wishlistFoodIds = wishlist.map((item) => item.food_id);
          setWishlist(wishlistFoodIds);
          console.log(wishlistFoodIds);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Token not found in local storage');
    }
  }, []);




 
    // console.log("counter",counter);
   
    useEffect(() => {
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`http://127.0.0.1:8000/api/cartitems`)
            .then(res => {
                setCart(res.data.carts)
                setTotal(res.data.total)
                // console.log(res.data.carts);
                console.log(res.data.totalquantity);
               
               
                //log each item quantity
                setTotalquantity(res.data.totalquantity)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    async function handledelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this item from your cart!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`)
                   .then(res => {
                       console.log(res.data);
                       const newTotal = res.data.total
                       // Set the updated total state
                       setTotal(newTotal);
                       setTotalquantity(res.data.totalquantity)
                    
                   })
                    //remove item from cart
                    const newCart = carts.filter((item) => item.id !== id);
                    setCart(newCart);
                    

                   
                    
                   
                    //update the total state
                  
                   
                   
                   
                   
                } catch (err) {
                    console.log(err);
                    // Show an error message
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Something went wrong. Please try again later.',
                        icon: 'error',
                        confirmButtonColor: '#dc3545',
                    });
                }
            }
        })
        
    }
    async function handleMinus(id,food_id){
      console.log(id);
      console.log(food_id);
      const updatedCart = carts.map(item => {
        if (item.id === id) {
          // Decrement the quantity of the item with the matching id
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
        return item;
      });
      const cart ={
        food_id:food_id,
        quantity:1
      }
      const token = localStorage.getItem('token');
      if(token){ 
        const formattedToken = token.replace(/^"(.*)"$/, '$1');    
        axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
      }
      axios.post(`http://127.0.0.1:8000/api/cartdelete`,cart)
        .then(res => {
          console.log("deleted");          
          console.log(res.data);
          axios.get(`http://127.0.0.1:8000/api/cartitems`)
            .then(res => {    
              setCart(res.data.carts);           
              setTotal(res.data.total);    
              console.log(res.data.totalquantity);
              setTotalquantity(res.data.totalquantity);    
            })          
        })
        .catch((err) => console.log(err));
    }
    
   async function handleAdd(id,food_id){
    // console.log(id);
    // console.log(food_id);
    const updatedCart = carts.map(item => {
        if (item.id === id) {
          // Increment the quantity of the item with the matching id
          item.quantity += 1;
        }
        return item;
      });
      const cart ={
        food_id:food_id,
        quantity:1
      }
      console.log(cart);
      const token = localStorage.getItem('token');
      if(token){ 
        const formattedToken = token.replace(/^"(.*)"$/, '$1');    
        axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
      }
      axios.post(`http://127.0.0.1:8000/api/cart`,cart)
        .then(res => {
        

              console.log("added");
            
            console.log(res.data);
           axios.get(`http://127.0.0.1:8000/api/cartitems`)
            .then(res => {    
                setCart(res.data.carts)           
                setTotal(res.data.total)        
                
                // setQuantity((prevQuantity) => prevQuantity + 1);
                // console.log(quantity);
                console.log(res.data.totalquantity);
                setTotalquantity(res.data.totalquantity)
              
            })
            
        })
        .catch((err) => console.log(err));
    }
    const handleTotalquantityChange = (value) => {
      setTotalquantity(value);
    };




    
    // console.log();
    return (
      <div>
        <Navbar wishlist={wishlist}
         totalquantity={totalquantity}
         onTotalquantityChange={handleTotalquantityChange} 
         
        />
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={item.id}
                  >
                    <td className="w-32 p-4">
                    <Link href={`productpage?id=${item.food.id}`}> 
                      <img
                        src={"http://127.0.0.1:8000/" + item.food.picture}
                        alt="FoodName"
                      />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.food.food_name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleMinus(item.id, item.food_id)}
                          className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id={item.id}
                            value={item.quantity}
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={item.quantity}
                            required
                          />
                        </div>
                        <button
                          onClick={() => handleAdd(item.id, item.food_id)}
                          className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ₹{item.total}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handledelete(item.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/confirmation">
              {" "}
              <button className="flex ml-auto m-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                {" "}
                CheckOut
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ₹{total}
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
}
export default orderpage
