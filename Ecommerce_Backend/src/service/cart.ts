import CartRepository from "../db/cart.controller"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import {CartInterface, CartInterfaceOptional} from "../interfaces/tables"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
const CartService = {
    query:new CartRepository(),

    async create(data:CartInterface){
        if(
            !data.id_user ||
            !data.products
        ) throw new ErrorStatus("validation fields : You must include the required fields")
        return await this.query.create(data)
    },
    async getOne(data:CartInterfaceOptional){
        if(
            !data.id &&
            !data.id_user &&
            !data.products 
        ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.getOne(data)
    },
    async update(idUser:string,data:CartInterfaceOptional){
        if(
            !data.id &&
            !data.id_user &&
            !data.products 
        ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user:idUser },data)
    },
    
}

export default CartService