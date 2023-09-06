import React from 'react'

export default function errorComponent({ message } : { message : string }) {
  return (
    <div className='w-full px-6 mt-4'>
              <div className='w-full h-14 bg-red-500 flex items-center px-4 rounded-md border-2 border-red-600'>
                  <p className='font-montserrat text-sm text-white'>{message}</p>
              </div>
          </div>
  )
}
