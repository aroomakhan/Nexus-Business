const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  fundingGoal: {
    type: Number,
    required: [true, 'Please add a funding goal']
  },
  category: {
    type: String,
    required: true,
    enum: ['Tech', 'Healthcare', 'Education', 'Finance', 'Other']
  },
  // This connects the project to the User who created it
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);