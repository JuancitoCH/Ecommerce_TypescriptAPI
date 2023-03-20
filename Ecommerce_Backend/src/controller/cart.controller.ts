import { Request, Response, NextFunction } from "express"
import CartService from "../service/cart";
import { RequestUserData } from "../middlewares/auth";
import { ControllerResponse } from "../helpers/statusResponse";
import statusCodes from "../helpers/statusResponse";

const CartController ={

    create: (req: Request, res: Response, next: NextFunction)=>{
        CartService.create(req.body, { id :(req as RequestUserData).userData.id } )
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
    get: (req: Request, res: Response, next: NextFunction)=>{
        CartService.getUserCart({}, { id :(req as RequestUserData).userData.id } )
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
    addProduct: (req: Request, res: Response, next: NextFunction)=>{
        CartService.addProduct((req as RequestUserData).userData.id,req.body)
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
    clearCart: (req: Request, res: Response, next: NextFunction)=>{
        CartService.clearCartUser((req as RequestUserData).userData.id)
        ControllerResponse(statusCodes.OK,res)(null)
    },
    deleteOneProductCart: (req: Request, res: Response, next: NextFunction)=>{
        CartService.deleteOneProduct((req as RequestUserData).userData.id,req.body)
        .then( ControllerResponse(statusCodes.OK,res) )
        .catch(next)
    },
}
export default CartController