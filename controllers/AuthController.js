const asyncErrorWrapper = require('express-async-handler');
const { sendToken } = require('../helpers/auth/TokenHelpers');
const CustomError = require('../helpers/error/CustomError');
const { validateInputs, comparePasswords } = require('../helpers/input/InputHelpers');
const { users, hasUserEmail, hashedPassword } = require('../models/user');

const login = asyncErrorWrapper(async(req,res,next)=>{
    const {email,name,password} = req.body;
    if(!(validateInputs)){
        return next (new CustomError(401,'Please check your inputs!'));
    }
    let user;
    users.map(u=>{
        if(u.email == email){
            user =  u
        }
    });
    if(!user){
        next(new CustomError(401,'Cannot find user!'));
    }
    if(!comparePasswords(user.password,password)){
        next(new CustomError(401,'Please check your password!'))
    }
    console.log(user)
    sendToken(user,res);
});

const register = asyncErrorWrapper(async(req,res,next)=>{
    const {email,password,name} = req.body
    let user = {
        email:email,
        password:password,
        name:name
    }
    if(!(validateInputs)){
        return next (new CustomError(401,'Please check your inputs!'));
    }
    if((hasUserEmail(user))){
        return next (new CustomError(401,'Your email is used!'))
    }
    
    users.push(user);
    hashedPassword()
    sendToken(user,res)
    console.log(users)
})

module.exports = {
    login,
    register
}