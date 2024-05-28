import React from 'react';
import './Sidebar.css';
import '../header/Header.css'
import Menu from '../menu/Menu';

const Sidebar = (props) => {
    let open = props.open
    return (
        <>
            <aside className={`side-menubar px-2 h-100 w-100 ${!open ? 'd-none' : ''}`}>
                <div className="logo px-2 d-flex align-items-center logo-side theme-color">
                    <img src={require('../../images/AdminLTELogo.png')} alt="" className='dashboard-logo' />
                    <span className='logo-text'>Admin Pannle</span>
                </div>
                <div className="sidemenu">
                    <div className="main-box theme-color">
                        <div className="user-img px-2 padding py-2 d-flex">
                            <div className="admin-img d-flex align-items-center w-100">
                                <img src={require('../../images/user.jpg')} alt="" className='admin-image' />
                                <span className='admin-text'>Alexander Pierce</span>
                            </div>
                        </div>
                        <div className="menu-bx ps-3 pe-1 py-2">
                            <Menu />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar