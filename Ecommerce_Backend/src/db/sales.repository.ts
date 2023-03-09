import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import Dbrepository from "../interfaces/dbRepository";
import {SalesInterface, SalesInterfaceOptional } from "../interfaces/tables";


export default class SalesRepository implements Dbrepository{

    async create(data: SalesInterface): Promise<SalesInterface> { 
        data.products = data.products as Prisma.InputJsonValue
        // mi mente no comprende por que poronga no funciona bien esta cagada
        return await prisma.sales.create({
            data:{
              amount:data.amount,
              details:data.details,
              id_user:data.id_user,
              products:data.products,
            }
        })
    }
    async getOne(salesData:SalesInterfaceOptional):Promise< SalesInterface | null>{
        return await prisma.sales.findFirst({
            where:{
                ...salesData
            }
        })
    }
    async getAll():Promise< SalesInterface[] | null>{
        return await prisma.sales.findMany()
    }
    async deleteOne(salesData:SalesInterface):Promise< SalesInterface | null>{
        return await prisma.sales.delete({
            where:{
                ...salesData
            }
        })
    }
    async updateOne(salesData:SalesInterface,data:SalesInterfaceOptional):Promise< SalesInterface | null>{
        return await prisma.sales.update({
            where:{
                ...salesData
            },
            data
        })
    }
}