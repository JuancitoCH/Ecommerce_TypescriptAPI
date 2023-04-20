import { Router } from "express";
import isLoged, {isAdmin} from "../middlewares/auth";
import { TagController } from "../controller/tags.controller";


const TagRouter = Router()

TagRouter.get('/',TagController.getAll)
TagRouter.post('/',isAdmin,TagController.create)
TagRouter.post('/:id',isAdmin,TagController.update)

export default TagRouter