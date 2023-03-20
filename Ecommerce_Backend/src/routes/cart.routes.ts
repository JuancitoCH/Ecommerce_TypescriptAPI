import { Router } from "express";
import CartController from "../controller/cart.controller";
import isLoged from "../middlewares/auth";


const cartRouter = Router()


cartRouter.get('/',isLoged,CartController.get)
// TODO: añadir producto
cartRouter.post('/',isLoged,CartController.addProduct)
cartRouter.get('/clear',isLoged,CartController.clearCart)


export default cartRouter
