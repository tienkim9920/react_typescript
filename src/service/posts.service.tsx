import axios from "axios";
import { Observable } from "rxjs";
import { URL } from "./http.service";
import { IPostModel } from "../interface/posts.interface";

export const PostService = {

    GetBlogs: () => {
        return new Observable(observer => {
            axios.get(`${URL}/posts`)
                .then(res => {
                    observer.next(res.data);
                    observer.complete();
                })
                .catch(err => observer.error(err));
        })
    },

    PostBlogs: (request: IPostModel) => {
        return new Observable(observer => {
            axios.post(`${URL}/posts`, request)
                .then(res => {
                    observer.next(res.data);
                    observer.complete();
                })
                .catch(err => observer.error(err));
        })
    }
}