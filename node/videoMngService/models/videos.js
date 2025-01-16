

import mongoose from 'mongoose';

const videosSchema = new mongoose.Schema({
  videoName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  videoSize: { type: Number, required: true }, // Changed from videoize
  userId: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }, // Optional field to track upload time
});

const Videos = mongoose.model("Videos", videosSchema);
export default Videos;
