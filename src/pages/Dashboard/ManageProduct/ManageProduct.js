import { message, Popconfirm, Table } from 'antd';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Spinner from '../../../components/shared/Spinner';
import auth from '../../../firebase/firebaseConfig';

const ManageProduct = () => {
    const [user, ,] = useAuthState(auth);

    const url = 'http://localhost:5000/products';
    const { data, isLoading, refetch } = useQuery(['all-products', user], () => fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Spinner />
    }


    const handleDeleteProduct = id => {
        const url = `http://localhost:5000/delete-product/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.deletedCount > 0) {
                    message.success('Order deleted successfully');
                    refetch();
                }
            })
    }


    const columns = [
        {
            title: 'Product Name',
            dataIndex: ['productName', '_id'],
            key: '_id',
            render: (status, id) => <h1>{id.productName}</h1>,
        },
        {
            title: 'Price',
            dataIndex: ['productPrice', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, productPrice) => <h1>{productPrice.productPrice} $</h1>,
        },
        {
            title: 'Available Quantity',
            dataIndex: ['availableQuantity', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.availableQuantity} pieces</h1>,
        },
        {
            title: 'Minimum Order',
            dataIndex: ['minimumOrder', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, minimumOrder) => <h1>{minimumOrder.minimumOrder} pieces</h1>,
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
                        handleDeleteProduct(id._id)
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

    return (
        <div>
            <h1>Total products {data?.length}</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ManageProduct;