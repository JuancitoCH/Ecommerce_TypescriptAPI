import { ErrorStatus } from "../errors/ErrorStatus"
import statusCodes from "../helpers/statusResponse"
import { TagsInterface, TagsInterfaceOptional } from "../interfaces/tables"
import TagsRepository from "../db/tags.repository"


const TagsService = {
    query:new TagsRepository(),
    async create (data:TagsInterface){
        if(data.id) delete data.id;
        if(!data.name) throw new ErrorStatus("Validation Tags : you must include field name",statusCodes.BADREQUEST)
        return await this.query.create(data)
    },
    async getAll(){
        return await this.query.getAll()
    },
    async update(id:string,data:TagsInterfaceOptional){
        if(data.id)delete data.id;
        return await this.query.updateOne({id},data)
    }
}

export default TagsService