const jwt = require("jsonwebtoken");

const SECRET_KEY = "ajdsdfuqkk39234sdfs742323499sdfhssdfss";

function createToken(user, expiresIn) {
    const {id, email} = user;
    const payload = {id, email};
    const token = jwt.sign( payload, SECRET_KEY, { expiresIn: "1d" }); 
    return token;
}

function decodeToken(token){
    return jwt.decode(token, SECRET_KEY);
}


module.exports = {
    createToken,
    decodeToken,
}