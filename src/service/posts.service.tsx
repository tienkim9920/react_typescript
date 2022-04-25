import axios from "axios";
import { IPostModel } from "../interface/posts.interface";
import http from "./http.service";

export const PostService = {
    GetPosts: () => {
        return http.get('/posts')
            .then(res => res)
            .catch(err => handleError(err));
    },

    PostBlogs: (request: IPostModel) => {
        return http.post('/posts', request)
            .then(res => res)
            .catch(err => handleError(err));
    }
}


function handleError(err: any): any {
    console.error(err);
}