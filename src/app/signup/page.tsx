import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Signup from '@/components/Signup'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession()

  if(session){
    redirect('/')
  }

  return (
    <div className='w-full'>
        <Header/>
          <div className='w-full h-screen px-6 -mt-12 flex items-center justify-center'>
              <Signup/>
          </div>  
        <Footer/>
    </div>
  )
}
