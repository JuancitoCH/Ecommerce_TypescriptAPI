import { Router } from "express";
import { ErrorStatus } from "../errors/ErrorStatus";

const initRouter = Router()

initRouter.get('/',(req,res)=>{
    throw new ErrorStatus("This Server don't have routes",500)
})

export default initRouter
