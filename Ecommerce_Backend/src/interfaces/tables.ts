import { Prisma } from "@prisma/client"

export type Permissions = "ADMIN" | "USER"

export interface UserInterface{
    id?:string
    email:string,
    password:string,
    permission?:Permissions
}
export interface UserInterfaceOptional{
    id?:string
    email?:string,
    password?:string,
    permission?:Permissions
}

export interface ProductsInterface {
    id?: string,
    name: string,
    stock: number,
    // price are in cents
    price: number,
    description: string,
    available: boolean,
    tags: string,
    images?:Prisma.JsonValue | null
}
export interface ProductsInterfaceOptional {
    id?: string,
    name?: string,
    stock?: number,
    // price are in cents
    price?: number,
    description?: string,
    available?: boolean,
    tags?: string,
    images?:Prisma.JsonNullableFilter | undefined
}


export interface SalesInterface {
    id?: string,
    id_user: string,
    products: Prisma.JsonValue | Prisma.InputJsonValue  ,
    details: string,
    amount: number,
}

export interface SalesInterfaceOptional {
    id?: string,
    id_user?: string,
    products?: Prisma.JsonFilter ,
    details?: string,
    amount?: number,
}
export interface TagsInterface {
    id?: string,
    name: string,
}
export interface TagsInterfaceOptional {
    id?: string,
    name?: string,
}

export interface CartInterface {
    id?: string,
    id_user:string,
    products?:Prisma.JsonValue,
}
export interface CartInterfaceOptional {
    id?: string,
    id_user?:string,
    products?:Prisma.JsonFilter,
}
