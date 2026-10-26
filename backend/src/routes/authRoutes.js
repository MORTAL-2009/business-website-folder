import express from 'express';
import { login, getMe, updateCredentials } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', getMe);
router.put('/credentials', updateCredentials);

export default router;
