import { Router } from "express";
import { authController } from "../controller/auth.controller";


const authRouter = Router()


authRouter.post('/',authController.signUp)

export default authRouter
