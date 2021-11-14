const { users, generateToken } = require("../../models/user");

const sendToken = (user,res) =>{
    console.log(user)
    const token = generateToken(user);
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res.status(200)
    .cookie("access_token", token, {
        httpOnly: true,
        expire: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60 *3600 *360),
        secure: NODE_ENV === "development" ? false : true
    })
    .json({
        success:true,
        access_token:token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    });       
}

const isTokenIncludes = (req) =>{
    return (
        req.headers.authorization && req.headers.authorization.startWith('Bearer')
    );
}

const getAccessTokenFromHeader = (req) =>{
    const authorization = req.headers.authorization;
    const access_token = authorization.split(' ')[1];
    return access_token
};

module.exports = {
    getAccessTokenFromHeader,
    isTokenIncludes,
    sendToken
}