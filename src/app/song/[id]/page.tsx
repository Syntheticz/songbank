"use client"

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import { Song } from '@prisma/client'
import { useRouter } from 'next/navigation'



const option = ["PRELUDE", "RESPONSE", "ADULT", "YOUTH", "SPECIAL"]

const options = option.map((option) => (
  <option key={option} value={option}>{option}</option>
))

export default function page({ params } : { params : { id : string}}) {

  const [rawData, setRawdata] = useState({
    id : params.id,
    removal : false,
    lineupType : option[0],
    lineupDate : new Date(Date.now()),
  })
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()
  const [song, setSong] = useState<Song>()

  async function handleOnClick(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()


    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/${params.id}`, rawData)
      setDisabled(true)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/${params.id}`)
        setSong(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  


  useEffect(() => {
    if(!song){
      return
    }

    if(song.linupType){
      setDisabled(true)
    }

  }, [song])

  useEffect(() => {
    if(!song?.lineupDate) { return }


  }, [song?.lineupDate])

  useEffect(() => {


    if(rawData.removal){
      try {
        const updateData = async () => {
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/song/${params.id}`, rawData)
         
        }

        updateData()
        setDisabled(false)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }

    
  }, [rawData.removal])


  return (
    <div className='w-full'>
      <Header/>
      {song != undefined ?
        <div className='w-full'>
        {disabled ? <div className='w-full px-6'>
          <p className='font-montserrat font-bold text-2xl' >Linuped for: {song.linupType}</p>
        </div> : null}
        <div className='w-full p-6 flex flex-col'>
          <div className='w-full mb-10'>
            <p className='font-montserrat font-bold text-[32px]'>{song.title}</p>
            <p className='font-montserrat font-semibold text-[14px] mt-[-8px]'>By: {song.artist}</p>
          </div>
          <p className='whitespace-pre-wrap font-montserrat font-medium'>
            {song.lyrics}
          </p>

          <div className='w-full mt-10 flex gap-6'>
              <div className='w-full h-[56px] flex flex-col'>
                <label className='font-montserrat text-[#757373] font-bold' htmlFor="type">Lineup For:</label>
                <select disabled={disabled}  value={rawData.lineupType} onChange={(e) => { setRawdata({...rawData, lineupType : e.target.value})}} className='font-montserrat bg-primary h-full text-xs text-white font-semibold tracking-wider px-2 border-2 border-tertiary rounded-md' placeholder={"Song Type..."} name="type" id="type">
                  {options}
                </select>
              </div>

              <div className='w-full h-[56px] flex flex-col'>
                <label className='font-montserrat text-[#757373] font-bold' htmlFor="type">Lineup Date</label>
                <input  disabled={disabled}  onChange={(e) => {setRawdata({...rawData, lineupDate : new Date(e.target.value) })}} className='font-montserrat bg-primary font-semibold text-white text-xs p-2 border-2 rounded-md border-tertiary' id="linupDate" type='date'/>
              </div>
          </div>
          
          <div className='w-full py-4 flex gap-4'>
              
              {disabled ? <button onClick={(e) => {setRawdata({...rawData, removal : true})}} className=' hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white'>Remove From Linup</button> : <button onClick={(e) => {handleOnClick(e)}} className=' hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white'>Confirm</button>}
              <button onClick={(e) => {router.push(`/song/edit/${params.id}`)}} className=' hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white'>Edit</button>
          </div>


        </div>
      </div>
      :
        <div className='w-full h-screen'>

        </div>
      }
      <Footer/>
    </div>
  )
}
