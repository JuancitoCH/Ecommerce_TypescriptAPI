import { Router } from "express";
import { productController } from "../controller/products.controller";
import isLoged from "../middlewares/auth";


const productRouter = Router()

productRouter.post('/create',isLoged,productController.create)
productRouter.get('/',isLoged,productController.getAll)


export default productRouter