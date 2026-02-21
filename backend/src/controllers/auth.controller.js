import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

export const signup = async (req,res) => {
    const {fullName , email , password} = req.body   // if we do not write ==>  app.use(express.json()) ( middleware) then req.body will not work

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length < 6) {
            return res.status(400).json({ message : "Password must be at least 6 characters"})
        }

        // check if email is valid or not 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.send(400).json({ message: "Invalid email format"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exixts"});

        // 123456778 == $jdhfgkdjsl_#udhsk
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if(newUser){
            // before coderabbit
            // generateToken(newUser._id,res);  // JWT , code written in lib/utils.js
            // await newUser.save()


            // after code rabbit
            // persist user first, then issue auth cookie
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

            // todo : send a welcome email to user

        } else {
            res.status(400).json({message:"Invalid user data"})
        }


    } catch (error) {
        console.log("Error in signup controller: ",error);
        res.status(500).json({message:"Internal server error"})
    }
};
