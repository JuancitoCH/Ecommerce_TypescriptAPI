import { Router } from "express";
import isLoged, {isAdmin} from "../middlewares/auth";
import SalesController from "../controller/sales.controller";

const salesRouter = Router()

salesRouter.get('/:id',isAdmin,SalesController.get)
salesRouter.get('/',isAdmin,SalesController.getAll)
salesRouter.get('/',isLoged,SalesController.getUser)

export default salesRouter