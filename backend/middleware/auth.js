import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.cookieToken;
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id, isAdmin: decoded.isAdmin};
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
}

export const isAdmin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        return res.status(403).json({message: 'Access denied'});
    }
    next(); 
}

export const logOut = (req, res) => {
    res.clearCookie("cookieToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }).status(200).json({message: 'Logged out successfully'});
}