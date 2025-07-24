import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({message: 'Unauthorized'})
        
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user) return res.status(404).json({message: 'User not found'})
        
        req.user = user;
        next();
    } catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export default auth;