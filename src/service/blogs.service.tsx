import { IBlogModel } from "../interface/blogs.interface";
import http from "./http.service";

export const BlogService = {
    GetBlogs: () => {
        return http.get('/blogs')
            .then(res => res)
            .catch(err => handleError(err));
    },

    AddBlogs: (request: IBlogModel) => {
        return http.post('/blogs', request)
            .then(res => res)
            .catch(res => res)
    },

    PatchBlogs: (request: IBlogModel) => {
        return http.patch('/blogs', request)
            .then(res => res)
            .catch(err => handleError(err))
    },

    DetailBlogs: (id: string) => {
        return http.get(`/blogs/${id}`)
            .then(res => res)
            .catch(err => handleError(err));
    },

    DeleteBlogs: (id: string) => {
        return http.delete(`/blogs/${id}`)
            .then(res => res)
            .catch(err => handleError(err));
    }
}


function handleError(err: any): any {
    console.error(err);
}