const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    //jb bhi kisi bhi authenticating end point p ate hai then there will be an 
    //token in the header 
    const token = req.headers.token; // jwt
//check if the token is verified or not then only move fwd
    const decoded = jwt.verify(token, "attlasiationsupersecret123123password");
    const userId = decoded.userId;
    if (userId) {
        req.userId = userId;
        next();
    } else {
        res.status(403).json({
            message: "Token was incorrect"
        })
    }
}

module.exports = {
    authMiddleware: authMiddleware
}