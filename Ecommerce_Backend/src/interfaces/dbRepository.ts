import { Prisma } from "@prisma/client";

export default interface Dbrepository{
    create(param:object):{},
    getOne(param:object):{},
    getAll(param:object):{},
    deleteOne(param:object):{},
    updateOne(param:object,data:object):{},
}