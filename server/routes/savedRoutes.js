const express = require('express');
const router = express.Router();
const {
  getSaved,
  addSaved,
  removeSaved,
} = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSaved);
router.post('/', protect, addSaved);
router.delete('/:id', protect, removeSaved);

module.exports = router;