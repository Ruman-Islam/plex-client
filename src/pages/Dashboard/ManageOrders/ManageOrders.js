import { message, Skeleton, Table } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase/firebaseConfig';
import fetcher from '../../../api/axios';
import { useColumn } from './columns';

const ManageOrders = () => {
    const [active, setActive] = useState(true);
    const [user, ,] = useAuthState(auth);

    const { data, isLoading, refetch } = useQuery(['all-orders', user], async () => {
        try {
            const { data } = await fetcher.get(`/all-orders?email=${user.email}`)
            setActive(false);
            return data.allSortedBookings;
        } catch (err) {
            if (err?.response?.status === 403) message.warning(err?.response?.data?.message);
        }
    })
    console.log(data);

    const onChange = async (id, e) => {
        if (e[0] === 'Shipped') {
            try {
                const { data } = await fetcher.put(`/shipment-update/${id}`, { data: { email: user.email } })
                if (data.result?.modifiedCount > 0) {
                    message.success('Delivery status updated');
                    refetch();
                }
            } catch (err) {
                if (err?.response?.status === 403 || err?.response?.status === 401) {
                    message.warning(err?.response?.data?.message);
                }
            }
        }
    };


    const handleDeleteOrder = async id => {
        try {
            const { data } = await fetcher.delete(`/delete-order/${id}`, { data: { email: user.email } })
            if (data.result?.deletedCount > 0) {
                message.success('Order deleted');
                refetch();
            }
        } catch (err) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                message.warning(err?.response?.data?.message);
            }
        }
    }

    const { columns } = useColumn(active, onChange, handleDeleteOrder);

    if (isLoading) {
        return <Skeleton active />
    }

    return (
        <div>
            <h1>All orders {data?.length}</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ManageOrders;