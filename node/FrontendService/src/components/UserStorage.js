import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { convertBytes, getPercentageStorage } from "../utils/helper";
import axios from 'axios'

export default function UserStorage({ updateUI }) {
  const [storage, setStorage] = useState('')
  const [percentage, setPercentage] = useState('')
  const auth = useAuth()

  const fetchStorage = () => {
    axios.get(`${process.env.REACT_APP_STORAGE_SERV}/api/storage/user/${auth.user?._id}`)
      .then((res) => {
        console.log(res.data);  // Log the response to check the data structure

        
        setStorage(convertBytes(res.data?.data.totalStorage))
        setPercentage(getPercentageStorage(res.data?.data.totalStorage, 52428800).toFixed(2))
        console.log("[DEBUG] total storage=", res.data?.data.totalStorage);

      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchStorage()
  }, [updateUI])

  return (
    <>
      <div className="p-3 bg-[#000a13] border rounded-lg h-full border-[#97D2EC] mb-4 w-full mr-3 flex items-center hover:bg-[#2d2d2d]">
      <div className="w-full">

          <div className="flex">
            <p>Storage</p>
            <p className={`ml-auto ${storage >= 40 ? 'text-red-500' : ''}`}>
  {storage ? storage : 0} Used of 50MB
          </p>        
     </div>
          <div class="w-full bg-[#fff3f3] mt-2 rounded-full h-5 dark:bg-gray-700">
            <div class="bg-[#c83074] h-5 rounded-lg" style={{ width: `${percentage ? percentage : 0}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
