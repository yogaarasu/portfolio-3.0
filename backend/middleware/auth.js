// Simple admin authentication middleware
export const authenticateAdmin = (req, res, next) => {
  const adminPassword = req.headers.authorization;
  
  if (!adminPassword || adminPassword !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized - Invalid admin credentials' });
  }
  
  next();
};

// Rate limiting middleware for contact form
export const contactFormLimiter = (req, res, next) => {
  // Simple in-memory rate limiting
  // In production, you'd use Redis or a proper rate limiting store
  const submissions = new Map();
  const clientIp = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 submissions per 15 minutes

  if (!submissions.has(clientIp)) {
    submissions.set(clientIp, []);
  }

  const clientSubmissions = submissions.get(clientIp);
  
  // Remove old submissions outside the window
  const validSubmissions = clientSubmissions.filter(
    timestamp => now - timestamp < windowMs
  );
  
  if (validSubmissions.length >= maxRequests) {
    return res.status(429).json({ 
      error: 'Too many submissions. Please try again later.' 
    });
  }

  validSubmissions.push(now);
  submissions.set(clientIp, validSubmissions);
  
  next();
};
