import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET , {
        expiresIn: "7d"
    }) // like a identifier
    

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // in  millisec
        httpOnly: true, // prevent XSS attacks : only available by http , not by javascript ==>> this is know as cross-site scripting
        sameSite:"strict", // prevent CSRF attact
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};