// require JWT in order to verify the user

const jwt = require("jsonwebtoken");

// create a function that does the authentication, which is the middleware that will be executed

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({msg: "Authorization denied. No authentication token." });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({msg: "Authorization denied. Token verification failed." });

        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 

// Export auth.js and import it in userRouter.js

module.exports = auth;