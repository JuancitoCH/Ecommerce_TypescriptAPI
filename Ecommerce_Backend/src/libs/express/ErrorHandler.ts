import {Request,Response,NextFunction} from 'express'
import { ErrorStatus } from '../../errors/ErrorStatus';
import { responseJsonInterface } from '../../interfaces/responseJson';
import PrismaErrorManage from '../prisma/error';


export default (err:ErrorStatus,req:Request,res:Response,next:NextFunction)=>{
    // aqui handler errores de prisma ()
    console.log(err)
    PrismaErrorManage(err)
    const status = err.statusCode ?? 500;
	const message = err.message ?? 'Internal server error';
    const response : responseJsonInterface ={
        status,
            success:false,
            error:{
                message,
            }
    }
	return res.status(status).json(response);
}
