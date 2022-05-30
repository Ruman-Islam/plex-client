import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { message, Skeleton, Table } from 'antd';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useColumn } from './columns';
import fetcher from '../../../api/axios';

const MyOrders = () => {
    const [user, ,] = useAuthState(auth);
    const [active, setActive] = useState(true);

    const { data: { orders } = {}, isLoading, refetch } = useQuery(['my-orders', user], async () => {
        try {
            const { data } = await fetcher.get(`/user/my-orders?email=${user.email}`)
            setActive(false);
            return data;
        } catch (err) {
            setActive(false);
            if (err?.response?.status === 401) message.warning(err?.response?.data?.message);
        }
    })

    const handleCancelOrder = async id => {
        try {
            const { data } = await fetcher.delete(`/delete-my-order/${id}`)
            if (data.deletedCount > 0) {
                refetch();
                message.success('Order deleted')
            }
        } catch (err) {
            setActive(false);
            if (err?.response?.status === 401) message.warning(err?.response?.data?.message);
        }
    }

    const { columns } = useColumn(active, handleCancelOrder)

    if (isLoading) {
        return (
            <div><Skeleton active /></div>
        )
    }

    return (
        <div>
            <h1>My Orders {orders?.length}</h1>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};

export default MyOrders;