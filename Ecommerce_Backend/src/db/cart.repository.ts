import prisma from "../config/db";
import Dbrepository from "../interfaces/dbRepository";
import {CartInterface, CartInterfaceOptional } from "../interfaces/tables";


export default class CartRepository implements Dbrepository{

    async create(cartData: CartInterface): Promise<CartInterface> { 
        return await prisma.carts.create({
            data:{
                ...cartData
            }
        })
    }
    async getOne(CartData:CartInterfaceOptional):Promise< CartInterface | null>{
        
        return await prisma.carts.findFirst({
            where:{
                id_user:CartData.id_user,
                id:CartData.id
            },
        })
    }
    async getAll():Promise< CartInterface[] | null>{
        return await prisma.carts.findMany()
    }
    async deleteOne(CartData:CartInterface):Promise< CartInterface | null>{
        return await prisma.carts.delete({
            where:{
                ...CartData
            }
        })
    }
    async updateOne(CartData:CartInterface,data:CartInterfaceOptional):Promise< CartInterface | null>{
        return await prisma.carts.update({
            where:{
                ...CartData
            },
            data
        })
    }
}