import { Request, Response, NextFunction } from "express"
import statusCodes from "../helpers/statusResponse";
import { responseJsonInterface } from '../interfaces/responseJson'
import UserService from "../service/user";

export const userController = {
    createUser: (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        UserService.create(req.body)
            .then(result => {
                return res.status(result.status).json(result)
            }).catch(next)
    },
    getUsers: (req: Request, res: Response, next: NextFunction) => {

        const serverResponse: responseJsonInterface = {
            status: statusCodes.OK,
            success: true,
            data: {
                message: "hola"
            }
        }
        return res.status(statusCodes.OK).json(serverResponse)
    },
}