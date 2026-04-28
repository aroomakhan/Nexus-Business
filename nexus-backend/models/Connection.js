const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entrepreneur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Connection', ConnectionSchema);