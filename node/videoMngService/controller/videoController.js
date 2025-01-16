import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import multer from "multer";
import axios from "axios";
import Videos from "../models/videos.js"; // Update to use a Videos model

const router = Router();

const LOGGING_API_URL = 'http://loggingservice-srv:8004/log';

// Helper function to send log events to the logging API
const logToApi = async (event, message) => {
  try {
    await axios.post(LOGGING_API_URL, { event, message });
  } catch (error) {
    console.error('Error logging to API:', error.message);
  }
};

// Multer middleware for handling video uploads
const upload = multer({
  limits: { fileSize: 52428800 }, // File size limit (50MB)
}).single("video");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "djnag1puo",
  api_key: "974439875845849",
  api_secret: "G3muSCGrgX1HnB3ndFRruSuFV0I",
});


// Video Upload Endpoint
router.post("/upload", upload, async (req, res) => {
  console.log(req.file);

  if (!req.file) {
    await logToApi('Video upload failed', 'No file uploaded');
    return res.status(400).json({ error: "No file uploaded" });
  }
    //sending http request to storage service

  const totalSize = req.file.size;
  const user = req.body.userId;

  // Update user's storage
  let userStorage;
  userStorage = await axios.get(
    `${process.env.STORAGE_SERVICE_URL}/api/storage/user/${user}`
  );
//if storage is empty
  if (!userStorage.data.data) {
    userStorage = await axios.post(
      `${process.env.STORAGE_SERVICE_URL}/api/storage/`,
      { totalStorage: 0, user }
    );
  }

  console.log("current user's total storage:", userStorage.data.data.totalStorage);
  if (userStorage.data.data.totalStorage + totalSize > process.env.STORAGE_LIMIT) {
    return res.status(500).json({
      status: false,
      msg: "Limit Exceeded. Total storage limit is 50MB",
    });
  }

  // alert for 80 percentage storage
  if (userStorage.data.data.totalStorage + totalSize >= process.env.STORAGE_LIMIT * 0.8) {
    // Send a warning but do not block the upload
    console.warn("Warning: You have used 80% of your storage.");
    res.setHeader('Storage-Warning', 'You have used 80% of your storage limit.');
  }
  
  
  // Update user's daily usage
  let userDailyUsage;
  userDailyUsage = await axios.get(
    `${process.env.USAGE_SERVICE_URL}/api/usage/user/${user}`
  );

  if (!userDailyUsage.data.data) {
    userDailyUsage = await axios.post(
      `${process.env.USAGE_SERVICE_URL}/api/usage/`,
      { totalUsage: 0, user }
    );
  }

  if (userDailyUsage.data.data.totalUsage + totalSize > process.env.DAILY_USAGE_LIMIT) {
    return res.status(500).json({
      status: false,
      msg: "Limit Exceeded. Daily usage limit is 100MB",
    });
  }

      //sending updating requestes
      const newTotalStorage = userStorage.data.data.totalStorage + totalSize;
      await axios.put(
        `${process.env.STORAGE_SERVICE_URL}/api/storage/user/${user}`,
        { totalStorage: newTotalStorage }
      );


      const newTotalUsage = userDailyUsage.data.data.totalUsage + totalSize;
      await axios.put(`${process.env.USAGE_SERVICE_URL}/api/usage/user/${user}`, {
        totalUsage: newTotalUsage,
      });


  const b64 = req.file.buffer.toString("base64");
  const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "video", // Explicitly handle videos
      
    });

    console.log("debug:in the try block when upload videos");

    // Save video URL and public ID in the database
    const newVideo = new Videos({
      videoName: req.file.originalname,
      videoSize: req.file.size,
      url: result.url,
      publicId: result.public_id,
      userId: req.body.userId,
    });

    await newVideo.save();

    res.json({ file: newVideo, message: "Video uploaded successfully" });
    await logToApi('Video upload successful', `Video uploaded successfully for user ID ${req.body.userId}`);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GetAllVideos Endpoint
router.get("/", async (req, res) => {
  try {
    const videos = await Videos.find();
    await logToApi('Retrieve all videos', 'All videos retrieved successfully');
    res.json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    await logToApi('Retrieve all videos failed', 'Internal Server Error');
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Videos by User ID Endpoint
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const videos = await Videos.find({ userId });
    await logToApi('Retrieve videos by user ID', `Videos retrieved successfully for user ID ${userId}`);
    res.json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    await logToApi('Retrieve videos by user ID failed', 'Internal Server Error');
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Video Endpoint
router.delete("/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await Videos.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    console.log("Deleting video with public ID:", video.publicId);

    await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
    await Videos.findByIdAndDelete(videoId);

    const userStorage = await axios.get(
      `${process.env.STORAGE_SERVICE_URL}/api/storage/user/${video.userId}`
    );

    const totalSize = video.videoSize;

    console.log("total size of video", totalSize);
    console.log("video id:", video);
    const newTotalStorage = userStorage.data.data.totalStorage - totalSize;

    await axios.put(
      `${process.env.STORAGE_SERVICE_URL}/api/storage/user/${video.userId}`,
      { totalStorage: newTotalStorage }
    );

    await logToApi('Video deletion successful', `Video deleted successfully for user ID ${video.userId}`);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    await logToApi('Video deletion failed', 'Internal Server Error');
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
