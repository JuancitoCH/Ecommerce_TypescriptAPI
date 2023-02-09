import { responseJsonInterface } from "../interfaces/responseJson";

enum statusCodes{
    OK = 200,
    CREATED = 201,
    BADREQUEST = 400,
    UNAHUTORIZED  =401,
    NOTFOUND = 404,
    INTERNALSERVERERROR = 500,
    SERVICEUNVALIABLE = 503,
}


export function ServiceResponse(data:object,code:statusCodes,success:boolean){
    const response: responseJsonInterface = {
        status:code,
        success,
        data,
    }
    return response
}

export default statusCodes