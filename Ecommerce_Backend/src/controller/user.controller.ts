import { Request, Response, NextFunction } from "express"
import statusCodes, { ControllerResponse } from "../helpers/statusResponse";
import UserService from "../service/user";


export const userController = {
    createUser: (req: Request, res: Response, next: NextFunction) => {
        UserService.create(req.body)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    getUsers: (req: Request, res: Response, next: NextFunction) => {
        UserService.getAll()
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
}