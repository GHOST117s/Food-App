// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import Navbar from './Components/Navbar'
import Cards from './cards'
import axios from 'axios'
import { useEffect, useState } from 'react'



// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user , setUser] = useState([]);
  const [wishlist, setWishlist] = useState([])

  const [counter, setCounter] = useState(0);

  const handleCounterChange = (newCounter) => {
    setCounter(newCounter);
  };





  



  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found in local storage');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.replace(/^"(.*)"$/, '$1')}`;
  
    axios.get('http://127.0.0.1:8000/api/user')
    .then((response) => {
      setUser(response.data);
      const wishlist = response.data.wishlist;
        const wishlistFoodIds = wishlist.map((item) => item.food_id);
        setWishlist(wishlistFoodIds);
      // console.log(response.data.wishlist);
     
    })
    .catch((error) => {
      console.log(error);
    });
  
  }, []);
console.log(counter);

  

  

  return (
    <>
      <Navbar  counter={counter} onCounterChange={handleCounterChange}  />
      <div className='mt-14'>
        <Cards user={user} wishlist={wishlist} setWishlist={setWishlist}
        counter={counter} onCounterChange={handleCounterChange} 
        />
      </div>

    </>
  )
}
