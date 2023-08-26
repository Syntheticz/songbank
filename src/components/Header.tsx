"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Search from '../../public/Search.svg'
import Menu from '../../public/Menu.svg'
import logo from '../../public/logo.png'
import Logo from '../../public/Logooo.png'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Header() {
  const [clicked, setClicked] = useState(false)
  const [rotation, setRotation] = useState(false)

  useEffect(() => {
    if(!clicked){
      setRotation(false)
      return
    }

    setTimeout(() => {setRotation(rotation ? false : true)}, 300)
  }, [clicked])

  const router = useRouter()

  return (
    <div className='min-w-[360px] w-full h-[64px] px-[8px] bg-white py-[4px] flex top-0 items-center shadow-lg mb-8 md:mb-4 sticky z-[999]'>
      <Image className='cursor-pointer relative' onClick={() => {router.push('/')}} src={logo} alt={'Logo'} width={56}/>

      <div onClick={() => {setClicked(false)}} className={`duration-300 ease-in-out h-full ${clicked ? "w-full " : "w-0"} bg-black bg-opacity-40 fixed top-0 right-0 z-0`}>
        <div className={`bg-primary z-30  w-[60%] h-[100%] absolute right-0 top-0`}>
            <div onClick={() => {router.push('/')}} className='w-full mt-32 h-[160px] flex flex-col items-center justify-center'>
              <Image src={Logo} alt='Logo' width={100} height={100} objectFit={'contain'}/>
             
            </div>

            <div onClick={() => {router.push('/')}} className='w-full h-14 bg-tertiary mt-8 flex items-center px-4'>
              <p className='text-white font-montserrat text-2xl font-semibold'>Home</p>
            </div>
            <div onClick={() => {router.push('/song/add')}} className='w-full h-14 bg-tertiary flex items-center px-4'>
              <p className='text-white font-montserrat text-2xl font-semibold'>Add Song</p>
            </div>
            <div onClick={() => {router.push('/song/')}} className='w-full h-14 bg-tertiary flex items-center px-4'>
              <p className='text-white font-montserrat text-2xl font-semibold'>View Songs</p>
            </div>
           

        </div>
      </div>

      <div className='w-full h-full flex items-center justify-end '>
        <Image className={`${clicked ? "hidden" : "block"}`}   src={Search} alt={'Logo'}/>
        <button onClick={() => {
          setClicked(clicked ? false : true)
        }} className={` z-20 w-[44px] h-[44px] duration-300 ease-in-out ${clicked ? 'block' : 'flex flex-col'} ${clicked ? 'fixed' : 'block'}`} >
          <hr className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${clicked ? 'translate-y-full' : 'block'} ${rotation ? 'rotate-45' : 'block'} ${clicked ? 'bg-white' : 'bg-primary'} `}/>
          <hr className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${rotation ? 'rotate-45' : 'block'} ${clicked ? 'bg-white' : 'bg-primary'} `} />
          <hr className={`w-full my-auto duration-300 ease-in-out h-2 border-none rounded-md ${clicked ? '-translate-y-full' : 'block'} ${rotation ? '-rotate-45' : 'block'} ${clicked ? 'bg-white' : 'bg-primary'}`}/>
        </button>
        


      </div>

      
  </div>
  )
}
