import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { convertBytes, getPercentageStorage } from "../utils/helper";
import axios from 'axios'

export default function UserStorage({updateUI}) {
    const [storage, setStorage] = useState('')
    const [percentage, setPercentage] = useState('')
    const auth = useAuth()

    const fetchStorage = ()=>{
        axios.get(`http://photogallery.com/api/storage/user/${auth.user?._id}`)
        .then((res)=>{
            setStorage(convertBytes(res.data?.data.totalStorage))
            setPercentage(getPercentageStorage(res.data?.data.totalStorage, 52428800).toFixed(2))

                // Check if storage usage is 80% or higher
                if (percentage >= 80) {
                    alert("Warning: You have used 80% of your storage limit.");
                }

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchStorage()
    },[updateUI])

  return (
    <>
      <div className="p-3 border border-gray-400 mb-4 w-1/2 mr-3">
        <div className="flex">
        <p>Storage</p>
        <p className={`ml-auto ${storage >= 40 ? 'text-red-500' : ''}`}>
  {storage ? storage : 0} Used of 50MB
          </p>   
          
          </div>
        <div class="w-full bg-gray-200 mt-2 rounded-full h-2.5 dark:bg-gray-700">
          <div class="bg-blue-600 h-2.5 rounded-full" style={{width: `${percentage?percentage:0}%`}}></div>
        </div>
      </div>
    </>
  );
}
