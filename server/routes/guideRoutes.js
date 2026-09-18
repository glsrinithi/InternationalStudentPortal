const express = require('express');
const router = express.Router();
const {
  getGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
} = require('../controllers/guideController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getGuides);
router.get('/:id', getGuideById);
router.post('/', protect, adminOnly, createGuide);
router.put('/:id', protect, adminOnly, updateGuide);
router.delete('/:id', protect, adminOnly, deleteGuide);

module.exports = router;