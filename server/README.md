# Portfolio Backend

This is the Node.js/Express backend for the portfolio website with MongoDB integration.

## Features

- **Contact Form Messages**: Store and manage contact form submissions
- **Visitor Analytics**: Track page visits with deduplication
- **Admin Authentication**: Secure admin access with password protection
- **Rate Limiting**: Prevent spam and abuse
- **CORS Support**: Secure cross-origin requests
- **Environment Configuration**: Secure environment variable management

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # create server/.env and add your values
   ```
   
   Use a single `server/.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000

   MONGODB_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/<db_name>?retryWrites=true&w=majority&appName=<app-name>
   ADMIN_PASSWORD=your_secure_admin_password_here
   ADMIN_SESSION_SECRET=your_long_random_session_secret_here
   ADMIN_SESSION_TTL_SECONDS=43200

   FRONTEND_URLS=http://localhost:5173,https://your-portfolio-domain.vercel.app
   ```

3. **Start MongoDB**:
   - For local MongoDB: `mongod`
   - Or use MongoDB Atlas (update MONGODB_URI)

4. **Start the server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Messages
- `GET /api/messages` - Get all messages (admin only)
- `POST /api/messages` - Submit new contact form message
- `DELETE /api/messages/:id` - Delete message (admin only)

### Visits
- `GET /api/visits` - Get all visits (admin only)
- `POST /api/visits` - Record new visit (automatic)

### Health Check
- `GET /api/health` - Server health status

### Admin
- `POST /api/admin/login` - Exchange admin password for access token
- `GET /api/admin/verify` - Validate admin token

## Authentication

1. Login with your admin password:
```http
POST /api/admin/login
Content-Type: application/json

{ "password": "your_admin_password" }
```
2. Use the returned token on protected endpoints:
```
Authorization: Bearer <admin_token>
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin request protection
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Server-side validation for all inputs
- **Contact Form Rate Limiting**: 5 submissions per 15 minutes per IP

## Database Schema

### Message
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, max 255 chars),
  phone: String (optional, max 20 chars),
  message: String (required, max 2000 chars),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

### Visit
```javascript
{
  timestamp: Date (required, automatic),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

## Development

The server will automatically restart on file changes when using `npm run dev`.

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Use a reverse proxy (nginx, Apache)
5. Set up SSL/HTTPS

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGODB_URI connection string
- Verify network connectivity

### CORS Issues
- Ensure `FRONTEND_URLS` includes your frontend URL
- Check that the frontend is making requests to the correct backend URL

### Authentication Issues
- Verify `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are set correctly
- Check Authorization header format: `Bearer <admin_token>`
