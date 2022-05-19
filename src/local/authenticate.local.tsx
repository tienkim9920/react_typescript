import jwt_decode from "jwt-decode";
import { UserLogin } from "../pattern/user-login.pattern";

export class AuthenticateLocal {
    public static setToken(token: String) {
        localStorage.setItem('token', token.toString())
    }

    public static getToken() {
        const token = localStorage.getItem('token') || null;
        if (!token){
            return null;
        }
        return token;
    }

    public static getPermission() {
        const token = this.getToken();
        if (!token){
            return null;
        }
        const decoded = jwt_decode(token) as any;
        return decoded.user.permission
    }

    public static checkPermission() {
        const permission = this.getPermission();
        if (!permission){
            return null;
        }
        return permission;
    }
}