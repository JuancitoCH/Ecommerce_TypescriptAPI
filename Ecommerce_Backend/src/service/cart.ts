import { Prisma } from "@prisma/client"
import CartRepository from "../db/cart.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import {CartInterface, CartInterfaceOptional, UserInterfaceOptional} from "../interfaces/tables"
import ProductsService from "./products"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
interface productsOnCart {
    productId:string,
    quantity:number
}
const CartService = {
    query:new CartRepository(),

    async create(data:CartInterface,userData:UserInterfaceOptional){
        if(
            !userData.id ||
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
    async addProduct(idUser:string,data:Array<productsOnCart>){
        // TODO: varificar que la data sea un array de objetos con productos
        const cart = await this.getOne({id_user:idUser})
        if(!cart) throw new ErrorStatus("Validation Cart : Cart not Exist")

        await Promise.all(data.map(async(prod) => {
            try{
                await ProductsService.getOne({id:prod.productId})
            }catch(e){
                throw new ErrorStatus(`Validation Cart : Product "${prod.productId}" not found`)
            }
        }))

        const products = [...cart.products as unknown as [] ?? [],...data]
        if( !data ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user:idUser },{
            products:products as unknown as Prisma.JsonValue
        })
    },
    async getUserCart(data:CartInterfaceOptional,userData:UserInterfaceOptional){
        if( !userData.id ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        const cart = await this.query.getOne(data)
        if(!cart) return await this.create({
            id_user:userData.id,
            products:[]
        },{
            id:userData.id
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