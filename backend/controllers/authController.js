import user from "../models/user.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res) => {
    const {name, password} = req.body;

    try {
        const user = await User.findOne({username: name});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {id: user._id,
            isAdmin: user.isAdmin},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.cookie(
            "cookieToken", token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 3600000
            }
        ).status(200).json({token, userId: user._id, userName: user.username, isAdmin: user.isAdmin});
    } catch (error) {
        return res.status(500).json({message: 'Server error'});
    }
}

export const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }
        const admin = new User({
            username: 'admin',
            password: await bcrypt.hash('1234', 10),
            isAdmin: true
        });
        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}