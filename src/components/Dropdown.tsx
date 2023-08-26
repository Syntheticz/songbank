import React from 'react'
import { v4 as uuidv4 } from 'uuid';

interface DropdownProps {
    value?: string;
    options: string[];
    label: string;
    onChange: (newValue: React.ChangeEvent<HTMLSelectElement>) => void;
  }

export default function Dropdown({ value, options, label, onChange } : DropdownProps) {

  const elements = options.map((option) => {
        return <option key={uuidv4()} value={option}>{option}</option>
  })

  return (
    <div className='w-full h-[56px] flex flex-col'>
        <label className='font-montserrat text-[#757373] font-bold' htmlFor="type">{label}</label>
        <select value={value} onChange={(e) => {onChange(e)}} className='font-montserrat bg-primary h-full text-xs text-white font-semibold tracking-wider px-2 border-2 border-tertiary rounded-md' placeholder={"Song Type..."} name="type" id="type">
            {elements}
        </select>
  </div>
  )
}
