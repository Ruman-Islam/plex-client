import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterBox = ({ createUserWithEmailAndPassword, updateProfile }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onTouched'
    });

    //    check password event 
    const password = watch('password');

    // handle password eye
    const [passwordEye, setPasswordEye] = useState(false);

    const handlePasswordClick = () => {
        setPasswordEye(!passwordEye);
    };

    // handle confirm password eye
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

    const handleConfirmPasswordClick = () => {
        setConfirmPasswordEye(!confirmPasswordEye);
    };

    // handle submit 
    const onSubmit = async (data) => {
        const displayName = data.username;
        const email = data.email;
        const password = data.password;
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName })
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col bg-neutral border py-2 px-0.5 w-80 2xl:w-96'>
                <div className='text-right mt-2 hover:bg-sky-100 p-1'>
                    <div className='flex items-center w-72 2xl:w-80 ml-auto'>
                        <span className='w-1/5 mr-2 text-md font-bold'>Username</span>
                        <span className='w-4/5'>
                            <input
                                className='w-full border hover:border-sky-600 duration-500 outline-none py-1 px-2'
                                type="text"
                                {...register("username", {
                                    required: {
                                        value: true,
                                        message: 'Username is Required'
                                    }
                                })} />
                        </span>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.username && errors.username?.message}
                    </label>
                </div>
                <div className='text-right mt-2 hover:bg-sky-100 p-1'>
                    <div className='flex items-center w-72 2xl:w-80 ml-auto'>
                        <span className='w-1/5 mr-2 text-md font-bold'>Email</span>
                        <span className='w-4/5'>
                            <input
                                className='w-full border hover:border-sky-600 duration-500 outline-none py-1 px-2'
                                type="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide valid email'
                                    }
                                })} />
                        </span>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.email && errors.email?.message}
                    </label>
                </div>
                <div className='text-right mt-2 hover:bg-sky-100 p-1'>
                    <div className='flex items-center w-72 2xl:w-80 ml-auto'>
                        <span className='w-1/5 mr-2 text-md font-bold'>Password</span>
                        <span className='w-4/5 relative'>
                            <input
                                className='w-full border hover:border-sky-600 duration-500 outline-none py-1 px-2'
                                type={passwordEye === false ? "password" : "text"}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be characters or longer'
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                                        message: 'At least one letter, one number and one special character'
                                    }
                                })} />
                            {/* eye section */}
                            <div className="text-sm absolute top-1 right-2">
                                {passwordEye === false ? (
                                    <EyeInvisibleOutlined onClick={handlePasswordClick} />
                                ) : (
                                    <EyeOutlined onClick={handlePasswordClick} />
                                )}
                            </div>
                        </span>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.password && errors.password?.message}
                    </label>
                </div>
                <div className='text-right my-2 hover:bg-sky-100 p-1'>
                    <div className='flex items-center w-72 2xl:w-80 ml-auto'>
                        <span className='w-1/5 mr-2 text-md font-bold'>Confirm</span>
                        <span className='w-4/5 relative'>
                            <input
                                className='w-full border hover:border-sky-600 duration-500 outline-none py-1 px-2'
                                type={confirmPasswordEye === false ? "password" : "text"}
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: 'Confirm password is Required'
                                    },
                                    validate: (value) =>
                                        value === password || "The passwords do not match",
                                })} />
                            {/* eye section */}
                            <div className="text-sm absolute top-1 right-2">
                                {confirmPasswordEye === false ? (
                                    <EyeInvisibleOutlined onClick={handleConfirmPasswordClick} />
                                ) : (
                                    <EyeOutlined onClick={handleConfirmPasswordClick} />
                                )}
                            </div>
                        </span>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.confirmPassword && errors.confirmPassword?.message}
                    </label>
                </div>
                <span
                    className='w-28 py-0.5 my-5 text-lg text-white duration-300 cursor-pointer
              bg-sky-700 hover:bg-sky-600 mx-auto text-center rounded border'>
                    <input className='cursor-pointer'
                        type="submit" value="Register" />
                </span>
                <span className='text-slate-500 flex justify-center'>
                    Already have an account?
                    <span
                        onClick={() => navigate('/login')}
                        className='primary-color cursor-pointer'>
                        <span className='ml-1 text-sky-500 hover:underline'>Login</span>
                    </span>
                </span>
            </form>
        </>
    );
};

export default RegisterBox;