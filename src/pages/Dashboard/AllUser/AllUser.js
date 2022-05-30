import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase/firebaseConfig';
import { message, Table, Skeleton } from 'antd';
import fetcher from '../../../api/axios';
import { useColumn } from './columns';


const AllUser = () => {
    const [active, setActive] = useState(true);
    const [user, ,] = useAuthState(auth);

    const { data, isLoading, refetch } = useQuery(['all-user', user], async () => {
        try {
            const { data } = await fetcher.get(`/all-user?email=${user.email}`)
            setActive(false);
            return data.sortedUsers;
        } catch (err) {
            if (err?.response?.status === 401) message.warning(err?.response?.data?.message);
        }
    })

    const handleUserDelete = async email => {
        try {
            const { data } = await fetcher.delete(`/delete-user/${user.email}`, { data: { email } })
            if (data.success) {
                refetch();
                message.success('Successfully deleted')
            }
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                message.warning(err?.response?.data?.message);
            }
        }
    }

    const { columns } = useColumn(active, handleUserDelete);

    if (isLoading) {
        return <Skeleton active />
    }

    return (
        <div>
            <h1>All users {data?.length}</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default AllUser;