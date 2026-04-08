# Portfolio 3.0

This repository now uses a `client` + `server` structure.

## Folder Structure

- `client/` -> React + Vite frontend
- `server/` -> Node.js + Express + MongoDB backend

## Local Development

From repo root:

```bash
npm run dev:client
npm run dev:server
```

or use each folder directly:

```bash
cd client && npm run dev
cd server && npm run dev
```

## Build Frontend

```bash
npm run build
```

## Vercel Deployment

- Frontend project root directory: `client`
- Backend project root directory: `server`
