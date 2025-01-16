import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server for registration
      const response = await axios.post(`${process.env.REACT_APP_USER_SERV}/api/user/login`, {
        email,
        password,
      });

      auth.login(response.data.data)
      navigate('/drive')

    } catch (error) {
      toast.error('Login failed')
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div class="min-h-screen bg-[#06283D] py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#97D2EC] to-[#5F6F94] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold text-[#06283D]">Login</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-[#06283D] sm:text-lg sm:leading-7">
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@gmail.com" required />
                  </div>
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-[#06283D] ">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required />
                  </div>
                  <div class="relative">
                    <button onClick={handleSubmit} class="bg-[#5F6F94] text-white w-full hover:bg-[#25316D] rounded-md px-2 py-1 focus:ring-4 focus:ring-[#97D2EC]">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
