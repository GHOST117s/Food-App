import React from 'react'
import Link from 'next/link'
import Navbar from './Components/Navbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';



const wishlistpage = () => {
  const [wishlist, setWishlist] = useState([])


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/wishlistitems')
      .then((res) => {
        setWishlist(res.data.wishlist)
        console.log(res.data.wishlist);

        //   const foods = wishlist.map((item) => item.food);

        // console.log(foods);
      })
  }, [])

  async function handleDeleteClick(id) {
    // Show a confirmation dialog before deleting the comment
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this item from your wishlist!',
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
          await axios.delete(`http://127.0.0.1:8000/api/wishlist/${id}`);
  
          //remove item from wishlist
          const newWishlist = wishlist.filter((item) => item.id !== id);
          setWishlist(newWishlist);
  
          // Show a success message
        
        } catch (error) {
          console.log(error);
          // Show an error message
          Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#dc3545',
          });
        }
      }
    });
  }






      return (
        <div>
          <Navbar />
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Wishlist</h1>
                {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p> */}
              </div>
              <div className="lg:w-2/2 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"> Product</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>

                      <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map(item => (
                      <tr key={item.food.id}>
                        <td className="w-32 p-4" >
                        <Link href={`productpage?id=${item.food.id}`}>  
                          <img src={"http://127.0.0.1:8000/" + item.food.picture} alt="FoodName" /></Link>
                        </td>
                        <td className="px-4 py-3">{item.food.food_name}</td>
                        <td className="px-4 py-3">{item.food.price}</td>
                        <td className="px-4 py-3 text-lg text-gray-900">

                          <button onClick={() => handleDeleteClick(item.id)}>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg> </button></td>
                        <td className="w-10 text-center">

                        </td>
                      </tr>
                    ))}




                  </tbody>
                </table>
              </div>
              <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">


              </div>
            </div>
          </section>



        </div>
      )
    }
export default wishlistpage
