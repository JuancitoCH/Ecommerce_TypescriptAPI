import {Request,Response,NextFunction} from 'express'
import { responseJson } from '../../Types/responseJson'


export default (req:Request,res:Response,next:NextFunction)=>{
    const response : responseJson = {
        status:404,
        success:false,
        error:{
            message:"404 Not Found"
        }
    }
    return res.status(response.status).json(response)
}