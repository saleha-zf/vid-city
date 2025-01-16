import { createNewStorage, storageByUserId, updatingStorageByUserId } from '../controller/storageController.js';
import express from 'express';

const router = express.Router(); // "api/storage"

// get storage by user id
router.get('/user/:userId', storageByUserId);

// update storage by user id
router.put('/user/:userId', updatingStorageByUserId);

// create new storage
router.post('/', createNewStorage);


export default router;