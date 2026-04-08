import express from 'express';
import Visit from '../models/Visit.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

const toVisitPayload = (visit) => ({
  id: visit._id,
  timestamp: visit.timestamp,
});

// GET all visits (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const visits = await Visit.find().sort({ timestamp: -1 });
    res.json(visits.map(toVisitPayload));
  } catch (error) {
    console.error('Error fetching visits:', error);
    res.status(500).json({ error: 'Failed to fetch visits' });
  }
});

// POST new visit (track page view)
router.post('/', async (req, res) => {
  try {
    const newVisit = new Visit({
      timestamp: new Date(),
    });

    const savedVisit = await newVisit.save();
    res.status(201).json(toVisitPayload(savedVisit));
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

export default router;
