import User from "../models/user.model.js"

import bcrypt from "bcrypt"
import { z } from "zod"
import jwt from "jsonwebtoken"

export const signin = async (req, res) => {
    const { name, username, password } = req.body;

    const schema = z.object({
        name: z.string().min(2, "Name is required"),
        username: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const validation = schema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ msg: "Enter valid credentials" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("jwt-paytm", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            sameSite: "strict",
        });

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
            },
            token,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                msg: "User doesnot exsist"
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return res.json({
                msg: "Enter valid credentials"
            })
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("jwt-paytm", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            sameSite: "strict",
        });

        res.status(200).json({
            username,
            token
        })
    } catch (error) {
        console.log("Error in login");
        
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwt-paytm")
    res.json({
        msg : "Logout Sucessfull"
    })
}