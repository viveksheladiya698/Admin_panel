import React from 'react';
import './Header.css';
import { Col, Row } from 'react-bootstrap';
import { FaBars, FaPowerOff } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authchk } from '../../Store/CounterSlice/CounterReducer';

const Header = (props) => {

    let setisOpen = props.setopen;
    let isopen = props.open;
    let dispatch = useDispatch();
    // let navigate = useNavigate();
    let logout = async () => {
        axios.get('http://localhost:4000/auth/logout_admin')
        localStorage.removeItem('token');
        dispatch(authchk());
    }

    return (
        <>
            <header className='header py-3'>
                <Row className='header-logo'>
                    <Col className='d-flex align-items-center'>
                        <div className="header-box d-flex w-100 px-4 justify-content-between">
                            <div className="left-box">
                                <div className="menus">
                                    <ul className="menu d-flex">
                                        <li className='toggle-btn px-2' onClick={()=>{setisOpen(!isopen)}}><FaBars /></li>
                                        <li className='d-sm-block d-none'><Link to='/dashboard'>Home</Link></li>
                                        <li className='d-sm-block d-none'><Link to='/dashboard'>Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right-box">
                                <div className="icn" onClick={() => { logout(); }}>
                                    <FaPowerOff />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </header>
        </>
    )
}

export default Header