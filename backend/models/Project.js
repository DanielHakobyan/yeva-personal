const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  video: {
    type: String
  },
  links: [{
    label: String,
    url: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
