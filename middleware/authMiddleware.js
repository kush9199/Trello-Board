const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "Token missing"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            "attlasiationsupersecret123123password"
        );

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    authMiddleware
};