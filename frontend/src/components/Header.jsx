import React from 'react'
import Logo from './Logo'

import { IoMdSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResumenApi from '../common';
import { toast} from 'react-toastify';
import {setUserDetalles} from '../store/userSlice'

const Header = () => {

  const user = useSelector(state => state?.user?.user )
  // console.log("userHeader :", user.user.user )
   console.log("userHeader :", user )

  // Disparador DISPATCH para actualizar el UsuarioDetalles
  const dispatch = useDispatch()

  // manejador para cerrarSesion (eliminamos Token)
  const handleLogout = async()=>{

    const fetchData = await fetch(ResumenApi.logout.url, {
      method : ResumenApi.logout.method,
      credentials : 'include'
    })
    const datos = await fetchData.json()
    if(datos.success){
      toast.success(datos.message)
      dispatch(setUserDetalles(null))
    }
    if(datos.error){
      toast.error(datos.message)
    }
    
  }


  return (
    <header className='h-16 shadow-md bg-white'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link to={"/"}>
                  <Logo w={100} h={60}/>
                </Link>
            </div>

            <div className='hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm'>
              <input type="text" placeholder='search product...' className='w-full outline-none pl-2' />
              <div className='text-lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-r-full text-white'>
                <IoMdSearch />
              </div>
            </div>

            <div className='flex items-center gap-7 '>
              
              <div className='text-3xl cursor-pointer'>
                {
                  user?.profilepic ? (
                      <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user.name}/>
                  ) : (
                    <FaRegCircleUser/>

                  )
                }
              </div>

              <div className='text-2xl relative'> 
                <span><FaShoppingCart/></span>
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3' >
                  <p className='text-sm'>0</p>
                </div>
              </div>

              <div>  
                {/* <button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</button> */}
                {/* <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link> */}
                
                {
                  user?._id? (
                    <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'> Logout </button>
                  )
                  :
                  (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                  )
                }
              
              
              </div>

            </div>
        </div>
    </header>
  )
}

export default Header
