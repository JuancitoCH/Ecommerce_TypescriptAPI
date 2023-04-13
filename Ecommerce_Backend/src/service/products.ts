import { Prisma } from "@prisma/client"
import envs from "../config/envs"
import ProductsRepository from "../db/products.repository"
import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { ProductsInterface, ProductsInterfaceOptional } from "../interfaces/tables"

interface Options extends Object{
    page?:number,
    limit?:number,
    tag?:string
}

interface imagesOb extends Object{
    product:string[],
    subimages:string[],
}

const ProductsService = {
    query:new ProductsRepository(),

    async create(data:ProductsInterface){
        if(
            !data.available ||
            !data.description ||
            !data.name ||
            !data.price ||
            !data.stock ||
            !data.tags
        ) throw new ErrorStatus(`
        Validation : You must include this fields : 
        name: string;
        stock: number;
        price: number;
        description: string;
        available: boolean;
        tags: string; `,statusCodes.BADREQUEST)
        const product = await this.query.create(data)
        return product
    },
    async getFilterPagination(options:Options = { page:1, limit:10 }){

        if(options.page != undefined && options.page < 1)throw new Error("Validation : The page param must be greater than 0")
        let url = envs.url_deployed
        if (envs.node_mode!="production" && envs.PORT!=undefined)url += envs.PORT

        const count = await this.query.count(undefined,options.tag)
        const product = await this.query.getAll({
            skip:options?.page && options?.limit ? (options?.page -1) * options?.limit : 0,
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
    async getOne(data:ProductsInterfaceOptional){
        // if( Object.entries(data).length === 0 ) throw new ErrorStatus("Validation : You must include the fields requested for find the product")
        if( !data.id  ) throw new ErrorStatus("Validation : You must include the fields requested for find the product")
        const product = await this.query.getOne(data)
        if(product === null) throw new ErrorStatus("Search : Product not Found",statusCodes.NOTFOUND)
        return product
    },

    async update( productToUp:ProductsInterfaceOptional,data:ProductsInterfaceOptional, replace?:string  ){
        if(!productToUp && !("idProduct" in productToUp) ) throw new ErrorStatus("Validation : You must include the product id on the url")
        const productInfo = await this.getOne(productToUp)
        if(!productInfo) throw new ErrorStatus("Validation : product not found ",statusCodes.BADREQUEST)
        // this logic is for format the fields and verify to prisma
        if(data.images){
            const prForamte = productInfo?.images as unknown as imagesOb
            const daForamte = data.images as unknown as imagesOb
            if(daForamte.product || daForamte.subimages ){
                    data.images = {
                        product:[...prForamte.product ?? [], ... daForamte.product ?? []],
                        subimages:[...prForamte.subimages ?? [], ... daForamte.subimages ?? []],
        
                    } as Prisma.JsonObject
            }else if(replace !== "yes"){ delete data.images }
        }

        const product = await this.query.updateOne(productToUp,data)
        return product
    },
    async updateDecreaseStock(idProduct:string,number:number){
        return await this.query.updateDecreaseStock({id:idProduct},number)
    },
    async updateIncreaseStock(idProduct:string,number:number){
        if(Number.isNaN(number)) throw new ErrorStatus('You must include a valid number',statusCodes.BADREQUEST)
        return await this.query.updateIncreaseStock({id:idProduct},number)
    },
}

export default ProductsService