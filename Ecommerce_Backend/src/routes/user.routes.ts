import { Router } from "express";
import { userController } from "../controller/user.controller";

const userRouter = Router()

userRouter.get('/',userController.getUsers)
userRouter.post('/',userController.createUser)

export default userRouter
