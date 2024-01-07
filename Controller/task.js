import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
export const newTask = async (req, res, next) => {
    try{
        const { token } = req.cookies;

        if (!token) {
          return res.status(401).json({
            success: false,
            message: "Not logged in",
          });
        }
        const jwt_secret="dsfhluds";
        const decoded = jwt.verify(token, jwt_secret);
        const user = await User.findById(decoded._id);
    
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found",
          });
        }
        req.user = user;
     const { title, description } = req.body;
     await Task.create({
       title,
       description,
       user: req.user,
     });
     res.status(201).json({
       success:true,
       message:"Task created"
     })
    }
    catch(error){
     next(error);
    }
   };

   export const TaskUpdated= async (req, res, next) => {
    try{
      const {id}=req.params;
      const task=await Task.findById(id);
      if(!task){
       return next(new Errorhandler("Error, Not Found",404));
      }
      task.iscompleted=!task.iscompleted;
      await task.save();
       res.status(201).json({
         success:true,
         message:"Task updated"
       })
      
    }
    catch(error) {
      next(error);
    }
    };
    export const TaskDeleted = async (req, res, next) => {
    try{
      const {id}=req.params;
      const task=await Task.findById(id);
      if(!task){
        return  next(new Errorhandler("Invalid id",500));
      }
      await task.deleteOne();
        res.status(201).json({
          success:true,
          message:"Task deleted"
        })
    }
    catch(error){
      next(error);
    }
    };
    
    export const myTask=async(req,res)=>{
    try{
      const userid=req.user._id;
    // const task=await Task.findById(userid);
    const task=await Task.find({user:userid});
    
    res.status(200).json({
      success:true,
      task
    })
    }
    catch(error){
      next(error);
    }
    }
    