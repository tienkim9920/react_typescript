import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './share.css'
import logo from '../global/logo.png'

function Header(props: any) {
    return (
        <div className="section-header">
            <div className="layout-header container">
                <Link to="/" className="group-header-logo">
                    <img className="img-header-logo" src={logo} alt="" />
                    <h3 className="h3-header-logo">MoneyK</h3>
                </Link>
                <div className="group-header-link">
                    <div className="header-link"><NavLink activeClassName="is-active" to="/" exact={true}>Home</NavLink></div>
                    <div className="header-link"><NavLink activeClassName="is-active" to="/about">About</NavLink></div>
                    <div className="header-link"><NavLink activeClassName="is-active" to="/list">List MoneyK</NavLink></div>
                </div>
                <div className="group-header-link-mobile mt-1">
                    <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i className="fa fa-bars" style={{ fontSize: '24px' }}></i>
                    </a>
                    <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="group-header-nav-mobile">
                            <div className="header-nav-mobile">
                                <img className="img-header-mobile-logo" src={logo} alt="" />
                                <h3 className="h3-header-mobile-logo">MoneyK</h3>
                            </div>
                            <div>
                                <i data-bs-dismiss="offcanvas" className="fa fa-times icon-close-mobile" style={{ fontSize: '32px' }}></i>
                            </div>
                        </div>
                        <div className="group-body-nav-mobile">
                            <div className="header-link">
                                <NavLink activeClassName="is-active" to="/" exact={true} data-bs-dismiss="offcanvas">Home</NavLink>
                                <div className="line-nav"></div>
                            </div>
                            <div className="header-link">
                                <NavLink activeClassName="is-active" to="/about" data-bs-dismiss="offcanvas">About</NavLink>
                                <div className="line-nav"></div>
                            </div>
                            <div className="header-link">
                                <NavLink activeClassName="is-active" to="/list" data-bs-dismiss="offcanvas">List MoneyK</NavLink>
                                <div className="line-nav"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;