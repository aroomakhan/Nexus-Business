const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'payment'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Completed' // Default to Completed for our mock system
  },
  description: {
    type: String,
    default: 'Nexus Transaction'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);