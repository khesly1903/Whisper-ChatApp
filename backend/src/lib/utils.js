import jwt from "jsonwebtoken"

export const generateToken = (userID, res) => {
    const token = jwt.sign({userID},process.env.JWT_SECRET,{ // signs with user id and jwt secret
        expiresIn:"7d"
    })

    // cookie name , token , security options
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        httpOnly : true, // prevents XSS attacks
        sameSite: "strict", // prevents cross-site attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}