const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  icon: { type: String }
}, { timestamps: true });  // This will create createdAt and updatedAt automatically

module.exports = mongoose.model('List', listSchema);
