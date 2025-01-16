import { addNewUsage, getUsageByUserId, updateUsageByUserId } from '../model/usageModel.js';
import axios from 'axios';

const LOGGING_API_URL = 'http://loggingservice-srv:8004/log'; // Replace with the actual URL of your logging API

// Helper function to send log events to the logging API
const logToApi = async (event, message) => {
  try {
    await axios.post(LOGGING_API_URL, { event, message });
  } catch (error) {
    console.error('Error logging to API:', error.message);
  }
};

// GET usage by user ID
export const usageByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userUsage = await getUsageByUserId(userId);
    if (!userUsage) {
      await logToApi('Usage retrieval failed', `No Usage found for user ID ${userId}`);
      return res.status(404).json({ status: false, msg: 'No Usage found' });
    }

    await logToApi('Usage retrieval successful', `Usage retrieved successfully for user ID ${userId}`);
    return res.status(200).json({ status: true, msg: 'Usage retrieved successfully', data: userUsage[0] });
  } catch (error) {
    console.error(error);
    await logToApi('Usage retrieval failed', `Failed to retrieve Usage for user ID ${userId}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};

// UPDATE usage by user ID
export const updatingUsageByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { totalUsage } = req.body;

  try {
    const updatedUsage = await updateUsageByUserId(userId, { totalUsage });
    if (!updatedUsage) {
      await logToApi('Usage update failed', `Usage not found for user ID ${userId}`);
      return res.status(404).json({ status: false, msg: 'Usage not found' });
    }

    await logToApi('Usage update successful', `Usage updated successfully for user ID ${userId}`);
    return res.status(200).json({ status: true, msg: 'Usage updated successfully', data: updatedUsage });
  } catch (error) {
    console.error(error);
    await logToApi('Usage update failed', `Failed to update Usage for user ID ${userId}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};

// CREATE new usage
export const createNewUsage = async (req, res) => {
  const { totalUsage, user } = req.body;

  try {
    const newUsage = await addNewUsage({ totalUsage, user });
    await logToApi('New usage added', `New usage added successfully for user ID ${user}`);
    return res.status(201).json({ status: true, msg: 'Usage added successfully', data: newUsage });
  } catch (error) {
    console.error(error);
    await logToApi('New usage addition failed', `Failed to add new usage for user ID ${user}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};
