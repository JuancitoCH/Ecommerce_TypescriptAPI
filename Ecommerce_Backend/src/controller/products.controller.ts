import { Request, Response, NextFunction } from "express"
import statusCodes,{ControllerResponse} from "../helpers/statusResponse";
import ProductsService from "../service/products";




export const productController = {
    create: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.create(req.body)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    getAll: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.getAll(req.query)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    
    
    
}