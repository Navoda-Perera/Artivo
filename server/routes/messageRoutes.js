const express = require('express');
const router = express.Router();
const { createMessage, getMessages, deleteMessage, updateMessageStatus } = require('../controllers/messageController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(createMessage)
  .get(protect, admin, getMessages);

router.route('/:id')
  .put(protect, admin, updateMessageStatus)
  .delete(protect, admin, deleteMessage);

module.exports = router;
