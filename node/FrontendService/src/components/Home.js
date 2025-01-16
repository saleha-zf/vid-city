import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}

      <div style={{ backgroundColor: '#06283D', color: '#FEF5AC', minHeight: '100vh' }}>


      <section class="bg-[#06283D] text-[#FEF5AC] mt-16">
        <div class="py-8 px-4 mx-auto max-w-screen- text-center lg:py-16">
        <h1 class="mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl lg:text-5xl px-8">
  Vid-city: Your Cloud-Based Video Solution
</h1>

          <p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48">
          Experience the future of video storage with Vid City – the ultimate cloud-based platform to keep your memories safe and organized.
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/login"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-[#FEF5AC] bg-[#c83074] rounded-lg hover:bg-[#D74C64] focus:ring-4 focus:ring-[#97D2EC]"
            >
              Log In
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <Link
              to="/register"
              class="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-[#FEF5AC] bg-[#e13985] border border-[#EB5A75] rounded-lg hover:bg-[#D74C64] focus:ring-4 focus:ring-[#97D2EC]"
              >
              Register
            </Link>
          </div>
        </div>
      </section>

{/* Logos Section */}
<section class="bg-[#5F6F94] text-[#FEF5AC] py-24">
  <div class="container mx-auto px-5">
    <h2 class="text-center text-3xl font-semibold mb-12">Our Reliable Tech Partners</h2>
    <div class="flex flex-wrap justify-center gap-8">
      {/* MongoDB */}
      <div class="bg-[#06283D] rounded-lg shadow-lg p-6 w-64 text-center transition-colors duration-300 hover:bg-[#c83074]">
        <img
          src="mongo.png"
          alt="MongoDB Logo"
          class="mx-auto h-20 w-auto mb-4"
        />
        <h3 class="text-lg font-bold">MongoDB</h3>
      </div>

      {/* Cloudinary */}
      <div class="bg-[#06283D] rounded-lg shadow-lg p-6 w-64 text-center transition-colors duration-300 hover:bg-[#c83074]">
        <img
          src="cloud.png"
          alt="Cloudinary Logo"
          class="mx-auto h-20 w-auto mb-4"
        />
        <h3 class="text-lg font-bold">Cloudinary</h3>
      </div>
    </div>
  </div>
</section>

    </div>

    </div>
  
  );
}
