import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

export default function Nav() {
    const navigate = useNavigate()
    const auth = useAuth()

    //logout
    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

  return (
    <>
<nav class="bg-[#000a13] border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="logo vid-city.png" class="h-10 ml-12" alt="vid-city"  />
  </a>
  {auth.user ? 
  <button type="button" class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <button 
      onClick={() => navigate('/drive')} 
      type="button" 
      class="text-white bg-[#5F6F94] hover:bg-[#25316D] focus:ring-4 focus:outline-none focus:ring-[#97D2EC] font-medium rounded-lg text-sm px-4 py-2 text-center mr-1">
      Drive
    </button>
    <button 
      onClick={handleLogout} 
      type="button" 
      class="text-white bg-[#5F6F94] hover:bg-[#25316D] focus:ring-4 focus:outline-none focus:ring-[#97D2EC] font-medium rounded-lg text-sm px-4 py-2 text-center mr-1">
      Logout
    </button>
  </button> 
: 
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <button 
      onClick={() => navigate('/register')} 
      type="button" 
      class="text-white bg-[#5F6F94] hover:bg-[#25316D] focus:ring-4 focus:outline-none focus:ring-[#97D2EC] font-medium rounded-lg text-sm px-4 py-2 text-center mr-1">
      Register
    </button>
    <button 
      onClick={() => navigate('/login')} 
      type="button" 
      class="text-white bg-[#5F6F94] hover:bg-[#25316D] focus:ring-4 focus:outline-none focus:ring-[#97D2EC] font-medium rounded-lg text-sm px-4 py-2 text-center">
      Login
    </button>
  </div>
}


  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
   
  </div>
  </div>
</nav>

    </>
  )
}
