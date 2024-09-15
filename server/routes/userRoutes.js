const express = require('express');
const router = express.Router();

const {userRegisterController, userSignInController} = require('../controllers/userController');

router.post('/register', userRegisterController);
router.post('/signin', userSignInController);

module.exports = router;
