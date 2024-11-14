import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// React-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResumenApi from './common'
import Context from './context'

import {useDispatch} from 'react-redux'
import { setUserDetalles } from './store/userSlice'

function App() {

  const dispatch = useDispatch()

  const fetchUsuarioDetalles = async()=>{
    const dataResponse = await fetch(ResumenApi.usuarioActual.url,{
      method : ResumenApi.usuarioActual.method,
      credentials : 'include',

    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetalles(dataApi.data))
    }
    console.log('dataUser', dataApi)
  }

  useEffect( ()=>{
    // detales del usuario
    fetchUsuarioDetalles()
  
  },[])

  return (
    <>
      <Context.Provider value={{
          fetchUsuarioDetalles // fetch (búsqueda ) de detalles del usuario
      }}>
        <ToastContainer/>
        <Header/>
        <main className='min-h-[calc(100vh-120px)]'> 
          <Outlet/>
        </main>
        <Footer/>

      </Context.Provider>
    </>
  )
}

export default App
