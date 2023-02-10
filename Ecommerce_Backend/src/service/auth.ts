import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import {UserInterface} from "../interfaces/tables"
import UserService from "./user"
import bycrypt from 'bcrypt'
import { jwtResponse } from "../libs/jwt"

const AuthService = {
    async signUp (data:UserInterface){
        if(!data.email || !data.password)throw new ErrorStatus("Validation: You must include the fields email and password",statusCodes.BADREQUEST)
        const userExist = await UserService.getByEmail(data)
        if(userExist) throw new ErrorStatus("Validation: User Alredy Exist",statusCodes.UNAHUTORIZED)
        // verificar que el email corresponda con regex
        // cifrar password y verificar longitud
        data.password = this.cryptPassword(data.password)
        return jwtResponse( await UserService.create({ email:data.email, password:data.password }) )
    },
    async signIn(){},


    cryptPassword(passw:string):string{
        const salt = bycrypt.genSaltSync()
        return bycrypt.hashSync(passw,salt)
    },
    comparePassword(passw:string,crypted:string){
        return bycrypt.compareSync(passw,crypted)
    }
}

export default AuthService