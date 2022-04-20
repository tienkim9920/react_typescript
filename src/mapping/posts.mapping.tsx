import { IPostModel } from "../interface/posts.interface";
import { PostModel } from "../model/posts.model";

export class PostsMapping {
    public static Map2Service(model: PostModel) : IPostModel {
        if (!model){
            return null as any;
        }

        const result: IPostModel = {
            userId: model.userId,
            title: model.title,
            body: model.body
        }

        return result
    }
}