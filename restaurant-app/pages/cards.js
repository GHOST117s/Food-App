import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'



const cards = () => { 
  const [food, setFood] = useState(null)


  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/allfood')
    .then(res => {
      setFood(res.data.food)
      console.log(res.data.food);
    })
    .catch(err => {
      console.log(err)
    })
  }, [setFood])



  return (
<div>
  {/* map the food items */}
  <section className="text-gray-600 body-font mt-9" >
    <div className="container px-2 py-4 mx-auto"> 
      <div className="flex flex-wrap -m-2"> 
      {food && food.map((food) => (
        <div key={food.id} className="group relative block overflow-hidden w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-8"> 
          <button
           className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
           
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          </button>

          <Link href={`productpage?id=${food.id}`}> <img    src={"http://127.0.0.1:8000/" + food.picture} alt="food Image" className="h-20 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-32"/> </Link>
          <div className="relative border border-gray-100 bg-white p-2"> 
           
            <h3 className="mt-2 text-sm font-medium text-gray-900">{food.food_name}</h3> 
            <h3 className="mt-2 text-sm font-medium text-gray-900">{food.food_description}</h3> 

            <p className="mt-1 text-xs text-gray-700">₹{food.price}</p> 
            <form className="mt-2">
              <button className="block w-full rounded bg-indigo-500 p-2 text-xs font-medium transition hover:scale-105 text-white"> 
                Add to Cart
              </button>
            </form>
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
