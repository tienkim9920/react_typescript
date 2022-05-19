import { IUserLogin } from "../interface/user-login.interface";
import { UserLogin } from "../pattern/user-login.pattern";

export class UserMapping {
    public static Map2Service(model: UserLogin) : IUserLogin {
        if (!model){
            return null as any;
        }
        const result: IUserLogin = {
            username: model.username,
            password: model.password
        } 
        return result;
    }
}