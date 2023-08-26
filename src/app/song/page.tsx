"use client"

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Song } from '@prisma/client'
import SongCard from '@/components/SongCard'
import { useRouter } from 'next/navigation'




 

export default function page() {

  const router = useRouter()
  const [songs, setSongs] = useState<Array<Song>>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song`)
      const data : Array<Song> = res.data

      setSongs(data)
    }

    fetchData()
  } ,[])

  console.log(songs)

  const cards = songs.length > 0 ? 
    songs.map((song) => {
      return <SongCard onClick={(e) => {
        router.push(`/song/${song.id}`)
      }} artist={song.artist} lyrics={song.lyrics} title={song.title} key={song.id}/>
    })
  : <div className='w-full h-screen'></div>

  return (
    <div className='w-full '>
      <Header/>
      <div className='w-full flex flex-col gap-8 px-6 py-12'>
         
         {cards}
      </div>
      <Footer/>
    </div>
  )
}
