import CartRepository from "../db/cart.repository"
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
        // TODO: Verificar que los productos sea un array con objetos {id_Products and quantity}

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
        // TODO: verificamos los campos de products asi no haya ningun error al cargar los datos
        // products tiene que ser un array
        // ejemplo quantity negativa y un id que no existe
        // if ((productTyped.quantity as number) < 0 || NaN ) throw new ErrorStatus("validation Cart");

        if(
            !data.id &&
            !data.id_user &&
            !data.products 
        ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user:idUser },data)
    },
    async getUserCart(data:CartInterfaceOptional){
        if( !data.id_user ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        const cart = await this.query.getOne(data)
        if(!cart) return await this.create({
            id_user:data.id_user,
            products:[]
        })
        return cart
    },
    async clearCartUser(idUser:string){
        await this.update(idUser,{
            products:[]
        })
    }
}

export default CartService