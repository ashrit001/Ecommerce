import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import handleServiceError, { success } from "../Helper/ResponseHelper.js";


const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password, phoneNumber } = req.body;
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                passwordHash,
                phoneNumber
            })

            await user.save();

            return success(res, user);
        } catch(err) {
            console.error("Register Error:", err);
            return handleServiceError(res, err.message)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email});
            if(!user) return notFound(res, 'User not found')
            
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
            if(!isPasswordCorrect) return unauthorized(res, 'Invalid credentials')
            
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

            return success(res, {
                    email: user.email, 
                    role: user.role, 
                    username: user.username, 
                    phoneNumber: user.phoneNumber, 
                    token: token
                })

        } catch(error) {
            return handleServiceError(res, err.message)
        }
    }
}

export default AuthController;