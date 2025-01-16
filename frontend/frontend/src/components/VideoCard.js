import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

export default function VideoCard({ url, video, setUpdateUI }) {

    const deleteVideo = () => {
        console.log('Video ID:', video); // Check if video ID is correct

        console.log('Attempting to delete video with ID:', video); // Ensure video ID is correct
        axios.delete(`http://photogallery.com/video/delete/${video}`)
            .then((res) => {
                toast.success('Video deleted successfully.');
                setUpdateUI((cur) => !cur); // Refresh the UI after deletion
            })
            .catch((err) => {
                toast.error('Error deleting video. (frontend)');
            });
    };

    return (
        <div>
            <div className='relative border border-gray-400 rounded-lg h-64 w-72'>
                <video className="h-auto max-w-full rounded-lg" controls style={{ width: '100%', height: '100%' }}>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div onClick={deleteVideo} className='absolute top-0 left-0 p-2 bg-red-200 font-bold text-sm text-red-800 rounded-full m-2 hover:scale-105 cursor-pointer transition-all'>
                    Delete
                </div>
            </div>
        </div>
    );
}
