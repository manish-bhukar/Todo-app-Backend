import express from "express";
import { newTask,myTask,TaskDeleted,TaskUpdated } from "../Controller/task.js";
import { isAuthenticated } from "../Middleware/Auth.js";
const router=express.Router();
router.post("/addtask",newTask);
router.get("/my",isAuthenticated,myTask);
router.route("/:id").delete(isAuthenticated,TaskDeleted).put(isAuthenticated,TaskUpdated);
export default router;