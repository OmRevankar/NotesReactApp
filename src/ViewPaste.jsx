import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector( (state) => state.paste.pastes );

  const paste = allPastes.find( (a)=> a._id === id );

  return (
    <div className='flex flex-col gap-4 mx-5 mt-5 cursor-not-allowed'>

      <div className='outline-none p-2 border-2 shadow-sm rounded-md border-black'>{paste.title}</div>
      <div className='outline-none min-h-[500px] border-2 border-black shadow-md rounded-md p-2'>{paste.value}</div>

    </div>
  )
}

export default ViewPaste
