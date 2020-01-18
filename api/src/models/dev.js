const mongoose = require('mongoose');

const PointSchema = require('./utils/point');

const DevSchema = new mongoose.Schema({
  name: String,
  githubUsername: {
    type: String,
    index: true
  },
  bio: String,
  avatarUrl: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('Dev', DevSchema);
