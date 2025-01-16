import { addNewStorage, getStorageByUserId, updateStorageByUserId } from '../model/storage.js';
import axios from 'axios';

const LOGGING_API_URL = 'http://loggingservice-srv:8004/log'; 

// Helper function to send log events to the logging API
const logToApi = async (event, message) => {
  try {
    await axios.post(LOGGING_API_URL, { event, message });
  } catch (error) {
    console.error('Error logging to API:', error.message);
  }
};

// GET storage by user ID
export const storageByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userStorage = await getStorageByUserId(userId);
    if (!userStorage) {
      return res.status(404).json({ status: false, msg: 'No Storage found' });
    }

    await logToApi('Storage retrieval successful', `Storage retrieved successfully for user ID ${userId}`);
    return res.status(200).json({ status: true, msg: 'Storage retrieved successfully', data: userStorage[0] });
  } catch (error) {
    console.error(error);
    await logToApi('Storage retrieval failed', `Failed to retrieve storage for user ID ${userId}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};

// UPDATE storage by user ID
export const updatingStorageByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { totalStorage } = req.body;

  try {
    const updatedStorage = await updateStorageByUserId(userId, { totalStorage });
    if (!updatedStorage) {
      await logToApi('Storage update failed', `Storage not found for user ID ${userId}`);
      return res.status(404).json({ status: false, msg: 'Storage not found' });
    }

    await logToApi('Storage update successful', `Storage updated successfully for user ID ${userId}`);
    return res.status(200).json({ status: true, msg: 'Storage updated successfully', data: updatedStorage });
  } catch (error) {
    console.error(error);
    await logToApi('Storage update failed', `Failed to update storage for user ID ${userId}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};

// CREATE new storage
export const createNewStorage = async (req, res) => {
  const { totalStorage, user } = req.body;

  try {
    const newStorage = await addNewStorage({ totalStorage, user });
    await logToApi('New storage added', `New storage added successfully for user ID ${user}`);
    return res.status(201).json({ status: true, msg: 'Storage added successfully', data: newStorage });
  } catch (error) {
    console.error(error);
    await logToApi('New storage addition failed', `Failed to add new storage for user ID ${user}`);
    return res.status(500).json({ status: false, msg: 'Something went wrong' });
  }
};
