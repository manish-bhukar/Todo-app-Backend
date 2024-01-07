import expres from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./Middleware/error.js";
import userRouter from "./Router/user.js";
import taskRouter from "./Router/task.js";
const app=expres();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/newdatabase');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("db connected");
}

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
methods:["GET","POST","DELETE","UPDATE","PUT"]}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.get('/get',async(req,res)=>{
    const docs=await User.find({});
    res.send(docs);
})
app.get("/",(req,res)=>{
  res.send("Nice working");
})

app.use(errorMiddleware);
app.listen(40000,()=>{
    console.log("started");
})