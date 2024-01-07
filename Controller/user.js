import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {Errorhandler} from "../Middleware/error.js";
import {sendcookie} from "../utility/feature.js";

export const login = async (req, res,next) => {
    try{
     const { email, password } = req.body;
     const user = await User.findOne({ email }).select("+password");//password is false so include 
     if(!user) return next(new Errorhandler("User not registered",400));
     
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) return next(new Errorhandler( "Invalid email Or password",400));
   
     sendcookie(user, res, `Welcome back, ${user.name}`, 200);
    }catch(error){
     next(error);
    }
   };
   

export const registerUser = async (req, res,next) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if(user) return next(new Errorhandler("User already exists",400));
      const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
      const hashedpassword = await bcrypt.hash(password, salt);
      user = await User.create({ name, email, password: hashedpassword });
      sendcookie(user, res, "Registered successfully", 201);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  export const getMyProfile = (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  };

  export const logout = (req, res) => {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) ,
      sameSite:"none",
      secure:true})
      .json({
        success: true,
        message: "Logged out",
        
      });
  };

