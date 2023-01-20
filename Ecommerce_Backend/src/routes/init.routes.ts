import { Router } from "express";
import { ErrorStatus } from "../errors/ErrorStatus";

const initRouter = Router()

initRouter.get('/',(req,res)=>{
    throw new ErrorStatus("Manin",300)
})

export default initRouter
