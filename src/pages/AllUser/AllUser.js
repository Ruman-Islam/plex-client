import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase/firebaseConfig';
import Spinner from '../../components/shared/Spinner';
import { Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';


const AllUser = () => {
    const [user, ,] = useAuthState(auth);
    const url = `http://localhost:5000/all-user?email=${user.email}`;
    const { data: { users } = {}, isLoading, refetch } = useQuery(['all-user', user], () => fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    const handleCancelOrder = id => {
        fetch(`http://localhost:5000/delete-order/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Spinner />
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: '_id',
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: '_id',
            responsive: ['md'],
        },
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: '_id',
            responsive: ['md'],
            render: (text) => <small className='text-[#1890ff]'>{text}</small>
        },
        {
            title: 'Payment (status)',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, id) => {
                return id.paymentStatus ? <button
                    className='bg-success text-white uppercase w-20 rounded cursor-default'>
                    Paid
                </button> :
                    <Link to={`/dashboard/purchase/${id.productId}`}
                        className='hover:bg-sky-400 bg-[#1890ff]
                        px-7 py-0.5 text-white hover:text-white uppercase w-20 rounded duration-300'>
                        pay
                    </Link>
            },
        },
        {
            title: 'Action',
            dataIndex: 'transactionId',
            key: '_id',
            responsive: ['md'],
            render: (status, id) => {
                return id.paymentStatus ?
                    null :
                    <Popconfirm
                        placement="bottomRight"
                        title="Are you sure want to cancel?"
                        onConfirm={async () => {
                            handleCancelOrder(id._id)
                        }}
                        okText="Yes"
                        cancelText="No">
                        <button
                            className='hover:bg-red-700 bg-red-600
                    text-white hover:text-white uppercase w-20 rounded duration-300'>
                            cancel
                        </button>
                    </Popconfirm>

            },
        },
    ];


    return (
        <div>
            <h1>All users {users?.length}</h1>
            <Table columns={columns} dataSource={users} />
        </div>
    );
};

export default AllUser;