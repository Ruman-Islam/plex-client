import React, { useEffect } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase/firebaseConfig'
import Spinner from '../../components/shared/Spinner';
import { message } from 'antd';
import { MailOutlined, RollbackOutlined } from '@ant-design/icons';

const ResetPassword = () => {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();


    // handle submit 
    const onSubmit = async (data) => {
        const email = data.email;
        await sendPasswordResetEmail(email)
        message.info('A link has been sent to your email');
    };

    useEffect(() => {
        if (resetError) message.error(resetError);
    }, [resetError]);

    if (sending) {
        return <Spinner />
    }

    return (
        <div className='login min-h-screen flex flex-col justify-center items-center'>
            <div onClick={() => navigate('/home')} className='login-logo cursor-pointer'></div>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-5/6 xl:w-1/4 2xl:w-1/5 rounded-lg shadow-xl h-4/5 md:h-3/5 flex flex-col mx-auto border p-2 2xl:py-10 bg-base-100'>
                    <div className='px-10'>
                        <h1 className='text-left text-xl mt-2 primary-color font-semibold'>Reset Password</h1>
                        <p className='text-xs text-slate-500 text-justify'>Please enter the email address that you used to register, and we will send you an email with a link to reset your password.</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col p-10 py-4'>
                        <div className='flex justify-center items-center'>
                            <div className='border p-2'>
                                <MailOutlined className='text-xl' />
                            </div>
                            <input
                                className='border border-l-0 w-full p-3 text-xs  outline-0 ' type="email" placeholder='Email' name="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide valid email'
                                    }
                                })}
                            />
                        </div>
                        <label className='text-red-500 text-xs'>
                            {errors.email && errors.email?.message}
                        </label>
                        <input
                            className='bg-sky-700 hover:bg-sky-600 duration-300 rounded text-white mt-2 py-1 cursor-pointer w-32 mx-auto' type="submit" value="Send code"
                        />
                    </form>
                </div>
                <div className='mt-2 text-base-100'>
                    <p className='text-center font-bold'>© {year} Ruman Islam. All rights reserved</p>
                    <h1 onClick={() => navigate('/login')}
                        className='flex items-center justify-center text-base-100 cursor-pointer hover:underline'>
                        Back to Login <RollbackOutlined className='ml-3' /></h1>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;