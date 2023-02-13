import { Router } from "express";
import { ErrorStatus } from "../errors/ErrorStatus";
import isLoged from "../middlewares/auth";


const initRouter = Router()

initRouter.get('/',isLoged,(req,res)=>{
    throw new ErrorStatus("This Server don't have routes",500)
})

export default initRouter
