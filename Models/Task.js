const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  dueDate: { type: Date },  // Due date for the task
  description: { type: String, maxlength: 250 },  // Description of the task
  completed: { type: Boolean, default: false },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }  // Reference to the List model
}, { timestamps: true });  // This will create createdAt and updatedAt automatically

module.exports = mongoose.model('Task', taskSchema);
