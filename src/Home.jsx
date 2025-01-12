import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from './features/paste/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector( (state) => state.paste.pastes )


  useEffect(() => {

    const paste = allPastes.find( (p)=> p._id === pasteId )


    if(paste)
    {
      setTitle(paste.title);
      setValue(paste.value);
    }


  }, [pasteId])
  

  function createPaste(){

    if(title == "" || value == ""){
      
      if(title == "")
        toast("Title Cannot be Empty")
      else
        toast("Content Cannot be Empty")

      return;
    }

    const paste = {
      title : String(title),
      value : String(value),
      _id : pasteId || Date.now().toString(),
      createdAt : new Date().toISOString(),
    };

    if(pasteId)
    {
      dispatch(updateToPastes(paste));
    }
    else
    {
      dispatch(addToPastes(paste));
    }

    //cleaning
    setTitle("");
    setValue("");
    setSearchParams({});

  }

  return (
    <div className='flex flex-col gap-4 mx-5 mt-5'>
      <div className='flex flex-row gap-5'>
        <input className='p-2 border-2 shadow-sm rounded-md border-black' type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <button onClick={createPaste} className='border-2 border-black shadow-sm rounded-md p-2'>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button>
      </div>

      <textarea className='min-h-[500px] border-2 border-black shadow-md rounded-md p-2' placeholder='Enter Content' value={value} onChange={(e)=>{ setValue(e.target.value) }} ></textarea>
    </div>
  ) 
}

export default Home
