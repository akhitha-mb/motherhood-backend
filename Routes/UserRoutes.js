const express = require('express');
const { userLogin, userRegister } = require('../controller/UserController.js'); // Changed import to require

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

module.exports = userRouter; // Changed export default to module.exports