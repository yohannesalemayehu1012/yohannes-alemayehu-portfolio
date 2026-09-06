const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }


        // ---------------------------------------------
        // FIND USER
        // ---------------------------------------------

        const user = await userModel.getUserByEmail(email);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // ---------------------------------------------
        // CHECK PASSWORD
        // ---------------------------------------------

        const passwordIsValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordIsValid) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // ---------------------------------------------
        // CREATE JWT
        // ---------------------------------------------

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // ---------------------------------------------
        // RESPONSE
        // ---------------------------------------------

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });

    }

};


module.exports = {
    login
};