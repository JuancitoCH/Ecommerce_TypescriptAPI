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
    id?: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    available: boolean;
    tags: string;
}
export interface ProductsInterfaceOptional {
    id?: string;
    name?: string;
    stock?: number;
    price?: number;
    description?: string;
    available?: boolean;
    tags?: string;
}

export interface SalesInterface {
    id?: string;
    id_user: string;
    id_products: string;
    details: string;
    amount: number;
}
export interface TagsInterface {
    id?: string;
    name: string;
}
