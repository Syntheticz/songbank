"use client"

import React, { useEffect, useState } from 'react'
import Icon from "../../public/logo.png"
import FB from "../../public/fb.svg"
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import ErrorComponent from './ErrorComponent'
import { signUpUser } from '@/lib/serverHelper'

let BASE_URL = process.env.NODE_ENV === "development" ? process.env.BASE_URL : process.env.PROD_URL



export default function Login() {

    const router = useRouter()

    const [rawData, setRawData] = useState({
      email : '',
      password : '',
    })

    const [error, setError] = useState({
      message : '',
      error : false
    })
    const [pass , setPass] = useState({
      password : '',
      rePassword : ''
    })

    useEffect(() => {
      setError({error : false, message : ''})
    }, [rawData, pass])

    useEffect(() => {
      if(pass.password === pass.rePassword){
        setRawData({...rawData, password : pass.password})
      }
    }, [pass])

    function handleOnClick(e :  React.MouseEvent<HTMLButtonElement, MouseEvent>){
        signIn("facebook", {callbackUrl : `${BASE_URL}`})
      }

    async function handleSubmit(e :  React.MouseEvent<HTMLButtonElement, MouseEvent>){
      e.preventDefault()
      const emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if(rawData.email === '' || pass.password === '' || pass.rePassword === ''){
        setError({error : true, message : 'There are empty fields.'})
      }

      if (!emailRegex.test(rawData.email)){
        setError({error : true, message : 'Please enter a valid email.'})
      }

      if(pass.password !== pass.rePassword){
        setError({error : true, message : 'Password does not match.'})
      }


      
      const res = await signUpUser(rawData)

      if(res) {
        router.push('/login')
      }else{
        setError({error : true, message : 'The user already exist.'})
      }
      
    }

  return (
    <div className='max-w-[370px] rounded-3xl min-w-[300px] pb-6 flex flex-col items-center border-2 border-gray-2 00 shadow-lg'>
          <div className='w-full gap-2 flex flex-col justify-center items-center p-6'>
            <div className='w-1/2'>
                <Image src={Icon} objectFit='fill' alt='Church Icon'/>
            </div>
            <input onChange={(e) => {setRawData({...rawData, email: e.target.value})}} id='email'  className='bg-gray-100 border-2 w-full font-montserrat text-sm h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-sm' type="text" placeholder='Email' />
            <input onChange={(e) => {setPass({...pass, password: e.target.value})}} id='password'  className='bg-gray-100 border-2 w-full font-montserrat text-sm h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-sm' type="password" placeholder='Password' />
            <input onChange={(e) => {setPass({...pass, rePassword: e.target.value})}} id='rePassword'  className='bg-gray-100 border-2 w-full font-montserrat text-sm h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-sm' type="password" placeholder='Re-type password' />

            <button onClick={(e) => {handleSubmit(e)}} className='w-full bg-primary rounded text-white font-montserrat font-semibold  text-lg tracking-wide h-10'>Sign Up</button>
            <div>
              <span className='text-xs font-montserrat font-semibold text-primary '>Already have an account? </span>
              <span onClick={() => {router.push('/login')}} className='text-xs font-montserrat font-semibold text-primary hover:text-tertiary hover:underline cursor-pointer active:text-secondary'>Log in</span>
            </div>
          </div>

          <div className='w-full flex justify-center items-center gap-2 px-6'>
            <span className='h-1 bg-primary w-full rounded-full opacity-50'></span>
            <span className='font-montserrat font-bold opacity-50'>
                OR
            </span>
            <span className='h-1 bg-primary w-full rounded-full opacity-50'></span>
          </div>

          <div className='w-full px-6 mt-6 '>
           
            <button onClick={(e) => {handleOnClick(e)}} className='w-full rounded-lg relative bg h-12 transition-all bg-[#1877f2] gap-2 flex items-center justify-center'>
                <svg fill="#FFFFFF" className='h-w w-8 mb-1 ' viewBox="0 0 24 24"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/></svg>      
                <span className='font-montserrat text-sm font-bold tracking-wide text-white'>Continue with Facebook</span>
              
                </button>
          </div>
          
          {error.error ? <ErrorComponent message={error.message} />  : null}
    </div>
  )
}
