const Feedback = require('../models/Feedback');

const createFeedback = async (req, res, next) => {
  try {
    const { message, rating } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });
    const fb = await Feedback.create({
      user: req.user._id,
      message,
      rating: rating || 5,
    });
    res.status(201).json(fb);
  } catch (err) {
    next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const list = await Feedback.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = { createFeedback, getFeedback };