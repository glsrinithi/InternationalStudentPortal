const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getFeedback,
} = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createFeedback);
router.get('/', protect, adminOnly, getFeedback);

module.exports = router;