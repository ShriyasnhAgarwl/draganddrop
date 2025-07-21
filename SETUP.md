# 🚀 Setup Instructions

Follow these steps to get the Drag & Drop Form Builder running on your local machine.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for the root, client, and server directories.

2. **Start the development servers**
   ```bash
   npm run dev
   ```
   This will start both the client (React) and server (Node.js) concurrently.

## Manual Setup (Alternative)

If you prefer to set up manually:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Start the servers**
   
   In one terminal (for the server):
   ```bash
   cd server
   npm run dev
   ```
   
   In another terminal (for the client):
   ```bash
   cd client
   npm run dev
   ```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Features to Test

1. **Drag & Drop**: Drag form elements from the sidebar to the form builder
2. **Field Editing**: Click the edit icon on any field to modify its properties
3. **Reordering**: Drag fields within the form to reorder them
4. **Preview Mode**: Click "Preview" to test your form
5. **Save/Load**: Save your form schema and load it later
6. **Form Submission**: Submit test data in preview mode

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── store/         # Zustand state management
│   │   └── services/      # API services
├── server/                # Node.js backend
│   ├── index.js          # Express server
│   └── data/             # JSON file storage (auto-created)
└── package.json          # Root package.json with scripts
```

## Troubleshooting

- **Port conflicts**: If ports 3000 or 5000 are in use, modify the ports in `client/vite.config.js` and `server/index.js`
- **CORS issues**: The server is configured with CORS enabled for localhost:3000
- **Dependencies**: Run `npm run install-all` if you encounter missing dependency errors

## Next Steps

- Customize the styling in `client/src/index.css`
- Add new field types in `client/src/components/Sidebar.jsx`
- Extend the API in `server/index.js`
- Add database integration for persistent storage