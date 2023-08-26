

import React from 'react'

export default function SongCard({title, artist, lyrics, onClick} : {title : string, artist : string, lyrics : string, onClick : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) {
  

  return (
    <div className='min-w-[328px] px-[16px] py-[12px] h-[200px] relative bg-primary rounded-md shadow-lg'>
        <div className='w-full h-full flex flex-col items-start'>
            <p className='font-montserrat text-white text-xl font-semibold tracking-wide line-clamp-1'>{title}</p>
            <p className='font-montserrat text-white text-xs font-medium tracking-wider'>By: {artist}</p>
            <div className='w-full h-[40%] py-2'>
                <p className='font-montserrat text-white text-xs overflow-hidden line-clamp-3 font-light tracking-wider'>{lyrics}</p>
            </div>
            <button onClick={(e) => {onClick(e)}} className='absolute bottom-[10%] bg-white text-primary font-montserrat  text-lg font-bold p-1 border-4 border-white rounded-md shadow-md hover:bg-primary hover:text-white transition-all active:text-tertiary active:bg-white'>View</button>

        </div>
    </div>
  )
}
