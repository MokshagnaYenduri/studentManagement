import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user={
            id : decoded.id,
            isAdmin: decoded.isAdmin
        };
        next();
    } catch (error) {
        return res.status(401).json({message: 'Forbidden: Invalid token'});
    }
}

export const isAdmin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        return res.status(403).json({message: 'Access denied'});
    }
    next(); 
}