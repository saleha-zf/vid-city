import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your server for registration
      const response = await axios.post(
        `${process.env.REACT_APP_USER_SERV}/api/user/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(response);
      navigate("/login");
      toast.success('Registration successful')
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );

      toast.error('Registration failed')
    }
  };

  return (
    <>

      <div className="min-h-screen bg-[#06283D] py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#97D2EC] to-[#5F6F94] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-[#06283D]">Register</h1>
              </div>
              <div className="divide-y  divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-[#06283D] sm:text-lg sm:leading-7">
                  <div>
                    <label for="first_name" className="block mb-2 text-sm font-medium text-[#06283D]">Full Name</label>
                    <input 
                      onChange={(e) => setName(e.target.value)} 
                      type="text" 
                      id="first_name" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#97D2EC] focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Saleha" 
                      required 
                    />
                  </div>
  
                  <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-[#06283D]">Email</label>
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      type="email" 
                      id="email" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#97D2EC] focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="saleha@gmail.com" 
                      required 
                    />
                  </div>
  
                  <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-[#06283D]">Password</label>
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      type="password" 
                      id="password" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#97D2EC] focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="password" 
                      required 
                    />
                  </div>
  
                  <div className="relative">
                    <button 
                      onClick={handleSubmit} 
                      className="bg-[#5F6F94] text-white w-full hover:bg-[#25316D] rounded-md px-2 py-1 focus:ring-4 focus:ring-[#97D2EC]"
                    >
                      Submit
                    </button>
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
