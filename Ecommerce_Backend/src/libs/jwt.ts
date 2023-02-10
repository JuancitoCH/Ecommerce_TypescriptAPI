import jwt from 'jsonwebtoken'
import envs from '../config/envs'
import { ErrorStatus } from '../errors/ErrorStatus'
// https://javascript.plainenglish.io/how-to-check-if-a-generic-has-a-certain-property-or-method-in-typescript-efcc866c3e7f
export function jwtResponse<T extends object>(data:T, expiresIn:string = "7d"){
    const jwt_token = jwt.sign(data,envs.jwt_secret as jwt.Secret, { expiresIn })
    if("password" in data ) delete data.password
    return {
        ...data,
        token:jwt_token
    }
}

export function jwtVerifyDecode(token:string):string | jwt.JwtPayload | never{
    try{
        return jwt.verify(token,envs.jwt_secret as jwt.Secret)
    }catch(e){
        throw new ErrorStatus("Validation : Token Error")
    }
}
