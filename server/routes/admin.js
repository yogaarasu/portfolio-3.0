import crypto from 'crypto';
import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import { createAdminToken } from '../utils/adminToken.js';

const router = express.Router();

const safePasswordEqual = (providedPassword, configuredPassword) => {
  const provided = Buffer.from(providedPassword);
  const configured = Buffer.from(configuredPassword);
  if (provided.length !== configured.length) {
    return false;
  }
  return crypto.timingSafeEqual(provided, configured);
};

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body ?? {};
  const configuredPassword = process.env.ADMIN_PASSWORD || '';

  if (!configuredPassword) {
    return res.status(500).json({
      error: 'Admin password is not configured on the server',
    });
  }

  if (typeof password !== 'string' || !safePasswordEqual(password, configuredPassword)) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }

  try {
    const token = createAdminToken();
    return res.json({ token });
  } catch (error) {
    console.error('Failed to create admin token:', error);
    return res.status(500).json({
      error: 'Admin session configuration is missing on the server',
    });
  }
});

// GET /api/admin/verify
router.get('/verify', authenticateAdmin, (_req, res) => {
  res.json({ ok: true });
});

export default router;
