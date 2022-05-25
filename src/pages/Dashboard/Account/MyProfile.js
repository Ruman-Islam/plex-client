import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { HomeTwoTone, LinkedinFilled, MailTwoTone, PhoneTwoTone, ReadFilled } from '@ant-design/icons';


const MyProfile = () => {
    const [user, ,] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/get-userInfo?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data.result)
            })
    }, [user])

    return (
        <div className='w-full xl:w-8/12 mx-auto p-5 bg-sky-100 rounded-lg'>
            <div className='flex items-center flex-col 2xl:flex-row justify-center h-[70vh] xl:h-[50vh]'>
                <Avatar shape="rounded" size={{
                    xs: 120,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 100,
                    xxl: 300,
                }} icon={<img className='rounded-lg' src={user?.photoURL} alt='' />} />
                <div className='ml-0 xl:ml-5 text-center'>
                    <div className='text-left'>
                        <h1 className='text-xl 2xl:text-4xl font-bold'>{user.displayName}</h1>
                    </div>
                    <div className='flex items-center'>
                        <MailTwoTone />
                        <h1 className='text-lg ml-1 mt-1'>{userInfo.email}</h1>
                    </div>
                    <div className='flex items-center'>
                        <PhoneTwoTone />
                        <h1 className='text-lg ml-1 mt-1'>{userInfo?.userInfo?.phone}</h1>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-sky-500'><ReadFilled /></span>
                        <h1 className='text-lg ml-1 mt-3'>{userInfo?.userInfo?.education}</h1>
                    </div>
                    <div className='flex items-center'>
                        <HomeTwoTone />
                        <h1 className='text-lg ml-1 mt-2'>{userInfo?.userInfo?.location}</h1>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-sky-500'><LinkedinFilled /></span>
                        <a href={userInfo?.userInfo?.linkedIn} className='text-lg ml-1 mt-1'>Click</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;