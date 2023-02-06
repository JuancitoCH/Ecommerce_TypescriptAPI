export interface responseJsonInterface{
    status:number,
    success:boolean,
    error?: {
        message:string,
    },
    data?:object
}

