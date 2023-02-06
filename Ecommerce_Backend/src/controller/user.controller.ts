import { Request, Response } from "express"
import statusCodes from "../helpers/statusResponse";
import { responseJsonInterface } from '../interfaces/responseJson'

export const userController = {
    getUsers: (req: Request, res: Response) => {
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