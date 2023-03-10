import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';





const cards = () => { 
  const [food, setFood] = useState(null)
 const [check , setCheck] = useState([])



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
        // console.log(wishlistFoodIds);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log('Token not found in local storage');
  }
}, []);


 

  
  const router = useRouter()

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/allfood')
    .then(res => {
      setFood(res.data.food)
      // console.log(res.data.food);
    })
    .catch(err => {
      console.log(err)
    })
  }, [setFood])


  async function handleAddtocart(id){
        // console.log(id);

if(check.includes(id)){
  setCheck(check.filter(item => item!== id))
}
else{
  setCheck([...check , id])
}


        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'You need to login first',
            showConfirmButton: false,
            timer: 1500

          })
          router.push('/login')
        }
        const cart = {
          food_id: id,
          quantity: 1,
        }
        // console.log(cart);
        if(token){ 
          const formattedToken = token.replace(/^"(.*)"$/, '$1');    
          axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
        }
        axios.post('http://127.0.0.1:8000/api/cart' , cart)
        .then(res => {
          console.log(res.data.cart.quantity);
            // setQuantity(quantity)
          if(res.data.status === 200){
            // updateQuantity(res.data.cart.quantity);
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

      // const oncheck = (id) => {
      //   console.log(id);
      // }
      
     const handleGoToCart = () => {
        router.push('/orderpage')
     }



    //  useEffect(() => {
    //   localStorage.setItem('quantity', JSON.stringify(quantity))
    // }, [quantity])


     const wishlistpage = (id) => {
      // console.log(id);
      const wishlist = {
        food_id: id,
      }
      console.log(wishlist);
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You need to login first',
          showConfirmButton: false,
          timer: 1500

        })
        router.push('/login')
      }
      if(token){
        const formattedToken = token.replace(/^"(.*)"$/, '$1');    
        axios.defaults.headers.common['Authorization'] = `Bearer ${formattedToken}`;
      }
      axios.post(`http://127.0.0.1:8000/api/wishlist`, wishlist)
      .then(res => {
        // console.log(res.data);
        if(res.data.status === 200){
          //updated  the 
          setWishlist((prevWishlist) => [...prevWishlist, id]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Wishlist',
            showConfirmButton: false,
            timer: 1500
          })
          //update the state of wishlist
        
        }
        if(res.data.status === 300){
          Swal.fire({
            position: 'top-end',
            icon: '',
            title: ' Already in your Wishlist',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
      )

     }

    


  return (
<div>
  {/* map the food items */}
  <section className="text-gray-600 body-font mt-9" >
    <div className="container px-2 py-4 mx-auto"> 
      <div className="flex flex-wrap -m-2"> 
      {food && food.map((food) => (
        <div key={food.id} className="group relative block overflow-hidden w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-8"> 
        
          <button id='wish' className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75" onClick={()=>wishlistpage(food.id)}>  

           <svg xmlns="http://www.w3.org/2000/svg" fill={wishlist.includes(food.id) ? "red":"none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          </button>
          

          <Link href={`productpage?id=${food.id}`}> <img    src={"http://127.0.0.1:8000/" + food.picture} alt="food Image" className="h-20 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-32"/> </Link>
          <div className="relative border border-gray-100 bg-white p-2"> 
           
            <h3 className="mt-2 text-sm font-medium text-gray-900">{food.food_name}</h3> 
            {/* <h3 className="mt-2 text-sm font-medium text-gray-900">{food.food_description}</h3>  */}

            <h1 className="mt-1  text-gray-700">₹{food.price}</h1> 
            <div className="mt-2">
              {check.includes(food.id)? (
              <button onClick={handleGoToCart} className="block w-full rounded bg-green-500 p-2 text-xs font-medium transition hover:scale-105 text-white"> 
                Go to Cart
              </button>
              ) : (
                <button onClick={()=> handleAddtocart(food.id)} className="block w-full rounded bg-indigo-500 p-2 text-xs font-medium transition hover:scale-105 text-white">
               Add to Cart
              </button>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  </section>

</div>

  )
}

export default cards
