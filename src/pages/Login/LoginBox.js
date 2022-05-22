import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginBox = ({ signInWithEmailAndPassword }) => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    // handle password eye
    const [passwordEye, setPasswordEye] = useState(false);

    const handlePasswordClick = () => {
        setPasswordEye(!passwordEye);
    };

    // handle submit 
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password)
    };
    return (
        <div>
            <h1 className='text-left text-2xl my-2 ml-5 font-semibold underline text-accent'>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col p-5 py-1'>
                <>
                    <div className='flex justify-center items-center'>
                        <div className='border p-4'>
                            <MailOutlined />
                        </div>
                        <input
                            className='border border-l-0 w-full p-3 text-md my-2 outline-0'
                            type="email"
                            placeholder='Email'
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                }
                            })} />
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.email && errors.email?.message}
                    </label>
                </>
                <>
                    <div className='flex justify-center items-center relative'>
                        <div className='border p-4'>
                            <LockOutlined />
                        </div>
                        <input
                            className='border border-l-0 w-full p-3 text-md my-2 outline-0'
                            type={passwordEye === false ? "password" : "text"}
                            placeholder='Password'
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                }
                            })} />
                        {/* eye section */}
                        <div className="text-xl absolute top-6 right-5">
                            {passwordEye === false ? (
                                <EyeOutlined onClick={handlePasswordClick} />
                            ) : (
                                <EyeInvisibleOutlined onClick={handlePasswordClick} />
                            )}
                        </div>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.password && errors.password?.message}
                    </label>
                </>
                <small
                    onClick={() => navigate('/reset-password')}
                    className='text-right cursor-pointer text-blue-800'>
                    Forgot your Password?
                </small>
                <input
                    className='border py-1 mt-5 cursor-pointer rounded-md
                  hover:bg-secondary text-white font-bold bg-accent duration-300'
                    type="submit" value="Log in" />
            </form>
            <small className='text-slate-500 flex justify-center'>
                No account?
                <span
                    onClick={() => navigate('/signup')}
                    className='primary-color cursor-pointer'>
                    <span className='ml-1 text-blue-700'>Create one here</span>
                </span>
            </small>
        </div>
    );
};

export default LoginBox;