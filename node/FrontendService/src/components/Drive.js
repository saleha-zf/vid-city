import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard'; // Modify this to create a VideoCard component
import toast from 'react-hot-toast'
import UserStorage from './UserStorage';
import UserUsage from './UserUsage';
import { useAuth } from '../context/auth';

export default function Drive() {
    const [updateUI, setUpdateUI] = useState(false);
    const [videos, setVideos] = useState([]); // Change state to store videos

    const auth = useAuth();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleUpload(file);
        }
        event.target.value = null; // Reset file input
    };

    const handleUpload = async (selectedFile) => {
        if (!selectedFile) {
            alert('Please select a file before uploading');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('video', selectedFile); // Append video instead of image
            formData.append('userId', auth.user._id);

            const response = axios.post(`${process.env.REACT_APP_IMAGE_SERV}/api/video/upload`, formData); // Use video upload endpoint

            const { error } = await toast.promise(response, {
                loading: 'Uploading video...',
                success: 'Video uploaded successfully',
                error: (err) => err.response.data.msg,
            });

            if (!error) {
                setUpdateUI(!updateUI); // Toggle the UI to reflect new video
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideos = () => {
        axios.get(`${process.env.REACT_APP_IMAGE_SERV}/api/video/user/${auth.user?._id}`)
            .then((res) => {
                setVideos(res.data); // Set videos in state
            })
            .catch((err) => {
                console.log('Error fetching videos:', err);
            });
    };

    useEffect(() => {
        fetchVideos();
    }, [updateUI]);

    return (
        <div className='m-8 mt-10'>

<div className='mb-5'>
               
<h1 className='text-xl font-semibold text-white "'>
Welcome, {auth.user?.name || "User"}!
               </h1>
           </div>
           
            <div className='mb-5 flex flex-col md:flex-row w-full'>
                <div className="flex items-center justify-center w-full md:w-1/2 mb-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500">
                        <div className="flex flex-col items-center justify-center pt-3 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, MKV</p>
                        </div>
                        <input onChange={(e) => handleFileChange(e)} id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/avi,video/mkv" />
                    </label>
                </div>

                <div className='flex flex-col md:w-1/2 w-full md:ml-5 ml-0'>
                    <UserStorage updateUI={updateUI} />
                    <UserUsage updateUI={updateUI} />
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                

                {videos.map((video) => (
                    <VideoCard video={video._id} url={video.url} setUpdateUI={setUpdateUI} /> // Updated to use VideoCard
                ))}
            </div>
        </div>
    );
}
