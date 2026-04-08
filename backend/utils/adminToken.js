import crypto from 'crypto';

const TOKEN_VERSION = 1;
const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const toBase64Url = (input) => Buffer.from(input).toString('base64url');
const fromBase64Url = (input) =>
  Buffer.from(input, 'base64url').toString('utf8');

const getTokenSecret = () => process.env.ADMIN_SESSION_SECRET || '';

export const createAdminToken = () => {
  const secret = getTokenSecret();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is missing');
  }

  const ttl = Number.parseInt(process.env.ADMIN_SESSION_TTL_SECONDS || '', 10);
  const tokenTtlSeconds = Number.isFinite(ttl) ? ttl : DEFAULT_TOKEN_TTL_SECONDS;

  const payload = JSON.stringify({
    v: TOKEN_VERSION,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + tokenTtlSeconds,
  });
  const encodedPayload = toBase64Url(payload);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
};

export const verifyAdminToken = (token) => {
  const secret = getTokenSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [encodedPayload, providedSignature] = parts;
  if (!encodedPayload || !providedSignature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url');

  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    if (!payload || typeof payload !== 'object') {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      return false;
    }

    return payload.v === TOKEN_VERSION;
  } catch {
    return false;
  }
};
