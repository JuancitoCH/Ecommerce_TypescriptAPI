import { responseJsonInterface } from "../interfaces/responseJson";
import { Response } from "express"
import envs from "../config/envs";
import { jwtVerifyDecode } from "../libs/jwt";
import { JwtPayload } from "jsonwebtoken";

enum statusCodes {
    OK = 200,
    CREATED = 201,
    BADREQUEST = 400,
    UNAHUTORIZED = 401,
    NOTFOUND = 404,
    INTERNALSERVERERROR = 500,
    SERVICEUNVALIABLE = 503,
}


function ServiceResponse(data: object | undefined, code: statusCodes, success: boolean) {
    const response: responseJsonInterface = {
        status: code,
        success,
        data,
    }
    return response
}

export function ControllerResponse(code: statusCodes, res: Response) {
    return (result: object) => {
        const restoSend = ServiceResponse(result, code, true)
        return res.status(restoSend.status).json(restoSend)
    }
}

export function CookieResponse(code: statusCodes, res: Response) {
    return (result: object) => {
        const restoSend = ServiceResponse(result, code, true)
        const token = (restoSend.data && 'token' in restoSend.data && restoSend.data.token) as string
        let exp = (jwtVerifyDecode(token) as JwtPayload).exp
        return res.status(restoSend.status)
            .cookie('token', token, {
                httpOnly: true,
                ...(envs.node_mode !== 'development') && ({
                    secure: true,
                    sameSite: 'none'
                }),
                expires: exp ? new Date(exp * 1000) : undefined
            })
            .json(restoSend)
    }
}

export function CookieResponseEmpty(code: statusCodes, res: Response) {
    return () => {
        const restosend = ServiceResponse(undefined,statusCodes.OK,true)
        return res.status(restosend.status)
            .cookie('token', "", {
                httpOnly: true,
                ...(envs.node_mode !== 'development') && ({
                    secure: true,
                    sameSite: 'none'
                }),
                // añadir expiracion para ahora
                // expires:
            }).json(restosend)
    }
}

export default statusCodes