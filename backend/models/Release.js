// models/Release.js
// Defines what a "Release" looks like inside the platform.
// A release represents one version of an application moving through
// the deployment pipeline: Dev -> QA -> Staging -> Production.

const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: true,
      trim: true,
    },
    applicationName: {
      type: String,
      required: true,
      trim: true,
    },
    stage: {
      type: String,
      enum: ['Dev', 'QA', 'Staging', 'Production'],
      default: 'Dev',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Approved', 'Deployed', 'Failed', 'Rolled Back'],
      default: 'Pending',
    },
    approvedBy: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Release', releaseSchema);
