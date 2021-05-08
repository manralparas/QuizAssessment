const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/teacherauth');
router.post('/teachersignup', signup);
router.post('/teachersignin', signin);
module.exports = router;