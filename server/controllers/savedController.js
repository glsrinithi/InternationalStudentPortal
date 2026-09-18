const SavedResource = require('../models/SavedResource');
const Guide = require('../models/Guide');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');

const getSaved = async (req, res, next) => {
  try {
    const saved = await SavedResource.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

const addSaved = async (req, res, next) => {
  try {
    const { resourceType, resourceId } = req.body;

    let resource;
    let link = '';
    let title = '';

    if (resourceType === 'Guide') {
      resource = await Guide.findById(resourceId);
      if (resource) {
        title = resource.title;
        link = `/guides/${resource._id}`;
      }
    } else if (resourceType === 'Service') {
      resource = await Service.findById(resourceId);
      if (resource) {
        title = resource.name;
        link = `/services/${resource._id}`;
      }
    } else if (resourceType === 'FAQ') {
      resource = await FAQ.findById(resourceId);
      if (resource) {
        title = resource.question;
        link = `/faqs`;
      }
    }

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const existing = await SavedResource.findOne({
      user: req.user._id,
      resourceType,
      resourceId,
    });
    if (existing) {
      return res.status(400).json({ message: 'Already saved' });
    }

    const saved = await SavedResource.create({
      user: req.user._id,
      resourceType,
      resourceId,
      title,
      link,
      snapshot: resource.toObject ? resource.toObject() : resource,
    });
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

const removeSaved = async (req, res, next) => {
  try {
    const saved = await SavedResource.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!saved) {
      return res.status(404).json({ message: 'Saved resource not found' });
    }
    res.json({ message: 'Removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSaved, addSaved, removeSaved };