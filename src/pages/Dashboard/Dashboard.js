import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.js/Sidebar';

const Dashboard = () => {
    return (
        <div className='flex'>
            <div>
                <Sidebar />
            </div>
            <div className='bg-slate-50 flex flex-col w-full p-5'>
                <div className='p-10 border shadow-lg bg-white'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;