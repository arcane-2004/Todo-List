const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(404).json({ message: 'user already exist' })
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })

    const token = await user.generateToken()
    res.cookie('token', token);
    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = await user.generateToken();

    res.cookie('token', token)
    res.status(200).json({ token, user })


}

module.exports.getUserProfile = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({email: decode.email});

        res.status(200).json(user)

    }catch(err){
        return res.status(401).json({message: 'Unauthorized'})
    }
}