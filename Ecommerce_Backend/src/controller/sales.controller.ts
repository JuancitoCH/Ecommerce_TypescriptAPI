import { Request, Response, NextFunction } from "express"
import SalesService from "../service/sales";
import { ControllerResponse } from "../helpers/statusResponse";
import statusCodes from "../helpers/statusResponse";
import { RequestUserData } from "../middlewares/auth";

const SalesController ={
    get: (req: Request, res: Response, next: NextFunction)=>{
        SalesService.getOne({id:req.params.id})
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
    getAll: (req: Request, res: Response, next: NextFunction)=>{
        SalesService.getAll()
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
    getUser: (req: Request, res: Response, next: NextFunction)=>{
        SalesService.getAllUser((req as RequestUserData).userData.id)
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
}
export default SalesController