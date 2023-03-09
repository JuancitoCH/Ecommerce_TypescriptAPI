import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import Dbrepository from "../interfaces/dbRepository";
import {TagsInterface ,TagsInterfaceOptional} from "../interfaces/tables";


export default class tagsRepository implements Dbrepository{

    async create(data: TagsInterface): Promise<TagsInterface> { 
        
        // mi mente no comprende por que poronga no funciona bien esta cagada
        return await prisma.tags.create({
            data
        })
    }
    async getOne(tagsData:TagsInterfaceOptional):Promise< TagsInterface | null>{
        return await prisma.tags.findFirst({
            where:{
                ...tagsData
            }
        })
    }
    async getAll():Promise< TagsInterface[] | null>{
        return await prisma.tags.findMany()
    }
    async deleteOne(tagsData:TagsInterface):Promise< TagsInterface | null>{
        return await prisma.tags.delete({
            where:{
                ...tagsData
            }
        })
    }
    async updateOne(tagsData:TagsInterface,data:TagsInterfaceOptional):Promise< TagsInterface | null>{
        return await prisma.tags.update({
            where:{
                ...tagsData
            },
            data
        })
    }
}