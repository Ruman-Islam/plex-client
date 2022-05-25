import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import { Table } from 'antd';

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
        title: 'Payment (status)',
        dataIndex: 'paymentStatus',
        key: '_id',
        responsive: ['lg'],
        render: (status) => {
            return status ? <button
                className='bg-success text-white uppercase w-20 rounded'>
                Paid
            </button> :
                <button
                    className='hover:bg-sky-400 bg-[#1890ff] text-white uppercase w-20 rounded'>
                    pay
                </button>
        },
    },
];

const MyOrders = () => {
    const [user, ,] = useAuthState(auth);
    const [bookedProducts, setBookedProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/my-orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBookedProducts(data.orders);
            })
    }, [user])

    return (
        <div>
            <h1>My Orders</h1>
            <Table columns={columns} dataSource={bookedProducts} />
        </div>
    );
};

export default MyOrders;