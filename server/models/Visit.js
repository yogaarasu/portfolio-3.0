import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true,
  collection: 'visits'
});

// Add index for better query performance
visitSchema.index({ timestamp: -1 });

export default mongoose.model('Visit', visitSchema);
