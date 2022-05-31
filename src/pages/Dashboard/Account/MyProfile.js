import { Avatar } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { HomeTwoTone, LinkedinFilled, MailTwoTone, PhoneTwoTone, ReadFilled } from '@ant-design/icons';
import { useQuery } from 'react-query';
import fetcher from '../../../api/axios';
import Spinner from '../../../components/shared/Spinner';


const MyProfile = () => {
    const [user, ,] = useAuthState(auth);
    console.log(user);


    const { data, isLoading } = useQuery(['get-profile', user], async () => {
        try {
            const { data } = await fetcher.get(`/get-userInfo?email=${user.email}`)
            return data.result;
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                localStorage.removeItem('accessToken');
            }
        }
    })


    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-[90vh]'><Spinner /></div>
        )
    }

    return (
        <div className='w-full xl:w-8/12 mx-auto p-5 bg-sky-100 rounded-lg'>
            <div className='flex items-center flex-col xl:flex-row justify-center h-[70vh] xl:h-[50vh]'>
                <Avatar shape="rounded" size={{
                    xs: 120,
                    sm: 120,
                    md: 160,
                    lg: 200,
                    xl: 250,
                    xxl: 300,
                }} icon={<img className='rounded-lg' src={data?.photoURL} alt='' />} />
                <div className='ml-0 xl:ml-5 text-center'>
                    <div className='text-left'>
                        <h1 className='text-xl 2xl:text-4xl font-bold'>{user.displayName}</h1>
                    </div>
                    <div className='flex items-center'>
                        <MailTwoTone />
                        <h1 className='text-lg ml-1 mt-1'>{data?.email}</h1>
                    </div>
                    <div className='flex items-center'>
                        <PhoneTwoTone />
                        <h1 className='text-lg ml-1 mt-1'>{data?.phone}</h1>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-sky-500'><ReadFilled /></span>
                        <h1 className='text-lg ml-1 mt-3'>{data?.education}</h1>
                    </div>
                    <div className='flex items-center'>
                        <HomeTwoTone />
                        <h1 className='text-lg ml-1 mt-2'>{data?.location}</h1>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-sky-500'><LinkedinFilled /></span>
                        <a href={data?.linkedIn} className='text-lg ml-1 mt-1'>Click</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;