const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Accommodation',
        'Healthcare',
        'Transportation',
        'Banking',
        'SIM/Telecom',
        'Emergency Services',
        'Utilities',
        'Student Support',
      ],
    },
    city: {
      type: String,
      required: true,
      enum: [
        'Chennai',
        'Bengaluru',
        'Mumbai',
        'Delhi',
        'Hyderabad',
        'Pune',
        'Kolkata',
        'All India',
      ],
    },
    address: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);