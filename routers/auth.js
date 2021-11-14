const express = require('express');
const { get } = require('../controllers/get');
const { login, register } = require('../controllers/AuthController');
const router = express.Router();

router.post('/login',login);
router.post('/register',register)

module.exports = router;