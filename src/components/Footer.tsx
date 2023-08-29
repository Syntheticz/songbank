import Image from 'next/image'
import React from 'react'

import Logo from '../../public/Church_Logo.png'

export default function Footer() {

  
  return (
    <div className='w-full min-w-[372px] h-[280px] px-6 py-4 bg-primary'>
      <Image src={Logo} alt={'logo'}/>
      <div className='w-full flex flex-col gap mt-4'>
         <p className='font-montserrat m-0 text-white font-medium tracking-wider'>Ekklesia Tou Archipoimenou</p>
         <p className='font-montserrat text-xs text-white font-medium tracking-wider'>All rights reserved @ 2023</p>
      </div>
    </div>
  )
}
