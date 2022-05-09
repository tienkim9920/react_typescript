import { IBlogModel } from "../interface/blogs.interface";
import { BlogModel } from "../model/blogs.model";

export class BlogsMapping {
    public static Map2Service(model: BlogModel) : IBlogModel {
        if (!model){
            return null as any;
        }

        const result: IBlogModel = {
            _id: model._id,
            title: model.title,
            username: model.username,
            body: model.body,
            phone: model.phone
        }

        return result
    }
}