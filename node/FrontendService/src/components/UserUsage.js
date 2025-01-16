import React, { useEffect, useState } from "react";
import { convertBytes, getPercentageStorage } from "../utils/helper";
import { useAuth } from "../context/auth";
import axios from 'axios'
export default function UserUsage({updateUI}) {

    const [usage, setUsage] = useState('')
    const [percentage, setPercentage] = useState('')
    const auth = useAuth()

    const fetchUsage = ()=>{
        axios.get(`${process.env.REACT_APP_USAGE_SERV}/api/usage/user/${auth.user?._id}`)
        .then((res)=>{
          console.log(res.data);  // Log the response to check the data structure
            setUsage(convertBytes(res.data?.data.totalUsage))
            setPercentage(getPercentageStorage(res.data?.data.totalUsage, 104857600).toFixed(2))

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchUsage()
    },[updateUI])

  return (
    <>
      <div className="p-3 bg-[#000a13] border rounded-lg h-full border-[#97D2EC] mb-4 w-full mr-3 flex items-center hover:bg-[#2d2d2d]">
      <div className="w-full">

      <div className="flex">
        <p>Daily Usage</p>
        <p className="ml-auto">{usage?usage:0} Used of 100MB</p>
        </div>
        <div class="w-full bg-[#fff3f3] mt-2 rounded-full h-5 dark:bg-gray-700">
          <div class="bg-[#c83074] h-5 rounded-lg" style={{width: `${percentage?percentage:0}%`}}></div>
        </div>
      </div>
        </div>
    </>
  );
}
