const { tokenVerificationErrors } = require("../utils/tokenManager");
const jwt = require("jsonwebtoken");

const requireRefreshToken = (req, res, next) => {
    try {
        const tokenTokenCookie = req.cookies.refreshToken;
        if (!tokenTokenCookie) throw new Error("no Bearer");

        const { uid } = jwt.verify(tokenTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: tokenVerificationErrors[error.message] });
    }
}

module.exports = requireRefreshToken;