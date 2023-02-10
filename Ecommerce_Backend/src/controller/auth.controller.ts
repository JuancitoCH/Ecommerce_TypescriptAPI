import { Request, Response, NextFunction } from "express"
import statusCodes, { ControllerResponse } from "../helpers/statusResponse";
import AuthService from "../service/auth";



export const authController = {
    signUp: (req: Request, res: Response, next: NextFunction) => {
        AuthService.signUp(req.body)
            .then( /*ControllerResponse(statusCodes.CREATED,res) */)
            .catch(next)
        return res.status(200)
    },
    
}