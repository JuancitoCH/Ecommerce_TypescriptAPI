import envs from "../config/envs"
import ProductsRepository from "../db/products.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { ProductsInterface } from "../interfaces/tables"

interface Options extends Object{
    page?:number,
    limit?:number,
    tag?:string
}

const ProductsService = {
    query:new ProductsRepository(),

    async create(data:ProductsInterface){
        // Comprobar todos los campos
        // Aunque no hace falta en cara al publico
        const product = await this.query.create(data)
        console.log(product)

        return product
    },
    async getAll(options?:Options){
        // verificar que no sean negativos los campos o pasarlos a posi
        // pasar y verificar los string
        console.log(options)
        // Logica de paginacion y filtros
        // skip
        // take

        // Logic url enviroment
        let url = envs.url_deployed
        // /products?page=3&limit=5&tag=manzana
        if (envs.node_mode!="production" && envs.PORT!=undefined)url += envs.PORT

        const count = await this.query.count()
        const product = await this.query.getAll({
            skip:options?.page && options?.limit ? (options?.page -1) * options?.limit : undefined,
            take:options?.limit && options?.limit * 1
        })
        return {
            result:product,
            nextPage:`${url}/products?page=${1}&limit=${10}`,
            prevPage:`${url}/products?page=${1}&limit=${10}`,
            pages:"",
            quantity:count
        }
    },
}

export default ProductsService