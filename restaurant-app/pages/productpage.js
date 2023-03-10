
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';


const productpage = () => {
  const [food, setFood] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const [wishlist, setWishlist] = useState([])

  const router = useRouter()
  const productId = router.query.id

  


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
  


  // console.log(productId);

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/food/' + productId)
      .then(res => {
        setFood(res.data.food)
        // console.log(res.data.food);
      })
      .catch(err => {
        console.log(err)
      })

  }, [setFood])


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

const handleAddToCart = () => {
  const cart = {
    food_id: productId,
    quantity: quantity,
  }
  console.log(cart);

  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'You need to be logged in to Add to your WishList.',
      showConfirmButton: true,

    })
    router.push('/login')
  }
  if(token){ 
    const formattedToken = token.replace(/^"(.*)"$/, '$1');    
    axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
  }
  axios.post('http://127.0.0.1:8000/api/cart' , cart)
  .then(res => {
    console.log(res.data);
    if(res.data.status === 200){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Added to Cart',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if(res.data.status === 300){
      Swal.fire({
        position: 'top-end',
        icon: '',
        title: ' Added to Cart',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })

  
}


const AddtoWishlist = (id) => {
  const wishlist = {
    food_id: productId,
  }  
  console.log(wishlist);

  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'You need to be logged in to Add to your WishList.',
      showConfirmButton: true,

      
    })

    // alert('You need to be logged in to Add to your WishList.');
    // return;
    router.push('/login')
  }
if(token){

  const formattedToken = token.replace(/^"(.*)"$/, '$1');    
  axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
}
  axios.post('http://127.0.0.1:8000/api/wishlist' , wishlist)
  .then(res => {
    console.log(res.data);
    if(res.data.status === 200){
      setWishlist((prevWishlist) => [...prevWishlist, id]);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Added to Wishlist',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if(res.data.status === 300){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Already Added to Wishlist',
        showConfirmButton: false,
        timer: 1500
      })
    }


  })
  .catch(err => {
    
 
    console.log(err)
  }
  )

}


// console.log(quantity);




  return (
    <div>
      <Navbar />

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          {food && food.map((food) => (
            <div className="lg:w-4/5 mx-auto flex flex-wrap" key={food.id}>
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={"http://127.0.0.1:8000/" + food.picture} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{food.food_name}</h1>

                <p className="leading-relaxed">{food.food_description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
      <div className="flex">
        <div>
          <label htmlFor="Quantity" className="sr-only">
            Quantity
          </label>

          <div className="flex items-center rounded border border-gray-200">
            <button
              type="button"
              className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={handleDecrease}
            >
              -
            </button>

            <span>
              <input
                type="number"
                id="Quantity"
                placeholder={quantity}
                // value={quantity}
                className="h-10 w-16 border-y-0 border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
            </span>

            <button
              type="button"
              className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">₹{food.price}</span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleAddToCart}>Add to Cart</button>

                  {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy</button> */}

                  {/* wishlist button */}

                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" onClick={() => AddtoWishlist(food.id)}>
                    <svg fill={wishlist.includes(food.id) ? "red":"currentcolor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

  </div>
      </section>

    </div>
  )
}

export default productpage
