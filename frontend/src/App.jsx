import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// React-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResumenApi from '../common'


function App() {

  const fetchUsuarioDetalles = async()=>{
    const dataResponse = await fetch(ResumenApi.usuarioActual.url,{
      method : ResumenApi.usuarioActual.method,
      credentials : 'include',

    })
    const dataApi = await dataResponse.json()
    console.log('dataUser', dataApi)
  }

  useEffect( ()=>{
    // detales del usuario
    fetchUsuarioDetalles()
  
  },[])

  return (
    <>
      <ToastContainer/>
      <Header/>
      <main className='min-h-[calc(100vh-120px)]'> 
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
