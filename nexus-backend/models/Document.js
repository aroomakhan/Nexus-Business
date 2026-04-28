const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  // Adding 'type' back is CRITICAL for your frontend PDF checks
  type: { type: String, default: 'PDF' }, 
  size: String,
  status: { type: String, default: 'Pending' },
  signatureData: { type: String }, // Base64 signature image
  uploadedAt: { type: Date, default: Date.now },
  // Adding lastModified helps with tracking when it was signed
  lastModified: { type: Date, default: Date.now }
});

// Update the lastModified date whenever the document is saved/updated
documentSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

module.exports = mongoose.model('Document', documentSchema);