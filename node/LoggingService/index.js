import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Log from "./models/logs.js"; // Assuming your Log model is in models/logs.js

// import cors from "cors";

const app = express();
const port = 8004;
// app.use(cors());



// Connect to MongoDB
mongoose.connect('mongodb+srv://sfatimabese22seecs:123@vid-city.jhkzr.mongodb.net/test?retryWrites=true&w=majority&appName=vid-city');
mongoose.connection.on("error", (error) => {
  console.log("Error connecting to the database:", error);
});
mongoose.connection.once("open", () => {
  console.log("Logs Connected to the database");
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to receive log messages via POST request
app.post("/log", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const logEntry = `${new Date().toISOString()} - ${message}\n`;

  try {
    // Create a new log entry and save it to MongoDB
    const log = new Log({
      message: logEntry,
    });

    // Save the log entry (await is now valid here)
    await log.save();
    console.log(log);
    console.log("Log entry added:", logEntry);

    // Respond back to the client
    res.json({ message: "Log entry added successfully" });
  } catch (error) {
    console.error("Error writing to log:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Logging microservicee is running on port ${port}`);
});

