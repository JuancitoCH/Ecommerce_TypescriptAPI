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
    async getFilterPagination(options:Options = { page:1, limit:10 }){

        if(options.page != undefined && options.page < 1)throw new Error("Validation : The page param must be greater than 0")
        let url = envs.url_deployed
        if (envs.node_mode!="production" && envs.PORT!=undefined)url += envs.PORT

        const count = await this.query.count(undefined,options.tag)
        const product = await this.query.getAll({
            skip:options?.page && options?.limit ? (options?.page -1) * options?.limit : 10,
            take:options?.limit && options?.limit * 1,
        },options.tag)

        let pageP = options?.page ? options.page*1 : 1
        let limitP = options?.limit ? options.limit*1 : 10
        let pages = Math.floor(count/limitP)
        if(count % limitP > 0) pages+=1

        const nextPage = pages >  pageP ? pageP +1 : null 
        const prevPage = pages >= pageP ? pageP -1 : null
        return {
            result:product,
            nextPage:nextPage &&`${url}/products?page=${nextPage}&limit=${limitP}`,
            prevPage:prevPage ? `${url}/products?page=${prevPage}&limit=${limitP}`:null,
            pages,
            quantity:count
        }
    },
}

export default ProductsService