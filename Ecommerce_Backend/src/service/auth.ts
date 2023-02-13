import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import {UserInterface} from "../interfaces/tables"
import UserService from "./user"
import bycrypt from 'bcrypt'
import { jwtResponse } from "../libs/jwt"

const AuthService = {
    async signUp (data:UserInterface){
        if(!data.email || !data.password)throw new ErrorStatus("Validation : You must include the fields email and password",statusCodes.BADREQUEST)
        if(!this.emailValidation(data.email)) throw new ErrorStatus(`Validation : Email: "${data.email}" is not valid`,statusCodes.BADREQUEST)
        const userExist = await UserService.getByEmail(data)
        if(userExist) throw new ErrorStatus("Validation : User Alredy Exist",statusCodes.UNAHUTORIZED)

        if(data.password.length<8) throw new ErrorStatus(`Validation : field Password must have at least 8 characters`,statusCodes.BADREQUEST)
        data.password = this.cryptPassword(data.password)
        return jwtResponse( await UserService.create({ email:data.email, password:data.password }) )
    },
    async signIn(data:UserInterface){
        if(!data.email || !data.password)throw new ErrorStatus("Validation : You must include the fields email and password",statusCodes.BADREQUEST)
        if(!this.emailValidation(data.email)) throw new ErrorStatus(`Validation : Email: "${data.email}" is not valid`,statusCodes.BADREQUEST)
        const userExist = await UserService.getByEmail(data)
        if(!userExist) throw new ErrorStatus("Validation : Email or Password Incorrect",statusCodes.BADREQUEST)
        if(!this.comparePassword(data.password,userExist.password))throw new ErrorStatus("Validation : Email or Password Incorrect",statusCodes.BADREQUEST)
        return jwtResponse( userExist )
    },

    emailValidation(email:string){
        const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
        return reg.test(email)
    },

    cryptPassword(passw:string):string{
        const salt = bycrypt.genSaltSync()
        return bycrypt.hashSync(passw,salt)
    },
    comparePassword(passw:string,crypted:string){
        return bycrypt.compareSync(passw,crypted)
    }
}

export default AuthService