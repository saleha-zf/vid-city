import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export default function VideoCard({ url, video, setUpdateUI }) {

    console.log('Props in VideoCard:', { url, video });

    const deleteVideo = (e) => {
        e.stopPropagation(); // Stop event propagation to prevent the anchor link from being triggered
        console.log('Video ID:', video); // Check if video ID is correct

        axios.delete(`${process.env.REACT_APP_IMAGE_SERV}/api/video/${video}`)

            .then((res) => {
                toast.success('Video deleted successfully.');
                setUpdateUI((cur) => !cur); // Refresh the UI after deletion
            })
            .catch((err) => {
                toast.error('Error deleting video.');
            });
    }

    return (
        <div>
            <div className='relative border border-gray-400 rounded-lg h-64 w-72 hover:scale-105 transition-all cursor-pointer'>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <video className="h-auto max-w-full rounded-lg" controls style={{ width: '100%', height: '100%' }}>
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </a>
                <div onClick={(e) => deleteVideo(e)} className='absolute top-0 right-0 m-2 p-2 rounded-full bg-red-50 hover:bg-red-200 hover:scale-110 cursor-pointer transition-all'>
                    <img src="trash-bin.png" className='h-8 w-8' alt="Delete Video" />
                </div>
            </div>
        </div>
    );
}
