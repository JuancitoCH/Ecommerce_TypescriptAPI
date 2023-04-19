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
            },
        })
    }
    async getAll(filter:SalesInterfaceOptional={}):Promise< SalesInterface[] | null>{
        return await prisma.sales.findMany({
            where:{
                ...filter
            }
        })
    }
    async deleteOne(salesData:SalesInterfaceOptional):Promise< SalesInterface | null>{
        return await prisma.sales.delete({
            where:{
                ...salesData
            }
        })
    }
    async updateOne(salesData:SalesInterfaceOptional,data:SalesInterfaceOptional):Promise< SalesInterface | null>{
        return await prisma.sales.update({
            where:{
                ...salesData
            },
            data
        })
    }
}