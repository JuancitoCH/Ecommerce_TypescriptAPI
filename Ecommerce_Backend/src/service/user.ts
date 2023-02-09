import UserRepository from "../db/user.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes, { ServiceResponse } from "../helpers/statusResponse"
import {UserInterface} from "../interfaces/tables"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
const UserService = {
    query:new UserRepository(),

    async create(data:UserInterface){
        if(data == undefined) throw new ErrorStatus("und")
        const result = await this.query.create(data)
        return ServiceResponse(result,statusCodes.CREATED,true)
    },
}

export default UserService