import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col bg-neutral border py-2 px-0.5 w-80 2xl:w-96'>
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
                                    }
                                })} />
                        </span>
                    </div>
                    <label
                        className='text-red-500 text-xs'>
                        {errors.email && errors.email?.message}
                    </label>
                </div>
                <div className='text-right my-2 hover:bg-sky-100 p-1'>
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
                <span
                    onClick={() => navigate('/reset-password')}
                    className='text-right cursor-pointer text-sky-500 hover:underline w-38 ml-auto pr-1'>
                    Forgot your Password?
                </span>
                <span
                    className='w-28 py-0.5 my-5 text-lg text-white duration-300 cursor-pointer
                  bg-sky-700 hover:bg-sky-600 mx-auto text-center rounded border'>
                    <input className='cursor-pointer'
                        type="submit" value="Log in" />
                </span>
                <span className='text-slate-500 flex justify-center'>
                    No account?
                    <span
                        onClick={() => navigate('/register')}
                        className='primary-color cursor-pointer'>
                        <span className='ml-1 text-sky-500 hover:underline'>Create one here</span>
                    </span>
                </span>
            </form>
        </>
    );
};


export default LoginBox;

