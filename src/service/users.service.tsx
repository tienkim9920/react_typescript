import { IUserLogin } from "../interface/user-login.interface";
import http from "./http.service"

export const UserService = {
    PostLogin: (request: IUserLogin) => {
        return http.post(`/users/login`, request)
            .then(res => res)
            .catch(err => handleError(err))
    },
}

function handleError(err: any): any {
    if (err.response) {
        return err.response;
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
    }
}

