import { Request, Response, NextFunction } from "express"
import statusCodes, { ControllerResponse, CookieResponse } from "../helpers/statusResponse";
import AuthService from "../service/auth";



export const authController = {
    signUp: (req: Request, res: Response, next: NextFunction) => {
        AuthService.signUp(req.body)
            .then( CookieResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    
}