import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const protectRoute = async (req, res, next) => {
    try {
        // we defined like jwt in utils
        const token = req.cookies.jwt 

        // check token exist
        if (!token) {
            return res.status(401).json({message:"Unauthorized (no token provided)"})
        }


        // token is look like this : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODIxZTNkNWNlOTlmMDVlYjQ3NzMxZjciLCJpYXQiOjE3NDcwNTE0NzcsImV4cCI6MTc0NzY1NjI3N30.w216Va7GgZ15UrHE2meMpeRJqceuob11hnhqAb1dxs0
        // we need to decode this to get the userID (in utils)
        // we encoded by JWT_SECRET and decode with same thing
        // then check that token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({message:"Unauthorized (invalid token)"})
        }

        // take user from decoded token, but just the userID 
        // not need (and unsecure) to send password to client
        const user = await User.findById(decoded.userID).select("-password")

        if (!user) {
            return res.status(404).json({message:"User not found"})
        }

        req.user = user

        next() // eg, if user auth correctly then updateProfile

    } catch (error) {
        console.log("Error on protectRoute middleware: ", error)
        res.status(500).json({message : "Internal Server Error"})
    }
}