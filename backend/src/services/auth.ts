import {user} from "../models/user"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const JWT = process.env.JWT

const authenticate = (req, res, next) => {
    try {
        const authhead = req.header('authorization');
        if (!authhead || !authhead.startsWith('Bearer')) {
            return res.status(401).json({ "error": "No token provided" })
        }
        const token = authhead.split(" ")[1]
        jwt.verify(token, JWT, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "error": "Invalid token" })
            }
            req.user = decoded;
            next()
        })
        return
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};