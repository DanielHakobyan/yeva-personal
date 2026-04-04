const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Personal', 'Philosophical', 'Political'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Essay', EssaySchema);
