const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { register, login, logout, refresh, onboard, getProfile, updateProfile } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

router.use(authenticate);
router.post('/onboard', onboard);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
