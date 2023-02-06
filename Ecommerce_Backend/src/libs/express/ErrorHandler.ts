import {Request,Response,NextFunction} from 'express'
import { ErrorStatus } from '../../errors/ErrorStatus';
import { responseJsonInterface } from '../../interfaces/responseJson';


export default (err:ErrorStatus,req:Request,res:Response,next:NextFunction)=>{
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
