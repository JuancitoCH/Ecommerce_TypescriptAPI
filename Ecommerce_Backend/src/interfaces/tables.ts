export interface UserInterface{
    id?:string
    email:string,
    password:string
}

interface ProductsInterface {
    id?: string;
    name: string;
    stock: number;
    price: number;
    description: string;
    available: boolean;
    tags: string;
}

interface SalesInterface {
    id?: string;
    id_user: string;
    id_products: string;
    details: string;
    amount: number;
}
interface TagsInterface {
    id?: string;
    name: string;
}
