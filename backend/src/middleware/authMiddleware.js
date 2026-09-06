const jwt = require("jsonwebtoken");


// =====================================================
// VERIFY JWT
// =====================================================

const protect = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;


        // ---------------------------------------------
        // CHECK HEADER
        // ---------------------------------------------

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });

        }


        // ---------------------------------------------
        // EXTRACT TOKEN
        // ---------------------------------------------

        const token = authHeader.split(" ")[1];


        // ---------------------------------------------
        // VERIFY TOKEN
        // ---------------------------------------------

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // ---------------------------------------------
        // STORE USER INFORMATION
        // ---------------------------------------------

        req.user = decoded;


        // Continue to controller

        next();

    } catch (error) {

        console.error("Authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};


module.exports = {
    protect
};