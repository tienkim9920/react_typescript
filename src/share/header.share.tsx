import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header(props: any) {
    return (
        <div className="section-header">
            <div className="layout-header container d-flex justify-content-between p-3">
                <Link to="/?page=1" className="group-header-logo">
                    <h3 className="h3-header-logo color-main">The Todo Blog</h3>
                </Link>
                <div className="d-flex mt-2">
                    <div className="header-link"><NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink></div>
                    <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/add">Add Post</NavLink></div>
                    <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/list">Todo List</NavLink></div>
                    <div className="header-link ml-1"><NavLink activeClassName="is-active" to="/table">Table List</NavLink></div>
                </div>
            </div>
        </div>
    );
}

export default Header;