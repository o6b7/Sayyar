import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from '../models/Car.js'

// Generate JWT token
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password || password.length < 8) {
            return res.json({success: false, message: 'املأ جميع الفراغات'});
        } 
        
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.json({success: false, message: 'البريد الإلكتروني المُدخل مستخدم'});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString());
        res.json({success: true, token})
        
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

// Login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.json({success: false, message: "لم يتم إيجاد المستخدم"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return res.json({success: false, message: "لم يتم إيجاد المستخدم"})
        }

        const token = generateToken(user._id.toString());
        res.json({success: true, token})
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

// Get use rdata using JWT token 
export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

// Get all cars list
export const gatCars = async (req, res) => {
    try {
        const cars = await Car.find({isAvailable: true})
        res.json({success: true, cars})
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

export const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        
        if (!car) {
            return res.json({ success: false, message: 'Car not found' });
        }
        
        res.json({ success: true, car });
    } catch (err) {
        console.log(err.message);
        return res.json({ success: false, message: err.message });
    }
}