// config/db.js
// Handles the connection between the backend service and the MongoDB
// container defined in docker-compose.yml. The connection string is
// injected through an environment variable so the same code works both
// locally and inside Docker without any changes.

const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/release_orchestrator';

  try {
    await mongoose.connect(mongoUri);
    console.log('[DB] Connected to MongoDB at', mongoUri);
  } catch (error) {
    console.error('[DB] Connection failed:', error.message);
    // Retry after 5 seconds instead of crashing immediately.
    // This matters in Docker Compose because the backend container
    // can start slightly before the database container is ready.
    setTimeout(connectDB, 3000); // hotfix: retry delay tuned);
  }
}

module.exports = connectDB;
