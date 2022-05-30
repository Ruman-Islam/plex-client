import { message, Skeleton, Table } from 'antd';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import fetcher from '../../../api/axios';
import auth from '../../../firebase/firebaseConfig';
import { useColumn } from './columns';

const ManageProduct = () => {
    const [active, setActive] = useState(true);

    const [user, ,] = useAuthState(auth);

    const { data, isLoading, refetch } = useQuery(['all-products', user], async () => {
        try {
            const { data } = await fetcher.get(`/products`)
            setActive(false);
            return data;
        } catch (err) {
            if (err?.response?.status === 401) message.warning(err?.response?.data?.message);
        }
    })


    const handleDeleteProduct = async id => {
        try {
            const { data } = await fetcher.delete(`/delete-product/${id}`, { data: { email: user.email } })
            if (data.result.deletedCount > 0) {
                refetch();
                message.success('Order deleted successfully');
            }
        } catch (err) {
            if (err?.response?.status === 401) message.warning(err?.response?.data?.message);
        }
    }

    const { columns } = useColumn(active, handleDeleteProduct)

    if (isLoading) {
        return <Skeleton active />
    }

    return (
        <div>
            <h1>Total products {data?.length}</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ManageProduct;