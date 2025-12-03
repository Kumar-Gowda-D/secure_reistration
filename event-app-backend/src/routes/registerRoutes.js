const express = require('express');
const { registerStudent } = require('../controllers/registerController.js');
const auth = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', auth('teamA'), registerStudent);

module.exports = router;
