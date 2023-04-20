import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { TagsInterface, TagsInterfaceOptional } from "../interfaces/tables"
import TagsRepository from "../controller/tags.controller"


const TagsService = {
    query:new TagsRepository(),

}

export default TagsService