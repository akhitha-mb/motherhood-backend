const userModel = require("../models/User.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// login function 
const userLogin = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email:email})
        if(!user){
            res.json({success:false, message:"Email not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({success:false, message:"Invalid Password"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//token generating function
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register function
const userRegister = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        const validationResponse = validateUserInput(email, password);
        if (!validationResponse.success) {
            return sendResponse(res, false, validationResponse.message);
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return sendResponse(res, false, "Email already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        return sendResponse(res, true, "Registration successful", token);
    } catch (error) {
        console.error(error);
        return sendResponse(res, false, "Error in registering");
    }
};

module.exports = {userLogin, userRegister}