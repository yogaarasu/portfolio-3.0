import express from 'express';
import Visit from '../models/Visit.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all visits (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const visits = await Visit.find().sort({ timestamp: -1 });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ error: 'Failed to fetch visits' });
  }
});

// POST new visit (track page view)
router.post('/', async (req, res) => {
  try {
    const now = new Date();
    
    // Check if a visit was recorded in the last 5 seconds to prevent duplicates
    const fiveSecondsAgo = new Date(now.getTime() - 5 * 1000);
    const recentVisit = await Visit.findOne({
      timestamp: { $gte: fiveSecondsAgo }
    });

    if (recentVisit) {
      return res.status(200).json({ message: 'Visit already recorded recently' });
    }

    const newVisit = new Visit({
      timestamp: now,
      userAgent: req.get('User-Agent') || '',
      ip: req.ip || req.connection.remoteAddress || ''
    });

    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

export default router;
