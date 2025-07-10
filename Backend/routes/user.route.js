const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const userController = require('../controllers/user.controller')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name min 3 letters'),
    body('password').isLength({min:4}).withMessage('password min size 4')
],
    userController.registerUser
)

module.exports = router;