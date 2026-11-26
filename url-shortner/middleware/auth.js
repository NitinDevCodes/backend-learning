const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next) {
    const userId = req.cookies?.uid;

    if (!userId) {
        return res.redirect("/login");
    }

    const user = getUser(userId);

    if (!user) {
        return res.redirect("/login");
    }
    req.user = user;
    return next();
}

async function checkAuth(req, res, next){
    const userId = req.cookies?.uid;

    const user = getUser(userId);

    req.user = user;
    return next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};