import { Router } from "express";
import { productController } from "../controller/products.controller";
import isLoged, { isAdmin } from "../middlewares/auth";


const productRouter = Router()

productRouter.post('/create',isAdmin,productController.create)
productRouter.patch('/update/:idProduct',isAdmin,productController.update)
productRouter.get('/',productController.getFilterPagination)

// params replace = yes
// {{url}}/products/update/idProduct?replace=yes
productRouter.get('/one/:idProduct',productController.getOneByID)


export default productRouter