import express from "express";
import { signin, signup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);                                       // Sign up
userRouter.post("/signin", signin);                                       // Sign in

export default userRouter;
