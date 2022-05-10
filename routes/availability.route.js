const express = require('express');
const router = express.Router();

const availability_controller = require('../controllers/availability.controller.js');


router.get('/', availability_controller.availability_list)
router.post('/add', availability_controller.availability_add)


module.exports = router;