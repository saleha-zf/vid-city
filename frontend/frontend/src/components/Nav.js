import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

export default function Nav() {
    const navigate = useNavigate()
    const auth = useAuth()
    return (
      <>
          <nav class="bg-[#06283D] border-b border-gray-300">
              <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  {/* Logo Section */}
                  <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                      <img
                          src="https://flowbite.com/docs/images/logo.svg"
                          class="h-8"
                          alt="Flowbite Logo"
                      />
                      <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#FEF5AC]">
                          PhotoGallery
                      </span>
                  </a>
                  {auth.user ? (
                      <button type="button" class="flex md:order-2 space-x-3 rtl:space-x-reverse">
                          <img
                              class="w-8 h-8 rounded-full"
                              src="/user.png"
                              alt="user photo"
                          />
                      </button>
                  ) : (
                      <div class="flex md:order-2 space-x-3 rtl:space-x-reverse">
                          <button
                              onClick={() => navigate('/register')}
                              class="text-[#FEF5AC] bg-[#25316D] hover:bg-[#5F6F94] focus:ring-4 focus:outline-none focus:ring-[#5F6F94] font-medium rounded-lg text-sm px-4 py-2"
                          >
                              Register
                          </button>
                          <button
                              onClick={() => navigate('/')}
                              class="text-[#FEF5AC] bg-[#25316D] hover:bg-[#5F6F94] focus:ring-4 focus:outline-none focus:ring-[#5F6F94] font-medium rounded-lg text-sm px-4 py-2"
                          >
                              Login
                          </button>
                      </div>
                  )}
  
                  {/* Navigation Links */}
                  <div
                      class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                      id="navbar-cta"
                  >
                      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-[#5F6F94] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                          <li>
                              <a
                                  href="#"
                                  class="block py-2 px-3 md:p-0 text-[#FEF5AC] hover:text-[#97D2EC] transition-colors"
                                  aria-current="page"
                              >
                                  Home
                              </a>
                          </li>
                          <li>
                              <a
                                  href="#"
                                  class="block py-2 px-3 md:p-0 text-[#FEF5AC] hover:text-[#97D2EC] transition-colors"
                              >
                                  About
                              </a>
                          </li>
                          <li>
                              <a
                                  href="#"
                                  class="block py-2 px-3 md:p-0 text-[#FEF5AC] hover:text-[#97D2EC] transition-colors"
                              >
                                  Services
                              </a>
                          </li>
                          <li>
                              <a
                                  href="#"
                                  class="block py-2 px-3 md:p-0 text-[#FEF5AC] hover:text-[#97D2EC] transition-colors"
                              >
                                  Contact
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </>
  );
  
}
