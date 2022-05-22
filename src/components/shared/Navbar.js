import React, { useState } from 'react';
import { AiOutlineAlignLeft, AiOutlineMenu } from "react-icons/ai";
import { Drawer, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import useNav from '../../hooks/useNav';
import './Navbar.css';

const Navbar = () => {
    const { navbar } = useNav();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <nav className={`fixed w-full z-50 ${navbar && 'scroll duration-500 shadow-lg'}`}>
            <div className="header">
                <div className="logo">
                    <NavLink className={`text-white ${navbar && 'text-black'}`} to="/">
                        <span className='flex items-center text-4xl xl:text-5xl'>PL<AiOutlineMenu className='text-primary' />X</span>
                    </NavLink>
                </div>
                <div className="mobileHidden">
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/home">Home</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                    <NavLink className={`ant-anchor-link text-white ${navbar && 'text-black'}`} to="/products">Products</NavLink>
                </div>
                <div className="mobileVisible relative left-20">
                    <>
                        <Button type='primary' onClick={showDrawer}>
                            <AiOutlineAlignLeft />
                        </Button>
                        <Drawer
                            title="Basic Drawer"
                            placement="right"
                            onClose={onClose}
                            visible={visible}>
                            <div className='flex flex-col'>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/products">Products</NavLink>
                            </div>
                        </Drawer>
                    </>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;