import React, { useState } from 'react';
import { AiOutlineAlignLeft, AiOutlineMenu } from "react-icons/ai";
import { Drawer, Button, Popconfirm } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useNav from '../../hooks/useNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import './Navbar.css';


const Navbar = () => {
    const logo = <div className="logo">
        <span className='flex items-center text-2xl'>PL<AiOutlineMenu className='text-primary' />X</span>
    </div>
    const { navbar } = useNav();
    const [visible, setVisible] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };

    return (
        <nav className={`fixed w-full z-50 ${navbar === 5 ? 'scroll-up' : 'scroll duration-500 shadow-lg'}`}>
            <div className="header">
                <div className="logo">
                    <NavLink className={`text-white hover:text-white ${navbar && 'text-black hover:text-black'}`} to="/">
                        <span className='flex items-center text-4xl xl:text-5xl'>PL<AiOutlineMenu className='text-primary' />X</span>
                    </NavLink>
                </div>
                <div className="mobileHidden">
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/home">Home</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    {user && <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/dashboard">Dashboard</NavLink>}
                    {user ? <Popconfirm
                        placement="bottomRight"
                        title="Are you sure want to logout?"
                        onConfirm={async () => {
                            await signOut(auth)
                            navigate('/home')
                        }}
                        okText="Logout"
                        cancelText="Cancel">
                        <span className={`ant-anchor-link text-white cursor-pointer ${navbar && 'text-black'}`}>Logout</span>
                    </Popconfirm> :
                        <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/login">Login</NavLink>}
                    {user && <span className='text-white'>{user?.displayName}</span>}
                </div>
                <div className="mobileVisible relative left-20">
                    <>
                        <Button type='primary' onClick={showDrawer}>
                            <AiOutlineAlignLeft />
                        </Button>
                        <Drawer
                            title={logo}
                            width={320}
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}>
                            <div className='flex flex-col'>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/products">Products</NavLink>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                {user ? <Popconfirm
                                    placement="bottomLeft"
                                    title="Are you sure want to logout?"
                                    onConfirm={async () => {
                                        await signOut(auth);
                                        navigate('/home');
                                    }}
                                    okText="Yes"
                                    cancelText="No">
                                    <a href='www.facebook.com'>Logout</a>
                                </Popconfirm> :
                                    <NavLink to="/login">login</NavLink>}
                            </div>
                            <Button type="primary" onClick={showChildrenDrawer}>
                                Two-level drawer
                            </Button>
                            <Drawer
                                title={logo}
                                width={320}
                                closable={false}
                                onClose={onChildrenDrawerClose}
                                visible={childrenDrawer}
                            >
                                <div className='flex flex-col'>
                                    <NavLink to="/">Home</NavLink>
                                    <NavLink to="/products">Products</NavLink>
                                    {user ? <Popconfirm
                                        placement="bottomLeft"
                                        title="Are you sure want to logout?"
                                        onConfirm={async () => {
                                            await signOut(auth);
                                            navigate('/home');
                                        }}
                                        okText="Yes"
                                        cancelText="No">
                                        <a href='www.facebook.com'>Logout</a>
                                    </Popconfirm> :
                                        <NavLink to="/login">login</NavLink>}
                                </div>
                            </Drawer>
                        </Drawer>
                    </>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;