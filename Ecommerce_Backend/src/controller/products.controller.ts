import { Request, Response, NextFunction } from "express"
import statusCodes,{ControllerResponse} from "../helpers/statusResponse";
import ProductsService from "../service/products";




export const productController = {
    create: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.create(req.body)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.update({id:req.params.idProduct},req.body)
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
    getFilterPagination: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.getFilterPagination(req.query)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    
    
    
}