import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const sendcookie=async(user,res,message,statuscode)=>{
   const jwt_secret="dsfhluds";
const token=jwt.sign({_id:user._id},jwt_secret);
res.status(statuscode).cookie("token",token,{
    httpOnly:true,
    sameSite:"none",
    secure:true
}).json({
    success:true,message
})
}