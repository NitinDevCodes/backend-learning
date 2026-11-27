const jwt = require("jsonwebtoken");
const secrete = "nitn404";

function setUser(user) {
    return jwt.sign({ 
        _id: user._id,
        email: user.email,
    }, secrete);
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secrete);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}