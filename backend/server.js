// server.js
// Entry point of the backend microservice.
// Starts an Express HTTP server, connects to MongoDB, and exposes the
// release-orchestration REST API consumed by the frontend dashboard.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const releaseRoutes = require('./routes/releases');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint - used by Docker / orchestrators to verify the
// container is alive and ready to receive traffic.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'release-orchestrator-backend', time: new Date().toISOString() });
});

app.use('/api/releases', releaseRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`[Server] Release Orchestrator backend running on port ${PORT}`);
});
