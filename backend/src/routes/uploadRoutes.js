import express from 'express';
import { upload } from '../middleware/upload.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload
// Accepts single multipart file with field name 'image'
router.post('/', upload.single('image'), uploadImage);

export default router;
