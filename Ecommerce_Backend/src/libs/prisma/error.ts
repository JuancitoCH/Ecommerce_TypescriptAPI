import { Prisma } from "@prisma/client";
// import { match } from "assert";

export default function PrismaErrorManage(error:any){
    // Se pasa la ref del Objeto y Podemos Modificarlo
    if(error instanceof Prisma.PrismaClientInitializationError){
        // console.log("aaa")
    }
    if(error instanceof Prisma.PrismaClientUnknownRequestError){
        // match(error.message,/Authentication failed/)
        // console.log(error)
        error.message="Internal server error"
    }
    if(error instanceof Prisma.PrismaClientValidationError){
        // match(error.message,/Authentication failed/)
        error.message="Internal server error : Validation Error"
    }
    // console.error(error)
}