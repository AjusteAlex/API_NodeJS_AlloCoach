const express = require('express');
const router = express.Router();

const reservation_controller = require('../controllers/reservation.controller.js');


router.get('/', reservation_controller.reservation_list)


module.exports = router;