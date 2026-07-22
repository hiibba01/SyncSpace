import User from "../models/user.model.js";
import generateToken from "../utilis/generateToken.js";
import bcrypt from "bcrypt";

export const register = async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields!",
          });
       }

       const existingUser = await User.findOne({email});
       if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists with this email!"
            });
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;

       const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImage
       });

       const token = generateToken(user._id);

       return res.status(201).json({
        success: true,
        message: "User registered successfully!",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role
        }
       });

    } catch(error){
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

export const login = async(req,res)=>{
    try{
        const {email, password} = req.body;

        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Please provide email and password",
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found with this email!"
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
            }
        });

    }
    catch(error){

        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}