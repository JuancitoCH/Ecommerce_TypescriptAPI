import { Prisma } from "@prisma/client"
import SalesRepository from "../db/sales.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import {SalesInterface, SalesInterfaceOptional } from "../interfaces/tables"
import CartService from "./cart"
import ProductsService from "./products"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
const SalesService = {
    query:new SalesRepository(),

    async create(data:SalesInterface){
        if(
            !data.id_user ||
            !data.products ||
            !data.amount ||
            !data.details
        ) throw new ErrorStatus("validation Fields : You must include the required fields SALES")
        // verificar que el precio sea positivo
        return await this.query.create(data)
    },
    async getOne(data:SalesInterfaceOptional){
        if( !data.id ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.getOne(data)
    },
    async getAll(){
        return{ result : await this.query.getAll()}
    },
    async update(idUser:string,data:SalesInterfaceOptional){
        if(
            !data.products &&
            !data.amount &&
            !data.details 
        ) throw new ErrorStatus("validation Fields : You Must include at least one field",statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user:idUser },data)
    },
    async deleteOne(idSale:string){
        if(!idSale) throw new ErrorStatus("validation Params : you must include an ID ")
        return await this.query.deleteOne({id:idSale})

    },
    // esta funcion sera invocada el el payment intent al querer comprar el Cart



    async payOneProduct(idUser:string){
        const paymentData = {
            description:"",
            amount:0,
            metadata:{
                sale:""
            }
        };

        // TODO:------------

        return paymentData
    },

    async payCart(idUser:string){
        const cart = await CartService.getUserCart({id_user:idUser})
        if(!cart.products || !(cart.products as Prisma.JsonArray)[0]) throw new ErrorStatus("validation Error : User dont have any products on the cart" ,statusCodes.UNAHUTORIZED);
        const paymentData = {
            description:"",
            amount:0,
            metadata:{
                sale:""
            }
        };
        (cart.products as Prisma.JsonArray).forEach( async (product:Prisma.JsonValue,i:number) => {
            const productTyped = (product as Prisma.JsonObject)
            if(
                !("quantity" in productTyped) ||
                !("id" in productTyped)
            ){
                // hacemos una correccion a los productos a fuerza si no existe ninguna
                //  de las propiedades antes analizadas en el if
                const correction = (cart.products as Prisma.JsonArray).splice(i,1)
                CartService.update(idUser,{
                    products: correction as Prisma.JsonValue
                })
                throw new ErrorStatus(`validation Cart : One Product in index:${i} was remove because it has bad fields`,statusCodes.BADREQUEST)
            }else{
                // llenamos los datos de retorno y de la venta
                const dataProduct = await ProductsService.getOne({id:productTyped.id as string})
                const totalPriceProduct = dataProduct.price * (productTyped.quantity as number)
                paymentData.amount += totalPriceProduct
                paymentData.description += `${dataProduct.name} x ${(productTyped.quantity as number)} :   $${totalPriceProduct}\n`
                // paymentData.metadata.products += `${dataProduct.id} , `

            }
        });
        const sale = await this.create({
            amount:paymentData.amount,
            details: paymentData.description,
            id_user:idUser,
            products: (cart.products as Prisma.JsonArray)
        })
        paymentData.metadata.sale = sale.id ? sale.id : "Error";
        CartService.clearCartUser(idUser)
        return paymentData
    },
    async salePaied(){
        // cuando stripe change.succeded cambiamos el valor booleano de la venta
        // TODO:-----------------------
    }
}

export default SalesService