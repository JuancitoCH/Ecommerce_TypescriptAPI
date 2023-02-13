
import { Request, Response, NextFunction } from "express"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { UserInterface } from "../interfaces/tables"
import { jwtVerifyDecode } from "../libs/jwt"

export default function isLoged(req: Request, res: Response, next: NextFunction){
    console.log(req.cookies)
    if (!req.cookies.token) throw new ErrorStatus("Validation : Unhautorized You must be Logged",statusCodes.UNAHUTORIZED)
    const tokenDec = jwtVerifyDecode(req.cookies.token) as UserInterface
    // UserInterface & {iat:Date,exp:Date}
    if(
        !tokenDec.id &&
        !tokenDec.email &&
        !tokenDec.password
    ) throw new ErrorStatus("Validation : Unhautorized T",statusCodes.UNAHUTORIZED)
    return next()
}