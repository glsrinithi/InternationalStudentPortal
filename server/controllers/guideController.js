const Guide = require('../models/Guide');

const getGuides = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const guides = await Guide.find(filter).sort({
      category: 1,
      order: 1,
      createdAt: 1,
    });
    res.json(guides);
  } catch (err) {
    next(err);
  }
};

const getGuideById = async (req, res, next) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json(guide);
  } catch (err) {
    next(err);
  }
};

const createGuide = async (req, res, next) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json(guide);
  } catch (err) {
    next(err);
  }
};

const updateGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json(guide);
  } catch (err) {
    next(err);
  }
};

const deleteGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json({ message: 'Guide removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGuides,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
};