import React from 'react'
import { assets } from '../spotify-assets/assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate
  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
      <div className='flex items-center gap-2' >
        
      </div>
        <div className='flex items-center gap-4'>
          <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block'>★HiPodcasts</p>
          <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center'>I</p>
        </div>
    </div>
    <div className='flex items-center gap-2 mt-4'>
    <button className='bg-white text-black px-4 py-1 rounded-2xl'>Sort A-Z</button>
    <button className='bg-white text-black px-4 py-1 rounded-2xl'>Sort Z-A</button>
    
    </div>
    </>
  )
}

export default Navbar