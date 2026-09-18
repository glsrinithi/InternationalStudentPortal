const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Visa & Immigration',
        'Documents',
        'Accommodation',
        'Banking',
        'Healthcare',
        'Transportation',
        'University Life',
        'Culture',
        'Safety',
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FAQ', faqSchema);