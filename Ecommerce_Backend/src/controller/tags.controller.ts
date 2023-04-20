import { Request, Response, NextFunction } from "express"
import statusCodes, { ControllerResponse } from "../helpers/statusResponse";
import TagsService from "../service/tags";



export const TagController = {
    create: (req: Request, res: Response, next: NextFunction) => {
        TagsService.create(req.body)
            .then( ControllerResponse(statusCodes.CREATED,res) )
            .catch(next)
    },
    getAll: (req: Request, res: Response, next: NextFunction) => {
        TagsService.getAll()
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        TagsService.update(req.params.id,req.body)
            .then( ControllerResponse(statusCodes.OK,res) )
            .catch(next)
    },
}