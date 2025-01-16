import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard'; // Make sure you have VideoCard component
import toast from 'react-hot-toast'
import UserStorage from './UserStorage';
import UserUsage from './UserUsage';
import { useAuth } from '../context/auth';

export default function Drive() {
    const [updateUI, setUpdateUI] = useState(false);
    const [videos, setVideos] = useState([]);
    
    const auth = useAuth();

    console.log("Auth object:", auth);
console.log("Auth user:", auth?.user);


    if (!auth.user) {
        return <div>Loading user data...</div>;
    }
    else
    {
        console.log(auth.user.name);
    }

    // Handle file selection (check for video files)
    const handleFileChange = (event) => {   
        const file = event.target.files[0];
        if (file && file.type.includes("video")) {
            handleUpload(file);
        } else {
            alert('Please select a video file before uploading');
        }
        event.target.value = null;
    };

    // Upload video
    const handleUpload = async (selectedFile) => {
        if (!selectedFile) {
            alert('Please select a file before uploading');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('video', selectedFile);  
            formData.append('userId', auth.user._id);


            const Uploadurl = 'http://photogallery/video/upload';
            console.log("Uploading to URL:", Uploadurl);
            const response = await axios.post(Uploadurl, formData);

            const { error } = await toast.promise(response, {
                loading: 'Uploading video...',
                success: 'Video uploaded successfully',
                error: (err) => err.response.data.msg,
            });

            if (!error) {
                setUpdateUI(!updateUI);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Fetch videos
    const fetchVideos = () => {
        axios.get(`http://photogallery.com/videos/${auth.user?._id}`)
            .then((res) => {
                setVideos(res.data);
            })
            .catch((err) => {
                console.log('Error fetching videos:', err);
            });
    };

    // Fetch videos whenever UI is updated
    useEffect(() => {
        fetchVideos();
    }, [updateUI]);

    return (


        
        <div className='m-8'>
            
            <div className='mb-5'> 
                <h1 className='text-xl font-semibold text-white mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl md:text-5xl px-8"'>
                    Welcome, {auth.user?.name || "User"}!
                </h1>
            </div>

            <div className='flex'>
                <UserStorage updateUI={updateUI} />
                <UserUsage updateUI={updateUI} />
            </div>
            <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Video</label>
                <div className='flex'>
                    <input
                        className="block w-full mr-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                        id="file_input"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            {console.log('Videos array:', videos)}

            <div className="flex flex-wrap gap-6">
                
                {videos.map((video) => (
                    <VideoCard url={video.url} video={video._id} setUpdateUI={setUpdateUI} /> 
                ))}
            </div>
        </div>
    );
}
