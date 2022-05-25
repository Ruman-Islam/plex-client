import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Avatar, message } from 'antd';
import auth from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/shared/Spinner';


const EditProfile = () => {
    const imageStorageKey = '4ae31085e7494be569a28241773ffa30';
    const [user, loading, error] = useAuthState(auth);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState({});
    const [updateProfile, ,] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    useEffect(() => setImage(user.photoURL), [user]);

    const changeImage = e => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageURL(e.target.files[0]);
    };

    const onSubmit = async data => {
        const fullName = data.firstName + ' ' + data.lastName
        const formData = new FormData();
        console.log(imageURL);
        formData.append('image', imageURL);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async (result) => {
                if (result.success) {
                    await updateProfile({ displayName: fullName, photoURL: result.data.url })
                    message.success('Information updated!');
                    navigate('/dashboard/profile');
                } else {
                    await updateProfile({ displayName: fullName, photoURL: image })
                    message.success('Information updated!');
                    navigate('/dashboard/profile');
                }
            })
    };
    if (loading) {
        return <Spinner margin="80" />
    }
    if (error) {
        message.success(error);
    }

    return (
        <div className='xl:w-8/12'>
            <h1 className='text-2xl mb-5'>Account Settings</h1>
            <form className='flex flex-col p-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-start'>
                    <div className='flex flex-col'>
                        <Avatar
                            size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 64,
                                xl: 100,
                                xxl: 150,
                            }}
                            icon={<img src={image} alt='' />}
                        />
                        <input
                            className='mt-5'
                            onChange={(e) => changeImage(e)}
                            type="file" name="image" id="" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="first-name">First Name</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-2'
                                placeholder='First Name' defaultValue={user.displayName.split(' ')[0]}
                                name="first-name" id='first-name' type="text" {...register("firstName")} />
                        </div>
                        <div>
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-2'
                                placeholder='Last name' defaultValue={user.displayName.split(' ')[1]}
                                name="last-name" id='last-name' type="text" {...register("lastName")} />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address
                                <span className='text-slate-500 ml-1'>(Email Address cannot be changed)</span>
                            </label>
                            <input
                                className='outline-0 cursor-not-allowed w-full
                                 rounded-2xl border px-3 mr-10 py-1 border-[#1890ff] my-2'
                                placeholder='Email' value={user.email} disabled readOnly
                                name="email" id='email' type="email" {...register("email")} />
                        </div>
                        <div className='text-right'>
                            <input type="submit" value="Save changes"
                                className='btn w-44 my-3 cursor-pointer hover:bg-sky-400 bg-[#1890ff] rounded-3xl text-base-100' />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;