import React from 'react'


import LineupCard from './LineupCard'

export default function Category({ title , cards} : { title : String, cards : Array<React.JSX.Element | null>}) {
  return (
    <div className='max-w-[1280px] w-full px-[24px] flex gap-4 flex-col items-center justify-center'>
            <div className='w-full '>
                <p className='font-montserrat font-bold text-2xl drop-shadow-prui'>{title}</p>
            </div>
            <div className='w-full gap-4 flex md:flex-row md:justify-start lg:flex-row flex-wrap justify-center flex-col items-center'>
             {cards.length === 0 ? <div className='w-full h-[200px] flex justify-center items-center'>
              <p className='text-gray-400 font-montserrat font-semibold text-xl'>There are no songs lineuped yet.</p>
             </div> : cards} 
            </div>
    </div>
  )
}
