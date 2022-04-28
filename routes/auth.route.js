const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const auth_controller = require('../controllers/auth.controller.js');

router.post('/register/phone-user', auth_controller.user_phone_register)
router.post('/register/code-verif-user', auth_controller.user_auth_code_verif)
router.post('/register/role-user',auth, auth_controller.user_role)



router.post('/register/coach', auth_controller.coach_register)
router.post('/login', auth_controller.user_login)



module.exports = router;