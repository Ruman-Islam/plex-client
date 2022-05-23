import { RollbackOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import auth from '../../firebase/firebaseConfig';
import RegisterBox from './RegisterBox';
import SocialLogin from './SocialLogin';

const Register = () => {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, ,] = useUpdateProfile(auth);

    useEffect(() => {
        // if (user) {
        //     if (!user.user?.emailVerified) {
        //         navigate('/verify-email');
        //     } else {
        //         navigate(from, { replace: true });
        //     }
        // }
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, error, from, navigate]);

    return (
        <div className='h-[120vh] 2xl:h-screen flex flex-col justify-center items-center login'>
            {loading ? <Spinner /> :
                <>
                    <div className='login-logo'></div>
                    <div className='border border-black shadow-lg'>
                        <div className='bg-neutral py-0.5 border border-t-0 border-l-0 border-r-0 border-b-1'>
                            <h1 className='text-left text-lg my-2 ml-5'>Register</h1>
                        </div>
                        <div className='bg-base-100 p-5'>
                            <RegisterBox
                                createUserWithEmailAndPassword={createUserWithEmailAndPassword}
                                updateProfile={updateProfile} />
                            <Divider>or</Divider>
                            <SocialLogin />
                        </div>
                    </div>
                    <div className='mt-2 text-base-100'>
                        <p className='text-center font-bold'>© {year} Ruman Islam. All rights reserved</p>
                        <h1 onClick={() => navigate('/home')}
                            className='flex items-center justify-center text-base-100 cursor-pointer hover:underline'>
                            Back to Home <RollbackOutlined className='ml-3' /></h1>
                    </div>
                </>}
        </div>
    );
};

export default Register;