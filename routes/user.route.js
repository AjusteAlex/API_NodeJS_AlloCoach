const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');


router.get('/', user_controller.user_list)
router.get('/:id', user_controller.user_detail)


module.exports = router;