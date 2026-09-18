const mongoose = require('mongoose');

const savedResourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ['Guide', 'Service', 'FAQ'],
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'resourceType',
    },
    title: { type: String, required: true },
    link: { type: String, default: '' },
    snapshot: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

savedResourceSchema.index(
  { user: 1, resourceType: 1, resourceId: 1 },
  { unique: true }
);

module.exports = mongoose.model('SavedResource', savedResourceSchema);