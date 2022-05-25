import React from 'react';
import { Avatar, Divider } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';


const MyProfile = () => {
    const [user, ,] = useAuthState(auth);

    return (
        <>
            <h1 className='text-2xl my-5'>Your Profile</h1>
            <div className='flex items-center'>
                <Avatar
                    size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 100,
                        xxl: 150,
                    }}
                    className="border border-sky-400"
                    icon={<img src={user?.photoURL} alt='' />}
                />
                <Divider type="vertical" className='text-2xl h-20' />
                <div>
                    <small className='text-lg'>Full name:</small>
                    <h1 className='text-2xl'>{user.displayName}</h1>
                    <small className='text-lg'>Email Address:</small>
                    <h1 className='text-2xl'>{user.email}</h1>
                    <small className='text-lg'>Phone:</small>
                    <h1 className='text-2xl'>{user.phone ? user.phone : 'Not Available'}</h1>
                </div>
            </div>
        </>
    );
};

export default MyProfile;