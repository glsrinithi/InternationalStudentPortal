const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    documents: [{ type: String }],
    tips: [{ type: String }],
    resources: [resourceSchema],
  },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['pre-arrival', 'arrival', 'post-arrival'],
    },
    icon: { type: String, default: '📘' },
    order: { type: Number, default: 0 },
    steps: [stepSchema],
    resources: [resourceSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Guide', guideSchema);