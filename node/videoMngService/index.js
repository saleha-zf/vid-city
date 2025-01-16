import express from "express";

import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 8001;

// Configure
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sfatimabese22seecs:123@vid-city.jhkzr.mongodb.net/test?retryWrites=true&w=majority&appName=vid-city');
const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import videoRouter from "./controller/videoController.js";

app.use("/api/video", videoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
