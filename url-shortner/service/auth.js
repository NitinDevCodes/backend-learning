const jwt = require("jsonwebtoken");
const secrete = "nitn404";

function setUser (user){
    return jwt.sign(user, secrete);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secrete);
}

module.exports = {
    setUser,
    getUser,
}