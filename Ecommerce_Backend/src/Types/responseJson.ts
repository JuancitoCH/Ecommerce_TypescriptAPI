export type responseJson={
    status:number,
    success:boolean,
    error?: {
        message:string,
    },
    data?:object
}