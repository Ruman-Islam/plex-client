import { message, Skeleton, Table } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { useQuery } from 'react-query';
import fetcher from '../../../api/axios';
import { useColumn } from './columns';

const AddAdmin = () => {
    const [active, setActive] = useState(true);
    const [user, ,] = useAuthState(auth);

    const { data, isLoading, refetch } = useQuery(['all-user', user], async () => {
        try {
            const { data } = await fetcher.get(`/all-user?email=${user.email}`)
            setActive(false);
            return data.sortedUsers;
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                message.warning(err?.response?.data?.message);
            }
        }
    })


    const makeAdmin = async email => {
        try {
            const { data } = await fetcher.put(`/add-admin/${user.email}`, { data: { email: email } })
            if (data.result.modifiedCount > 0) {
                refetch();
                message.success('Successfully made an admin');
            }
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                message.warning(err?.response?.data?.message);
            }
        }
    }

    const removeAdmin = async email => {
        try {
            const { data } = await fetcher.put(`/remove-admin/${user.email}`, { data: { email: email } })
            if (data.result.modifiedCount > 0) {
                refetch();
                message.success('Successfully remove an admin');
            }
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                message.warning(err?.response?.data?.message);
            }
        }
    }

    const { columns } = useColumn(active, makeAdmin, removeAdmin);

    if (isLoading) {
        return <Skeleton active />
    }

    return (
        <div>
            <h1>All Admin {data?.length}</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default AddAdmin;