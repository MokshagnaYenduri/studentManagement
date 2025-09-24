import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    const {name, password} = req.body;
    try {
        const existingUser = await User.findOne({username: name});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: name,
            password: hashedPassword,
            isAdmin: false
        })
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Server error'});
    }
}