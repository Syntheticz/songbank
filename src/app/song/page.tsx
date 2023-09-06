"use client"

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Song } from '@prisma/client'
import SongCard from '@/components/SongCard'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'




 

export default function page() {

  const router = useRouter()
  const [songs, setSongs] = useState<Array<Song>>([])
  const [searching, setSearching] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [queriedSongs, setQueriedSongs] = useState<Array<Song>>([])
  const [cards, setCards] = useState<React.JSX.Element | React.JSX.Element[]>()
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/song')
      const data : Array<Song> = await res.json()

      setSongs(data)
    }

    fetchData()
  } ,[])

  useEffect(() => {
    if(songs.length === 0) { setCards(<div className='w-full h-screen'></div>) }

    setCards(songs.map((song) => {
      return <SongCard onClick={(e) => {
        router.push(`/song/${song.id}`)
      }} artist={song.artist} lyrics={song.lyrics} title={song.title} key={song.id}/>
    }))
  
  }, [songs])


  useEffect(() => {
    if (!searching) { return }

    setQueriedSongs(songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase())))

    setCards(queriedSongs.map((song) => {
      return <SongCard onClick={(e) => {
        router.push(`/song/${song.id}`)
      }} artist={song.artist} lyrics={song.lyrics} title={song.title} key={song.id}/>
    }))

    if (query === '') {
      setCards(songs.map((song) => {
        return <SongCard onClick={(e) => {
          router.push(`/song/${song.id}`)
        }} artist={song.artist} lyrics={song.lyrics} title={song.title} key={song.id}/>
      }))
    }
  }, [query])

  

  return (
    <div className='w-full '>
      <Header/>
      <div className='w-full min-w-[360px] flex flex-col justify-center pb-64 relative gap-8 px-6 py-12 '>
         <div className='w-full min-w-[300px] h-14 relative items-center flex'>
           <input onFocus={() => {}} onChange={(e) => {setSearching(true);setQuery(e.target.value) }} className='relative border-2 rounded-md font-montserrat font-semibold text-xl px-4 border-primary h-full w-full' placeholder='Search...' type="text" />
           <div className='absolute right-[3%]'>
             <FontAwesomeIcon size='2x' icon={faMagnifyingGlass} color='#015A7F' />
           </div>
         </div>
         {queriedSongs.length > 0 || !searching ? cards : <div className='w-full h-[40vh] flex items-center justify-center'>
            <p className='font-montserrat font-bold text-2xl text-gray-400'>Song unavailable</p>
          </div>}


      </div>
      <Footer/>
    </div>
  )
}
