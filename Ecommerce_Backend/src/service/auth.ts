import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes, { ServiceResponse } from "../helpers/statusResponse"
import {UserInterface} from "../interfaces/tables"
import UserService from "./user"

const AuthService = {
    async signUp (data:UserInterface){
        if(!data.email && !data.password){
            throw new ErrorStatus("Validation: You must include the fields email and password",statusCodes.BADREQUEST)
        }
        const userExist = await UserService.getByEmail(data)
        console.log(userExist)
        // verificar si existe o no el usuario con ese email
        // cifrar password y verificar longitud
        // verificar que el email corresponda con regex
    }
}

export default AuthService