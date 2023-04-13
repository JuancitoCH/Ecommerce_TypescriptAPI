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
        ProductsService.update({id:req.params.idProduct},req.body,req.query.replace as string)
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
    getOneByID: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.getOne({
            id:req.params.idProduct
        })
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
    getFilterPagination: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.getFilterPagination(req.query)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    increaseStock: (req: Request, res: Response, next: NextFunction) => {
        ProductsService.updateIncreaseStock(req.params.idProduct, parseInt(req.params.number))
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    
    
    
}