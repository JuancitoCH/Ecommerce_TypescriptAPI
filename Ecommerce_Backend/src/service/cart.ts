import { Prisma } from "@prisma/client"
import CartRepository from "../db/cart.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { CartInterface, CartInterfaceOptional, UserInterfaceOptional } from "../interfaces/tables"
import ProductsService from "./products"

// tenemos que verificar que las operaciones de creacion fueron correctas
// y manejar los errores que surjan
export interface productsOnCart {
    productId: string,
    quantity: number
}
const CartService = {
    query: new CartRepository(),

    async create(data: CartInterface, userData: UserInterfaceOptional) {
        if (
            !userData.id ||
            !data.products
        ) throw new ErrorStatus("validation fields : You must include the required fields")
        // TODO: Verificar que los productos sea un array con objetos {id_Products and quantity}

        return await this.query.create(data)
    },
    async getOne(data: CartInterfaceOptional) {
        if (
            !data.id &&
            !data.id_user &&
            !data.products
        ) throw new ErrorStatus("validation Fields : You Must include at least one field", statusCodes.BADREQUEST)
        return await this.query.getOne(data)
    },
    async update(idUser: string, data: CartInterfaceOptional) {
        // TODO: verificamos los campos de products asi no haya ningun error al cargar los datos
        // products tiene que ser un array
        // ejemplo quantity negativa y un id que no existe
        // if ((productTyped.quantity as number) < 0 || NaN ) throw new ErrorStatus("validation Cart");

        if (
            !data.id &&
            !data.id_user &&
            !data.products
        ) throw new ErrorStatus("validation Fields : You Must include at least one field", statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user: idUser }, data)
    },
    async addProduct(idUser: string, data: Array<productsOnCart>) {
        // TODO: varificar que la data sea un array de objetos con productos
        const cart = await this.getOne({ id_user: idUser })
        if (!cart) throw new ErrorStatus("Validation Cart : Cart not Exist")
        const productsTemp = [...cart.products as unknown as [] ?? [], ...data]
        const productsMap: any = {}
        productsTemp.forEach(prod => {
            if (productsMap[prod.productId]) {
                productsMap[prod.productId] += prod.quantity
            } else {
                productsMap[prod.productId] = prod.quantity
            }
        })
        const products:productsOnCart[] = Object.keys(productsMap).map(key=>{
            return {
                productId:key,
                quantity:productsMap[key]
            }
        })
        await Promise.all(products.map(async (prod) => {
            try {
                const productInfo = await ProductsService.getOne({ id: prod.productId })
                if (productInfo.stock < prod.quantity) throw new ErrorStatus(`Validation Cart : Product "${prod.productId}" not stock available`)
            } catch (e) {
                if ((e as ErrorStatus).message.includes('stock')) throw e
                throw new ErrorStatus(`Validation Cart : Product "${prod.productId}" not found`)
            }
        }))

        if (!data) throw new ErrorStatus("validation Fields : You Must include at least one field", statusCodes.BADREQUEST)
        return await this.query.updateOne({ id_user: idUser }, {
            products: products as unknown as Prisma.JsonValue
        })
    },
    async getUserCart(data: CartInterfaceOptional, userData: UserInterfaceOptional) {
        if (!userData.id) throw new ErrorStatus("validation Fields : You Must include at least one field", statusCodes.BADREQUEST)
        const cart = await this.query.getOne(data)
        if (!cart) return await this.create({
            id_user: userData.id,
            products: []
        }, {
            id: userData.id
        })
        return cart
    },
    async clearCartUser(idUser: string) {
        await this.update(idUser, {
            products: []
        })
    }
    , async deleteOneProduct(idUser: string, productData: productsOnCart) {
        // TODO: verify productData info
        // products data need to match quantity and id
        if (!productData.productId && !productData.quantity) throw new ErrorStatus("Invalid Cart : you must include the productId and quantity fields")

        const cart = await this.getOne({ id_user: idUser })
        const cartProducts = cart?.products as unknown as Array<productsOnCart>
        let positionElementToDelete = -1
        cartProducts.forEach((prod, i) => {
            if (prod.productId == productData.productId && prod.quantity == productData.quantity) { positionElementToDelete = i };
        });
        if (positionElementToDelete == -1) throw new ErrorStatus("Invalid Cart : product not found on user cart", statusCodes.NOTFOUND)

        cartProducts.splice(positionElementToDelete, 1)
        return await this.update(idUser, {
            products: cartProducts as unknown as Prisma.JsonValue
        })
    }

}

export default CartService