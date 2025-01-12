import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-10 justify-evenly p-5'>
      
        <NavLink to="/" className="text-blue-600">Home</NavLink>
        <NavLink to="/pastes" className="text-blue-600">Pastes</NavLink>

    </div>
  )
}

export default Navbar
