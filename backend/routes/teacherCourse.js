const express = require('express');
const router = express.Router();
const { Course } = require('../controllers/teacherCourse');
router.get('/course/:id', Course);
module.exports = router;