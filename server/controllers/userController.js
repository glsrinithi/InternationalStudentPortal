const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({
      createdAt: -1,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { country, destinationCity } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { country, destinationCity },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, updateProfile };
