import { Prisma } from "@prisma/client"
import SalesRepository from "../db/sales.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { ProductReqBody } from "../interfaces/payment"
import { SalesInterface, SalesInterfaceOptional } from "../interfaces/tables"
import CartService, { productsOnCart } from "./cart"
import ProductsService from "./products"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan

const SalesService = {
    query: new SalesRepository(),

    async create(data: SalesInterface) {
        delete data.statusPay
        if (
            !data.id_user ||
            !data.products ||
            !data.amount ||
            !data.details
        ) throw new ErrorStatus("validation Fields : You must include the required fields SALES")
        // verificar que el precio sea positivo
        return await this.query.create(data)
    },
    async getOne(data: SalesInterfaceOptional) {
        if (!data.id) throw new ErrorStatus("validation Fields : You Must include at least one field", statusCodes.BADREQUEST)
        return await this.query.getOne(data)
    },
    async getAll() {
        return { result: await this.query.getAll() }
    },
    async getAllUser(idUser:string) {
        return { result: await this.query.getAll({
            id_user:idUser
        }) }
    },
    // only admins
    async update(idSale: string, data: SalesInterfaceOptional) {
        console.log(data.information)
        if (
            !data.products &&
            !data.amount &&
            !data.details &&
            !data.statusPay &&
            !data.information
        ) {
            throw new ErrorStatus("validation Sales : You Must include at least one field", statusCodes.BADREQUEST)
        }
        return await this.query.updateOne({ id: idSale }, data)
    },
    async deleteOne(idSale: string) {
        if (!idSale) throw new ErrorStatus("validation Sales : you must include an ID ")
        return await this.query.deleteOne({ id: idSale })

    },
    // esta funcion sera invocada el el payment intent al querer comprar el Cart



    async payOneProduct(idUser: string, productData: ProductReqBody | undefined) {
        const paymentData = {
            description: "",
            amount: 0,
            metadata: {
                sale: "",
                idUser:""
            }
        };
        if (!productData) throw new ErrorStatus("Invalid Products : you must include field product with at least id and quantity field", statusCodes.BADREQUEST)
        // TODO: Verificar campos de pasaje de datos
        // obtener el producto por id y obtener el precio
        const productDetails = await ProductsService.getOne({ id: productData.id })
        if (!productDetails) throw new ErrorStatus("Invalid Products : product not found", statusCodes.NOTFOUND)
        productData.quantity = Number(productData.quantity)
        if (typeof (productData.quantity) !== "number"
            || isNaN(productData.quantity)
            || productData.quantity < 1
            || productData.quantity > productDetails.stock) throw new ErrorStatus("Invalid Products : Product Quantity must be a number and not overpass the stock", statusCodes.BADREQUEST)


        const totalPriceProduct = productData.quantity * productDetails.price
        paymentData.amount = totalPriceProduct
        paymentData.description = `${productDetails.name} x ${productData.quantity} = $${totalPriceProduct / 100} \n`

        const saleInfo = await this.create({
            amount: paymentData.amount,
            details: paymentData.description,
            id_user: idUser,
            products: [{
                productId: productDetails.id,
                quantity: productData.quantity
            }]
        })
        // TODO: verificar la informacion de sale y lanzar error de ser necesario
        paymentData.metadata.sale = saleInfo.id ? saleInfo.id : "Error";
        paymentData.metadata.idUser = idUser;
        return paymentData

    },
    async payCartProducts(idUser: string) {
        const paymentData = {
            description: "",
            amount: 0,
            metadata: {
                sale: "",
                idUser:""
            }
        };
        const productsArrayFinalDetails:Array<{
            productId:string,
            quantity:number
        }> = []
        const cartData = await CartService.getUserCart({}, { id: idUser })
        const productsData = cartData.products as unknown as Array<productsOnCart>
        
        if (productsData.length == 0) throw new ErrorStatus("Invalid PayIntent : you must include at least one Product on your cart", statusCodes.BADREQUEST)


        await Promise.all(productsData.map(async (prod) => {
            const productDetails = await ProductsService.getOne({ id: prod.productId })
            if (!productDetails) throw new ErrorStatus("Invalid PayIntent : product not found", statusCodes.NOTFOUND)
            // TODO: eliminamos el que no se encontro?
            prod.quantity = Number(prod.quantity)
            if (typeof (prod.quantity) !== "number"
                || isNaN(prod.quantity)
                || prod.quantity < 1
                || prod.quantity > productDetails.stock) throw new ErrorStatus("Invalid Products : Product Quantity must be a number and not overpass the stock", statusCodes.BADREQUEST)

            const totalPriceProduct=prod.quantity * productDetails.price
            paymentData.amount += totalPriceProduct
            paymentData.description += `${productDetails.name} x ${prod.quantity} = $${totalPriceProduct / 100} \n`

            
            productsArrayFinalDetails.push({
                productId: productDetails.id as string,
                quantity: prod.quantity
            })
        }));

        // TODO: Verificar campos de pasaje de datos
        // obtener el producto por id y obtener el precio

        const saleInfo = await this.create({
            amount: paymentData.amount,
            details: paymentData.description,
            id_user: idUser,
            products: productsArrayFinalDetails
        })
        // TODO: verificar la informacion de sale y lanzar error de ser necesario
        paymentData.metadata.sale = saleInfo.id ? saleInfo.id : "Error";
        paymentData.metadata.idUser = idUser;
        // CartService.clearCartUser(idUser)
        return paymentData

    },

    // async payCart(idUser: string) {
    //     const cart = await CartService.getUserCart({}, { id: idUser })
    //     if (!cart.products || !(cart.products as Prisma.JsonArray)[0]) throw new ErrorStatus("validation Cart : User dont have any products on the cart", statusCodes.UNAHUTORIZED);
    //     const paymentData = {
    //         description: "",
    //         amount: 0,
    //         metadata: {
    //             sale: ""
    //         }
    //     };
    //     (cart.products as Prisma.JsonArray).forEach(async (product: Prisma.JsonValue, i: number) => {
    //         const productTyped = (product as Prisma.JsonObject)
    //         if (
    //             !("quantity" in productTyped) ||
    //             !("id" in productTyped)
    //         ) {
    //             // hacemos una correccion a los productos a fuerza si no existe ninguna
    //             //  de las propiedades antes analizadas en el if
    //             const correction = (cart.products as Prisma.JsonArray).splice(i, 1)
    //             CartService.update(idUser, {
    //                 products: correction as Prisma.JsonValue
    //             })
    //             throw new ErrorStatus(`validation Cart : One Product in index:${i} was remove because it has bad fields`, statusCodes.BADREQUEST)
    //         } else {
    //             // llenamos los datos de retorno y de la venta
    //             const dataProduct = await ProductsService.getOne({ id: productTyped.id as string })
    //             const totalPriceProduct = dataProduct.price * (productTyped.quantity as number)
    //             paymentData.amount += totalPriceProduct
    //             paymentData.description += `${dataProduct.name} x ${(productTyped.quantity as number)} :   $${totalPriceProduct / 100}\n`
    //             // paymentData.metadata.products += `${dataProduct.id} , `

    //         }
    //     });
    //     const sale = await this.create({
    //         amount: paymentData.amount,
    //         details: paymentData.description,
    //         id_user: idUser,
    //         products: (cart.products as Prisma.JsonArray)
    //     })
    //     paymentData.metadata.sale = sale.id ? sale.id : "Error";
    //     CartService.clearCartUser(idUser)
    //     return paymentData
    // },
    async salePaied(idSale: string,statusPay=true) {
        // cuando stripe change.succeded cambiamos el valor booleano de la venta
        return await this.update(idSale, {
            statusPay
        })
    },
    async salePaiedUpdateStock(idSale: string) {
        const paied = await this.getOne({id:idSale})
        const products = paied?.products as unknown as { productId:string,quantity:number }[]
        // verificamos que el stock este disponible
        const productMap:any = {}
        await Promise.all( products.map(async prodData => {
            const productInfo = await ProductsService.getOne({id:prodData.productId});
            if(!(prodData.productId in productMap)) productMap[prodData.productId]=productInfo.stock
            if((productMap[prodData.productId] - prodData.quantity )>=0){
                productMap[prodData.productId] = productMap[prodData.productId] - prodData.quantity
                return true;
            }
            else
            {
                throw new ErrorStatus("Invalid Sale: Product stock not available");
            }
        }) );
        products.forEach(async prodData => {
            await ProductsService.updateDecreaseStock(prodData.productId,prodData.quantity)
        });
    }
}

export default SalesService