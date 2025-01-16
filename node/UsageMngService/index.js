import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cron from "node-cron";
import { usageModel } from "./model/usageModel.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const server = http.createServer(app);
server.listen(8003, () => {
  console.log("Server running on http://localhost:8003/");
});

const MONGO_URL = "";
mongoose.connect('mongodb+srv://sfatimabese22seecs:123@vid-city.jhkzr.mongodb.net/test?retryWrites=true&w=majority&appName=vid-city');
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

//test route
app.get("/", (req, res) => {
  res.send("Hello World! From Usage service");
});

//import routes
import usageRoute from "./routes/usageRoute.js";

//use routes
app.use("/api/usage", usageRoute);

//
cron.schedule("0 0 * * *", async () => {
  try {
    // Update all documents in the collection
    await usageModel.updateMany({}, { $set: { totalUsage: 0 } });

    console.log("Daily update completed.");
  } catch (error) {
    console.error("Error updating thresholdRemaining:", error);
  }
});
