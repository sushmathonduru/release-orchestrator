// routes/releases.js
// REST API endpoints that power the release orchestration dashboard.

const express = require('express');
const router = express.Router();
const Release = require('../models/Release');

const STAGE_ORDER = ['Dev', 'QA', 'Staging', 'Production'];

// GET /api/releases -> list all releases, newest first
router.get('/', async (req, res) => {
  try {
    const releases = await Release.find().sort({ createdAt: -1 });
    res.json(releases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/releases -> create a new release, starts at "Dev"
router.post('/', async (req, res) => {
  try {
    const { version, applicationName, notes } = req.body;
    if (!version || !applicationName) {
      return res.status(400).json({ error: 'version and applicationName are required' });
    }
    const release = await Release.create({
      version,
      applicationName,
      notes,
      stage: 'Dev',
      status: 'Pending',
    });
    res.status(201).json(release);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/releases/:id/promote -> move a release to the next pipeline stage
router.patch('/:id/promote', async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) return res.status(404).json({ error: 'Release not found' });

    const currentIndex = STAGE_ORDER.indexOf(release.stage);
    if (currentIndex === STAGE_ORDER.length - 1) {
      return res.status(400).json({ error: 'Release is already in Production' });
    }

    release.stage = STAGE_ORDER[currentIndex + 1];
    release.status = release.stage === 'Production' ? 'Deployed' : 'In Progress';
    await release.save();
    res.json(release);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/releases/:id/approve -> approve a release for deployment
router.patch('/:id/approve', async (req, res) => {
  try {
    const { approvedBy } = req.body;
    const release = await Release.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved', approvedBy: approvedBy || 'unknown' },
      { new: true }
    );
    if (!release) return res.status(404).json({ error: 'Release not found' });
    res.json(release);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/releases/:id -> remove a release record
router.delete('/:id', async (req, res) => {
  try {
    await Release.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// feature: release promotion endpoint added
