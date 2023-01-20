export class ErrorStatus extends Error{
    public statusCode: number

    constructor( errMsg: string , statusCode? : number ){
        super(errMsg)
        this.statusCode = statusCode ?? 500
    }
}