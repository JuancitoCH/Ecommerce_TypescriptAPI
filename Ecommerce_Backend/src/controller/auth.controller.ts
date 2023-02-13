import { Request, Response, NextFunction } from "express"
import statusCodes, { ControllerResponse, CookieResponse ,CookieResponseEmpty} from "../helpers/statusResponse";
import AuthService from "../service/auth";



export const authController = {
    signUp: (req: Request, res: Response, next: NextFunction) => {
        AuthService.signUp(req.body)
            .then( CookieResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    signIn: (req: Request, res: Response, next: NextFunction) => {
        AuthService.signIn(req.body)
            .then( CookieResponse(statusCodes.OK,res) )
            .catch(next)
    },
    logOut:(req: Request, res: Response, next: NextFunction) => {
            try {
                CookieResponseEmpty(statusCodes.OK,res)()
            }catch(e){ next(e) }
    },
    
}