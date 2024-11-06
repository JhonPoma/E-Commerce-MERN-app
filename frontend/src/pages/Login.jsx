import React, { useState } from 'react'
import LogoLogin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {

    const [ showPassword, setShowPassword]= useState(false)

    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const handleOnChange = (e)=>{
        const {name, value} = e.target
        setData( (anterior) =>{
            return{
                ...anterior,
                [name] : value
            }
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

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
