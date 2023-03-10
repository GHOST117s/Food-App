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
 

  //  const [quantity, setQuantity] = useState(0)


  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
     
  //       axios.get(`http://127.0.0.1:8000/api/cartitems`)
  //       .then((response) => {
  //         setQuantity(response.data.totalquantity);
  //         // console.log(response.data.totalquantity);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       }); 
  //    // 1000ms = 1 second
  // console.log();
      
  //   }
  // }, []);


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
      // console.log(response.data.wishlist);
     
    })
    .catch((error) => {
      console.log(error);
    });
  
  }, []);


  

  

  return (
    <>
      <Navbar  />
      <div className='mt-14'>
        <Cards user={user} />
      </div>

    </>
  )
}
