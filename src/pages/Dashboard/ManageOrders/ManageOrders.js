import { message, Popconfirm, Table } from 'antd';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Spinner from '../../../components/shared/Spinner';
import auth from '../../../firebase/firebaseConfig';
import { Cascader } from 'antd';

const ManageOrders = () => {
    const [user, ,] = useAuthState(auth);
    const url = `http://localhost:5000/all-orders?email=${user.email}`;
    const { data: { result } = {}, isLoading, refetch } = useQuery(['all-orders', user], () => fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Spinner />
    }


    const onChange = (id) => {
        const url = `http://localhost:5000/shipment-update/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.modifiedCount > 0) {
                    message.success('Delivery status updated');
                    refetch();
                }
            })
    };


    const columns = [
        {
            title: 'Product Name',
            dataIndex: ['productName', '_id'],
            key: '_id',
            render: (status, id) => <h1>{id.productName}</h1>,
        },
        {
            title: 'Ordered Date',
            dataIndex: ['date', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.date}</h1>,
        },
        {
            title: 'Customer Name',
            dataIndex: ['name', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.name}</h1>,
        },
        {
            title: 'Transaction Id',
            dataIndex: ['transactionId', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1 className='text-success'>{id.transactionId ? id.transactionId :
                <span className='text-red-600'>UNPAID</span>}</h1>
        },
        {
            title: 'Status',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, id) => <Cascader options={options}
                defaultValue={id.deliveryStatus ? 'Shipped' : 'Pending'}
                expandTrigger="hover"
                disabled={!id.paymentStatus || id.deliveryStatus}
                onChange={() => onChange(id._id)} />
        },
        {
            title: 'Action',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, id) => {
                return <Popconfirm
                    placement="bottomRight"
                    title="Are you sure want to delete?"
                    onConfirm={async () => {
                        // handleUserDelete(id.userInfo?.email)
                    }}
                    okText="Yes"
                    cancelText="No">
                    <button
                        className='hover:bg-red-700 bg-red-600 text-white
            hover:text-white uppercase w-20 rounded duration-300'>
                        Delete
                    </button>
                </Popconfirm>
            }
        }
    ];


    const options = [
        {
            value: 'Pending',
            label: 'Pending'
        },
        {
            value: 'Shipped',
            label: 'Shipped'
        },
    ];

    return (
        <div>
            <h1>All orders {result?.length}</h1>
            <Table columns={columns} dataSource={result} />
        </div>
    );
};

export default ManageOrders;