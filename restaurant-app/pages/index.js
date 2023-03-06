// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import Navbar from './Components/Navbar'
import Cards from './cards'
import axios from 'axios'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
    <>
      <Navbar/>     
{/* categories */}
<div className='mt-14' >
<Cards/>
</div>  
        
    </>
  )
}
