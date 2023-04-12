import { Router } from "express";
import {isAdmin} from "../middlewares/auth";
import SalesController from "../controller/sales.controller";

const salesRouter = Router()

salesRouter.get('/:id',isAdmin,SalesController.get)
salesRouter.get('/',isAdmin,SalesController.getAll)

export default salesRouter