const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  // Who is meeting?
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // What is it about?
  title: { type: String, required: true },
  description: { type: String },
  
  // When is it?
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  
  // Current state
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'rejected'], 
    default: 'pending' 
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('Meeting', MeetingSchema);