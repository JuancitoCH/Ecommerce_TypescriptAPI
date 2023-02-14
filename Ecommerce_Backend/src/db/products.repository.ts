import prisma from "../config/db";
import Dbrepository from "../interfaces/dbRepository";
import {ProductsInterface,ProductsInterfaceOptional} from "../interfaces/tables";

class ProductsRepository implements  Dbrepository{

    async create(productData:ProductsInterface):Promise< ProductsInterface >{
        return await prisma.products.create({
            data:{
                ...productData
            }
        })
    }
    
    async getOne(productData:ProductsInterfaceOptional):Promise< ProductsInterface | null>{
        return await prisma.products.findFirst({
            where:{
                ...productData
            }
        })
    }
    async getAll(filters?:object ,tag?:string):Promise< ProductsInterface[] | null>{
        // capaz de filtrar y paginar
        return await prisma.products.findMany({
            ...filters,
            where:{
                tags:{
                    contains:tag
                }
            }
        })
    }
    async count(filters?:object,tag?:string):Promise< number >{
        // capaz de filtrar y paginar
        return await prisma.products.count({
            where:{
                ...filters,
                tags:{
                    contains:tag
                }

            }
        })
    }
    async deleteOne(productData:ProductsInterface):Promise< ProductsInterface | null>{
        return await prisma.products.delete({
            where:{
                ...productData
            }
        })
    }
    async updateOne(productToUp:ProductsInterfaceOptional,data:ProductsInterfaceOptional):Promise< ProductsInterface | null>{
        return await prisma.products.update({
            where:{
                ...productToUp
            },
            data,
        })
    }
}

export default ProductsRepository