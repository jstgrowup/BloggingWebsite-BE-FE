import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
// import styles from '../styles/Home.module.css'
import axios from "axios"
export default function Home() {
  const [name, setname] = useState([])
  useEffect(() => {
    
    axios.get("/api/hello/").then((data) => setname(data.data)).catch(err => console.log(err));
  
   
  }, [])
  console.log(name);
  return (
    <div>

    </div>
  )
}

