import { Router } from "express";
import { userController } from "../controller/user.controller";
import { isAdmin } from "../middlewares/auth";

const userRouter = Router()

userRouter.get('/',isAdmin,userController.getUsers)
userRouter.post('/',isAdmin,userController.createUser)

export default userRouter
