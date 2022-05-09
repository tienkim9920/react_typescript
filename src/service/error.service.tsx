import axios from "axios";
import { Observable } from "rxjs";
import { IBlogModel } from "../interface/blogs.interface";
import http from "./http.service";

export class ErrorService {
    public static getPosts() {
        const uri = 'https://jsonplaceholder.typicode.com';
        return new Observable(observer => {
            axios.get(`${uri}/posts/12312321`)
                .then(res => {
                    observer.next(res.data);
                    observer.complete();
                })
                .catch(err => {
                    observer.next(err);
                    handleError(err)
                });
        })
    }

    public static addBlogs(request: IBlogModel) {
        return new Observable((observer) => {
            axios.post(`${http}/blogs`, request)
                .then(res => {
                    observer.next(res.data);
                    observer.complete();
                })
                .catch(err => {
                    observer.next(err);
                    handleError(err)
                });
        })
    }
}

function handleError(err: any): any {
    console.error(err);
}