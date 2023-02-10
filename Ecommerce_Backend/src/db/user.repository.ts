import prisma from "../config/db";
import Dbrepository from "../interfaces/dbRepository";
import {UserInterface} from "../interfaces/tables";

class UserRepository implements  Dbrepository{

    async create(userData:UserInterface):Promise< UserInterface >{
        return await prisma.user.create({
            data:{
                ...userData
            }
        })
    }
    
    async getOne(userData:UserInterface):Promise< UserInterface | null>{
        return await prisma.user.findFirst({
            where:{
                ...userData
            }
        })
    }
    async getAll():Promise< UserInterface[] | null>{
        return await prisma.user.findMany()
    }
    async deleteOne(userData:UserInterface):Promise< UserInterface | null>{
        return await prisma.user.delete({
            where:{
                ...userData
            }
        })
    }
    async updateOne(userData:UserInterface,data:UserInterface):Promise< UserInterface | null>{
        return await prisma.user.update({
            where:{
                ...userData
            },
            data
        })
    }
}

export default UserRepository