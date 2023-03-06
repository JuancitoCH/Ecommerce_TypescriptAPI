import { Prisma } from "@prisma/client";
import statusCodes from "../../helpers/statusResponse";
// import { match } from "assert";

export default function PrismaErrorManage(error:any){
    // Se pasa la ref del Objeto y Podemos Modificarlo
    if(error instanceof Prisma.PrismaClientInitializationError){
        // console.log("aaa")
    }
    else if(error instanceof Prisma.PrismaClientUnknownRequestError){
        // match(error.message,/Authentication failed/)
        // console.log(error)
        error.message="Internal server error"
    }
    else if(error instanceof Prisma.PrismaClientValidationError){
        // match(error.message,/Authentication failed/)
        error.message="Internal server error : Validation Error"
    }
    else if(error instanceof Prisma.PrismaClientKnownRequestError){
        // match(error.message,/Authentication failed/)
        error.message= error.meta?.message as string
        if(error.code=="P2023") {
            // el ANY se podra cambiar?
            (error as any).statusCode = statusCodes.BADREQUEST
            error.message = "Invalid ID : You must include a Valid ID" }
    }
    // console.error(error)
}