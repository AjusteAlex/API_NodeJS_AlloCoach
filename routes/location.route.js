const express = require('express');
const router = express.Router();

const location_controller = require('../controllers/location.controller.js');


router.get('/', location_controller.location_list)
router.post('/add', location_controller.location_add)



module.exports = router;