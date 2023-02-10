import UserRepository from "../db/user.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes, { ServiceResponse } from "../helpers/statusResponse"
import {UserInterface} from "../interfaces/tables"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
const UserService = {
    query:new UserRepository(),

    async create(data:UserInterface){
        if(data == undefined) throw new ErrorStatus("You must include the fields email and password")
        return await this.query.create(data)
    },
    async getAll(){
        return {result :await this.query.getAll()}
    },
    async getByEmail(data:UserInterface){
        if(!data.email) throw new ErrorStatus("Validation: You must provide an email",statusCodes.BADREQUEST)
        return await this.query.getOne({
            email:data.email,
            password:''
        })
    }
}

export default UserService