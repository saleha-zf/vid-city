import User from "../model/user.js";
import bcrypt from "bcrypt";
import axios from "axios";

const LOG_SERVICE_URL = "http://loggingservice-srv:8004/log"; // Replace with the actual URL of your log service

// Registration endpoint
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Log registration event
    await logToService("User registered", `User ${email} registered successfully`);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login endpoint
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // Log unsuccessful login event
      await logToService("Login failed", `Login attempt for user ${email} failed - User not found`);

      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Log unsuccessful login event
      await logToService("Login failed", `Login attempt for user ${email} failed - Invalid password`);

      return res.status(401).json({ message: "Invalid password" });
    }

    // Log successful login event
    await logToService("Login successful", `User ${email} logged in successfully`);

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to send log events to the logging microservice
const logToService = async (event, message) => {
  try {
    await axios.post(LOG_SERVICE_URL, { event, message });
  } catch (error) {
    console.error("Error logging to service:", error.message);
  }
};
