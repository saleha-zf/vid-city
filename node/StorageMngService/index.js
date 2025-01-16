import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8002, () => {
  console.log("Server running on http://localhost:8002/");
});

const MONGO_URL = "";

mongoose.connect('mongodb+srv://sfatimabese22seecs:123@vid-city.jhkzr.mongodb.net/test?retryWrites=true&w=majority&appName=vid-city');
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

//import routes
import storageRoute from "./routes/storageRoute.js";

//use routes
app.use("/api/storage", storageRoute);

//test route
app.get("/", (req, res) => {
  res.send("Hello World! From Storage Service");
});
