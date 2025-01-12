import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes,updateToPastes,removeFromPastes,resetAllPastes} from './features/paste/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  const[searchTerm , setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = searchTerm ? pastes.filter( (paste) => 
    typeof paste.title === 'string' && paste.title.toLowerCase().includes(searchTerm.toLowerCase())
   ) : pastes;

   const sortedData = [...filteredData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
   }

   function handleCopy(pasteContent){
      navigator.clipboard.writeText(pasteContent);
      toast("Successfully Copied !")
   }

  return (
    <div className='flex flex-col items-center '>
      <input className='m-3 w-[500px] border-2 border-black p-2' type="text" placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <div className='flex flex-col items-center mt-4 gap-3'>
        {sortedData.length > 0 ? (
            sortedData.map( (paste)=>(
              
              <div className='border-2 border-black flex flex-col items-center p-3 w-[500px]' key={paste?._id}>
 
                  <div className='text-black'>{paste.title}</div>
                  <div className='text-black'>{paste.value}</div>
                  <div className='flex flex-row gap-2 m-4'>
                    <button className='border-2 border-black p-1'><NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink></button>
                    <button className='border-2 border-black p-1'><NavLink to={`/pastes/${paste?._id}`}>View</NavLink></button>
                    <button className='border-2 border-black p-1' onClick={ ()=>
                      handleDelete(paste?._id) }>Delete</button>
                    <button className='border-2 border-black p-1' onClick={() => handleCopy(paste?.value)}>Copy</button>
                    <button className='border-2 border-black p-1'>Share</button>
                  </div>
                  <div>{paste.createdAt}</div>

              </div>

            )
           )
          ) : (
            <div>No Matching Pastes Found.</div>
          )}
      </div>
    </div>
  )
}

export default Paste
