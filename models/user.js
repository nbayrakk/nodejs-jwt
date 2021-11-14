const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const users = [
    {
        id:1,
        name:'Jack Londan',
        email:"jacklondon@hotmail.com",
        password:"password"
    },
    {
        id:2,
        name:'Emile Zola',
        email:"emilezola@hotmail.com",
        password:"password"

    }
]

const hasUserEmail = (user)=>{
    let exist = false
    for(let u of users){
        if(u.email == user.email){
            exist = true;
            break
        }
    }   
    return exist
}

const hashedPassword = ()=>{
    
    users.forEach(u =>{
        bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err);
    
            bcrypt.hash(u.password, salt, (err, hash) => {
                if (err) next(err);
                u.password = hash;
                next();
            });
        });
    })
}
const generateToken = (user)=>{
    const { JWT_EXPIRE, JWT_SECRET_KEY } = process.env;

    const payload = {
        id:user.id,
        name:user.name
    }
    const token = jwt.sign(
        payload,JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRE }
    )
    return token
}
module.exports = {
    users,
    generateToken,
    hashedPassword,
    hasUserEmail
}