'use client'
import React from 'react'
import { gql } from '@apollo/client';
export const dynamic = "force-dynamic";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`query {
  launchLatest {
    mission_name
  }
}`


export default function Home() {

  const {data} = useSuspenseQuery(query);

  function handleOnClick(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
    console.log(data)
  }

  return (
    <div className="w-4 h-4 bg-cyan-100">
      <button onClick={(e) => {handleOnClick(e)}} className='bg-slate-500 hover:bg-sky-400 active:bg-slate-900'>Test</button>
    </div>
  )
}
