import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Avatar, message } from 'antd';
import auth from '../../../firebase/firebaseConfig';
import Spinner from '../../../components/shared/Spinner';
import { useQuery } from 'react-query';

const EditProfile = () => {
    const imageStorageKey = '4ae31085e7494be569a28241773ffa30';
    const [user, loading, error] = useAuthState(auth);
    const [image, setImage] = useState('');
    const [imageURL, setImageURL] = useState({});
    const [updateProfile, ,] = useUpdateProfile(auth);
    const { register, handleSubmit } = useForm();

    const url = `http://localhost:5000/get-userInfo?email=${user.email}`;
    const { data, isLoading } = useQuery(['editProfile', user], () => fetch(url, {
        method: 'GET'
    }).then(res => {
        return res.json()
    }))

    useEffect(() => setImage(user.photoURL), [user]);

    const changeImage = e => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageURL(e.target.files[0]);
    };

    const onSubmit = async data => {

        let userInfo = {
            name: data.firstName + ' ' + data.lastName,
            email: user.email,
            phone: data.phone,
            education: data.education,
            location: data.city,
            linkedIn: data.linkedIn
        }

        const fullName = data.firstName + ' ' + data.lastName
        const formData = new FormData();
        formData.append('image', imageURL);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        if (imageURL.name) {
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then((result) => {
                    if (result.success) {
                        updateProfile({ photoURL: result.data.url })
                    }
                })
        }

        fetch(`http://localhost:5000/add-userInfo?email=${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(async (data) => {
                if (data.success) {
                    await updateProfile({ displayName: fullName })
                    message.success('Information updated!');
                }
            })
    };

    if (isLoading || loading) {
        return <Spinner margin="80" />
    }
    if (error) {
        message.success(error);
    }

    return (
        <div className='xl:w-8/12 mx-auto border p-2'>
            <h1 className='text-2xl mb-5'>Account Settings</h1>
            <form className='flex flex-col p-5 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-start flex-col xl:flex-row'>
                    <div className='flex flex-col'>
                        <Avatar
                            size={{
                                xs: 120,
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
                        <div className='flex justify-between flex-col xl:flex-row'>
                            <div>
                                <label htmlFor="first-name">First Name</label>
                                <input
                                    className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                    placeholder='First Name' defaultValue={user.displayName.split(' ')[0]}
                                    name="first-name" id='first-name' type="text" {...register("firstName")} />
                            </div>
                            <div>
                                <label htmlFor="last-name">Last Name</label>
                                <input
                                    className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                    placeholder='Last name' defaultValue={user.displayName.split(' ')[1]}
                                    name="last-name" id='last-name' type="text" {...register("lastName")} />
                            </div>
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="email">Email Address
                                <span className='text-slate-500 ml-1'>(Email Address cannot be changed)</span>
                            </label>
                            <input
                                className='outline-0 cursor-not-allowed w-full
                                 rounded-2xl border px-3 mr-10 py-1 border-[#1890ff] my-1'
                                defaultValue={data?.result?.email} disabled
                                name="email" id='email' type="email" {...register("email")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="phone">Phone</label>
                            <input
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="phone" id='phone' type="text"
                                defaultValue={data?.result?.userInfo?.phone}
                                {...register("phone")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="education">Select your Education level</label>
                            <select
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="education" id="education"
                                defaultValue={data?.result?.userInfo?.education}
                                {...register("education")}>
                                <option value="JSC/JDC/8 Pass">JSC/JDC/8 Pass</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Higher Secondary">Higher Secondary</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor/Honors">Bachelor/Honors</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD (Doctor of Philosophy)">PhD (Doctor of Philosophy)</option>
                            </select>
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="city">City/state</label>
                            <input
                                defaultValue={data?.result?.userInfo?.location}
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="city" id='city' type="text" {...register("city")} />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="city">LinkIn Profile Link</label>
                            <input
                                defaultValue={data?.result?.userInfo?.linkedIn}
                                className='outline-0 w-full rounded-2xl border px-3 py-1 border-[#1890ff] my-1'
                                name="linkedIn" id='linkedIn' type="text" {...register("linkedIn")} />
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