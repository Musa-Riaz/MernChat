const userModel = require('../models/userModel');
const {catchAsync} = require('../middlewares/catchAsync');
const JWT = require('jsonwebtoken');
const { ErrorHandler } = require('../middlewares/errorMiddleware');

exports.userRegisterController = catchAsync ( async (req, res, next) => {
    
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return next(new ErrorHandler('Please fill all the fields', 400));
    }

    try{
        const user = await userModel.create({
            username,
            email,
            password
        });
        if(user){

            JWT.sign({userId: user._id}, process.env.SECRET_KEY, function(err, token){
                if(err) throw err;

                res.cookie('token', token, {httpOnly: true}).status(201).json({
                    success:'true',
                    message:"User created successfully",
                    token,
                    user
                });

            })

           
        }
    }
    catch(err){
        return next(new ErrorHandler(err.message, 500))
    }

});


exports.userSignInController = catchAsync( async (req, res, next) =>{

    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please fill all the fields', 400));
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return next ( new ErrorHandler('The user does not exist', 404))
        }
        const isPasswordCorrect = await user.matchPassword(password);
        if(isPasswordCorrect){
            JWT.sign({userId: user._id}, process.env.SECRET_KEY, (err, token) => {
                if(err) throw err
                res.cookie('token', token, {httpOnly: true}).status(200).json({
                    success:true,
                    message:"User found",
                    token,
                    user
                });
                
            })
            
        }
        else{
            return next (new ErrorHandler('Invalid Email or Password', 401))
        }
    }
    catch(err){
        return next (new ErrorHandler(err.message, 400));
    }
    next();

});