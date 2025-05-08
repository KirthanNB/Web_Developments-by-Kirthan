import React from 'react'

const Navbar = () => {
  return (
<nav className='bg-[#0000004d] sticky border-[#a29b9b] border-x-6  top-0 z-5 text-[#ffffff] flex justify-between items-center p-3'>
  <div className='flex items-center space-x-4'>
    <img src="../src/assets/react.svg" alt="Logo" className='w-8 cursor-pointer invert-100' />
    <h1 className='text-2xl cursor-pointer font-extrabold -translate-x-4'>Ignited</h1>
  </div>
  <span>
    <ul className='flex space-x-4'>
    <li className='list-none text-white cursor-pointer rounded-3xl bg-[#084e3349] font-bold border-[3px] flex justify-center items-center border-[#ffffff58] p-3 hover:transform hover:scale-105 hover:shadow-lg transition-transform duration-10 hover:bg-[#4b2f5511] hover:text-[#6cffccae]'>Home</li>
    <li className='list-none text-white cursor-pointer rounded-3xl bg-[#084e3349] font-bold border-[3px] flex justify-center items-center border-[#ffffff58] p-3 hover:transform hover:scale-105 hover:shadow-lg transition-transform duration-10 hover:bg-[#4b2f5511] hover:text-[#6cffccae]'>Your Tasks</li>
    </ul>
  </span>
</nav>
  )
}

export default React.memo(Navbar);