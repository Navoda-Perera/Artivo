const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email']
  },
  subject: {
    type: String,
    default: 'No Subject'
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  status: {
    type: String,
    enum: ['Unread', 'Read'],
    default: 'Unread'
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
