import React from 'react'
import { useState } from 'react'
import LogoLogin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import imageToBase64 from '../helpers/imageTobase64';
import ResumenApi from '../common/index.js';

// Usamo el react-toastify
import { toast } from 'react-toastify';

const SignUp = () => {

  const [ showPassword, setShowPassword]= useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data,setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilepic : ""
  })

  const navegar = useNavigate()

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
    
    if(data.password === data.confirmPassword){
        // enviamos al backend
            const dataResponse = await fetch(ResumenApi.singUP.url,{
                method : ResumenApi.singUP.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data) // data es lo que enviamos al backend
            })
            const dataAPI = await dataResponse.json()

            if(dataAPI.success){// Si el correo No existe, registro exitoso
                toast.success(dataAPI.message)
                navegar("/login")
            }
            if(dataAPI.error){// Si el correo SI existe, registro no exitoso.
                toast.error(dataAPI.message)
            }
            console.log(dataAPI)
    }else{
        toast.error("Password is not equals")
        //alert("password is not equals")
    }

  }

  const handleUploadPic = async(e)=>{
    const  file = e.target.files[0]
    //console.log(file)
    const imagePic = await imageToBase64(file)

    //console.log(imagePic)
    setData( (anterior)=>{
      return{
        ...anterior,
        profilepic:imagePic
      }
    })
  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-md mx-auto'>
                
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                      <img src={data.profilepic || LogoLogin} alt="Login icons" />
                    </div>
                    <form>
                      <label >
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer  text-center bottom-0 w-full absolute'>
                          Upload Photo
                        </div>
                        <input type="file" className='hidden' onChange={handleUploadPic}/>
                      </label>
                    </form>
                </div>

                <form className='pt-6' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-100 p-2'>
                            <input  type="text"
                                    placeholder='enter your name' 
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>


                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input  type="email"
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
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
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword( !showPassword )}>
                                <span>
                                    {
                                        showPassword ? (<FaEyeSlash/>) : (<FaEye/>)
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label> Confirm Password : </label>
                        <div className="bg-slate-100 p-2 flex">
                            <input  type={showConfirmPassword? "text":"password"} 
                                    placeholder='enter confirm password'
                                    name='confirmPassword'
                                    value={data.confirmpassword}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword( !showConfirmPassword )}>
                                <span>
                                    {
                                        showConfirmPassword ? (<FaEyeSlash/>) : (<FaEye/>)
                                    }
                                </span>
                            </div>
                        </div>
                    </div>



                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Sign Up</button>

                </form>

                <p className='my-4'>
                  Already have account <Link to={"/login"} className='text-red-500 hover:text-red-700 hover:underline'> Login </Link>
                </p>

            </div>

        </div>
    </section>
  )
}

export default SignUp
