import { createNewUsage, usageByUserId, updatingUsageByUserId } from '../controller/usageController.js';
import express from 'express';

const router = express.Router(); 

router.get('/user/:userId', usageByUserId);

router.put('/user/:userId', updatingUsageByUserId);

router.post('/', createNewUsage);


export default router;