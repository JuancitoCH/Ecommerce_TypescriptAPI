import { Request, Response, NextFunction } from "express"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { UserInterface, UserInterfaceOptional } from "../interfaces/tables"
import { jwtVerifyDecode } from "../libs/jwt"

export interface RequestUserData extends Request{
    userData:{
        id:string,
        email:string,
        permission:string,
    }
}
export default function isLoged(req: Request, res: Response, next: NextFunction){
    if (!req.cookies.token) throw new ErrorStatus("Validation : Unhautorized You must be Logged",statusCodes.UNAHUTORIZED)
    const tokenDec = jwtVerifyDecode(req.cookies.token) as UserInterface
    // UserInterface & {iat:Date,exp:Date}
    if(
        !tokenDec.id ||
        !tokenDec.email ||
        !tokenDec.password
    ) throw new ErrorStatus("Validation : Unhautorized T",statusCodes.UNAHUTORIZED)
    const copyData = {
        id:tokenDec.id,
        email:tokenDec.email,
        permission:tokenDec.permission || "USER",
    };
    (req as RequestUserData).userData = copyData
    return next()
}
export function isAdmin(req: Request, res: Response, next: NextFunction){
    if (!req.cookies.token) throw new ErrorStatus("Validation : Unhautorized You must be Logged",statusCodes.UNAHUTORIZED)
    const tokenDec = jwtVerifyDecode(req.cookies.token) as UserInterface
    // UserInterface & {iat:Date,exp:Date}

    if(
        !tokenDec.id ||
        !tokenDec.email ||
        !tokenDec.password ||
        tokenDec.permission !== "ADMIN"

    ) throw new ErrorStatus("Validation : Unhautorized",statusCodes.UNAHUTORIZED)
    return next()
}