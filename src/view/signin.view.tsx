import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setPermission } from '../app/permission.redux';
import { HEADER_ORDER_TABLE } from '../global/constant.global';
import { AuthenticateLocal } from '../local/authenticate.local';
import { UserMapping } from '../mapping/user.mapping';
import { UserLogin } from '../pattern/user-login.pattern';
import { UserService } from '../service/users.service';

function SignIn(props: any) {
    const dispatch = useAppDispatch();
    const router = useHistory();
    const [messageError, setMessageError] = useState<String>('');
    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: '',
        password: ''
    })

    const onEventSignIn = async () => {
        const res = await UserService.PostLogin(UserMapping.Map2Service(userLogin));
        if (res.status === 404){
            setMessageError(res.data.msg)
            setTimeout(() => {
                setMessageError('')
            }, 4000)
            return;
        }
        AuthenticateLocal.setToken(res.data);
        dispatch(setPermission(AuthenticateLocal.getPermission()));
        router.replace('/');
        // router.goBack();
    }
    
    return (
        <div className="section-addblog">
            <div>
                <div className="d-flex justify-content-center">
                    <div className='font-size-30 color-main'>Log In</div>
                </div>
                <div className='mt-3 text-danger'>
                    { messageError }
                </div>
                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="text"
                        placeholder='Enter Username'
                        value={userLogin.username?.toString()}
                        onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })} />
                </div>
                <div className='mt-5'>
                    <input
                        className='width-300 input-custom radius-5'
                        type="password"
                        placeholder='Enter Username'
                        value={userLogin.password?.toString()}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />
                </div>
                <div className='mt-5'>
                    <button
                        className='width-300 bg-color-main text-center input-custom radius-5 color-white pointer'
                        disabled={!userLogin.username?.toString() || !userLogin.password?.toString() ? true : false} onClick={onEventSignIn}>
                        Login</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;