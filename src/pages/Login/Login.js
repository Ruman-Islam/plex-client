import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import Spinner from '../../components/shared/Spinner';
import auth from '../../firebase/firebaseConfig';
import LoginBox from './LoginBox';
import SocialLogin from './SocialLogin';
import './login.css';
import { RollbackOutlined } from '@ant-design/icons';

const Login = () => {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user, loading, error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, error, from, navigate]);

    if (loading) {
        return <Spinner />
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center login'>
            <div className='login-logo'></div>
            <div className='border border-black shadow-lg'>
                <div className='bg-neutral py-0.5 border border-t-0 border-l-0 border-r-0 border-b-1'>
                    <h1 className='text-left text-lg my-2 ml-5'>Login</h1>
                </div>
                <div className='bg-base-100 p-5'>
                    <LoginBox
                        signInWithEmailAndPassword={signInWithEmailAndPassword} />
                    <Divider>or</Divider>
                    <SocialLogin />
                </div>
            </div>
            <div className='mt-2 text-base-100'>
                <p className='text-center font-bold'>© {year} Ruman Islam. All rights reserved</p>
                <h1 onClick={() => navigate('/home')}
                    className='flex items-center justify-center text-base-100 cursor-pointer hover:text-secondary'>
                    Back to Home <RollbackOutlined className='ml-3' /></h1>
            </div>
        </div>
    );
};

export default Login;