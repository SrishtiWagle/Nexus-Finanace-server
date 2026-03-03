const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  getNotifications,
  markRead,
  markAllRead
} = require('../controllers/notification.controller');

router.use(authenticate);

router.get('/', getNotifications);
router.put('/read-all', markAllRead);
router.put('/:id', markRead);

module.exports = router;
