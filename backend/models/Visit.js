import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  ip: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Add index for better query performance
visitSchema.index({ timestamp: -1 });

// Add compound index to prevent duplicate visits within 5 seconds
visitSchema.index({ timestamp: 1 }, { 
  unique: true,
  sparse: true,
  expireAfterSeconds: 300 // Expire after 5 minutes to clean up
});

export default mongoose.model('Visit', visitSchema);
