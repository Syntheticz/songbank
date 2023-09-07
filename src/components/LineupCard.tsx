import React from 'react'

interface Props {
    title : string,
    artist : string,
    color : "bg-primary" | "bg-secondary",
    onClick : (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function LineupCard({ title, artist, color, onClick } : Props) {

  return (
    <div onClick={(e) => {onClick(e)}} className={`${color} w-[320px] md:w-[280px] h-[80px] rounded-lg shadow-slate-500 shadow-md border cursor-pointer ${ color === 'bg-primary' ? "border-tertiary" : "border-secondary"}  ${ color === "bg-primary" ? "hover:bg-secondary" : "hover:bg-primary"} ${ color === 'bg-primary' ?  "hover:border-secondary" :"hover:border-tertiary"} active:bg-tertiary  transition-colors`} >
        <div className='py-3 px-6 w-full flex flex-col h-full'>
            <p className='drop-shadow-primary text-white text-xl font-montserrat font-semibold tracking-wide truncate'>{title}</p>
            <p className='text-[10px] font-montserrat tracking-wider text-white drop-shadow-primary-light'>By: {artist}</p>
        </div>
    </div>
  )
}
