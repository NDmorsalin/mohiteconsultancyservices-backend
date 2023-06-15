const {Schema,model} = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters.'],
    minlength: [5, 'Title must be at least 2 characters.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
    trim: true,
    maxlength: [800, 'Description cannot exceed 800 characters.'],
  },
  status: {
    type: String,
    enum: {
      values: ['pending','progress', 'completed'],
      message: 'Status must be either "pending" or "completed".',
    },
    default: 'pending',
  },
//   todo enable it later
  /* uid: {
    type: String,
    required: [true, 'UID is required.'],
  }, */
},{
    timestamps: true,
});

const Task = model('Task', taskSchema);

module.exports = Task;
