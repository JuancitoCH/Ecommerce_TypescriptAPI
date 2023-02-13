import { Router } from "express";
import { authController } from "../controller/auth.controller";


const authRouter = Router()


authRouter.post('/signup/',authController.signUp)
authRouter.post('/signin/',authController.signIn)
authRouter.get('/logout/',authController.logOut)

export default authRouter
