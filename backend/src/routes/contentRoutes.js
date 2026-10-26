import express from 'express';
import {
  getContent,
  updateContent,
  getSectionContent,
  updateSectionContent,
  resetContent
} from '../controllers/contentController.js';

const router = express.Router();

// Full content routes
router.route('/')
  .get(getContent)
  .put(updateContent);

// Reset route
router.post('/reset', resetContent);

// Specific section routes (e.g. /api/content/hero, /api/content/about)
router.route('/:section')
  .get(getSectionContent)
  .put(updateSectionContent);

export default router;
