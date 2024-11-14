import React, { useContext, useState } from 'react'
import LogoLogin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import ResumenApi from '../../common';
import Context from '../../context';

const Login = () => {

    const [ showPassword, setShowPassword]= useState(false)

    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const navegar = useNavigate()

    
    const generalContext = useContext(Context)

    //console.log(generalContext)

    const handleOnChange = (e)=>{
        const {name, value} = e.target
        setData( (anterior) =>{
            return{
                ...anterior,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        // Enviamos al backend
        const dataResponse = await fetch(ResumenApi.signIn.url, {
            method : ResumenApi.signIn.method,
            credentials: 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        
        console.log("daaAPI-success", dataApi.success)
        if(dataApi.success){
            toast.success(dataApi.message)
            navegar('/')
            generalContext.fetchUsuarioDetalles()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-md mx-auto'>
                
                <div className='w-20 h-20 mx-auto'>
                    <img src={LogoLogin} alt="Login icons" />
                </div>

                <form className='pt-6' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input  type="email"
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label >Password : </label>
                        <div className="bg-slate-100 p-2 flex">
                            <input  type={showPassword? "text":"password"} 
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword( !showPassword )}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash/>) : (<FaEye/>)
                                    }
                                </span>
                            </div>
                        </div>

                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-700'>
                            Has olvidado tu contraseña?
                        </Link>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Login</button>

                </form>

                <p className='my-4'>
                    Don´t have account ? <Link to={"/sign-up"} className='text-red-500 hover:text-red-700 hover:underline'> Sign up </Link>
                </p>

            </div>

        </div>
    </section>
  )
}

export default Login
