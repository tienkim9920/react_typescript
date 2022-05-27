import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPermission } from '../app/permission.redux';
import Logo from '../assets/logo_web.png';
import { AuthenticateLocal } from '../local/authenticate.local';

function Header(props: any) {
    const { permission } = useAppSelector(state => state.permission);
    const dispatch = useAppDispatch();
    const router = useHistory();

    useLayoutEffect(() => {
        if (AuthenticateLocal.getPermission()){
            dispatch(setPermission(AuthenticateLocal.getPermission()));
        }
    }, [])

    const handleLogout = () => {
        dispatch(setPermission(''));
        localStorage.clear();
        router.push('/login');
    }

    return (
        <div className="section-header">
            <div className="layout-header container d-flex justify-content-between p-3">
                <Link to="/?page=1" className="group-header-logo d-flex">
                    <img src={Logo} width="45px" height="55px" alt="" />
                    <div className="mt-1 ml-1 h3-header-logo color-main">Ombee</div>
                </Link>
                {
                    !permission &&  <div className="d-flex mt-3">
                        <div className="header-link"><NavLink activeClassName="is-active" to="/login" exact={true}>Login</NavLink></div>
                    </div>
                }
                {
                    permission === 'client' && <div className="d-flex mt-3">
                        <div className="header-link"><NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink></div>
                        <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/add">Add Post</NavLink></div>
                        <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/list">Todo List</NavLink></div>
                        <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/table">Table List</NavLink></div>
                        <div className="header-link ml-1 pointer" onClick={handleLogout}>Log out</div>
                    </div>
                }
                {
                    permission === 'admin' && <div className="d-flex mt-3">
                        <div className="header-link"><NavLink activeClassName="is-active" to="/" exact={true}>Manage</NavLink></div>
                        <div className="header-link ml-1 pointer" onClick={handleLogout}>Log out</div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;