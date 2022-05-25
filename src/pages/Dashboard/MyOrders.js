import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import { Table, Button, Popover, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [user, ,] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [stateChange, setStateChange] = useState(false);

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


    useEffect(() => {
        fetch(`http://localhost:5000/my-orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders);
            })
    }, [user, stateChange])

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
                    setStateChange(!stateChange);
                }
            })
    }

    return (
        <div>
            <h1>My Orders</h1>
            <Table columns={columns} dataSource={orders} />
        </div>
    );
};

export default MyOrders;