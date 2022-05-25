import React from 'react';
import { Avatar } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';


const MyProfile = () => {
    const [user, ,] = useAuthState(auth);

    return (
        <>
            <h1 className='text-2xl my-5'>Your Profile</h1>
            <div className='flex items-center flex-col 2xl:flex-row'>
                <Avatar
                    size={{
                        xs: 100,
                        sm: 100,
                        md: 100,
                        lg: 100,
                        xl: 100,
                        xxl: 150,
                    }}
                    className="border border-sky-400"
                    icon={<img src={user?.photoURL} alt='' />}
                />
                <div className='ml-5'>
                    <small className='text-lg'>Full name:</small>
                    <h1 className='text-xl 2xl:text-2xl'>{user.displayName}</h1>
                    <small className='text-lg'>Email Address:</small>
                    <h1 className='text-xl 2xl:text-2xl'>{user.email}</h1>
                    <small className='text-lg'>Phone:</small>
                    <h1 className='text-xl 2xl:text-2xl'>{user.phone ? user.phone : 'Not Available'}</h1>
                </div>
            </div>
        </>
    );
};

export default MyProfile;