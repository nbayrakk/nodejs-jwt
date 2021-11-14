const bcrypt = require('bcrypt')

const validateInputs= (email,password)=>{
    return email && password;
}
const comparePasswords = (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}

module.exports = {
    validateInputs,
    comparePasswords
}