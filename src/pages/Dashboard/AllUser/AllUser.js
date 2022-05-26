import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase/firebaseConfig';
import Spinner from '../../../components/shared/Spinner';
import { message, Popconfirm, Table } from 'antd';


const AllUser = () => {
    const [user, ,] = useAuthState(auth);
    const url = `http://localhost:5000/all-user?email=${user.email}`;
    const { data: { users } = {}, isLoading, refetch } = useQuery(['all-user', user], () => fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Spinner />
    }

    const handleUserDelete = email => {
        const url = `http://localhost:5000/delete-user/${user.email}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email })
        })
            .then(res => {
                if (res.status === 403) {
                    message.error('Failed to delete')
                }
                return res.json();
            })
            .then(data => {
                if (data.result.deletedCount > 0) {
                    refetch();
                    message.success('Successfully deleted')
                }
            })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            render: (status, id) => <h1>{id.userInfo?.name}</h1>,
        },
        {
            title: 'Email',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.userInfo?.email}</h1>,
        },
        {
            title: 'Phone',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.userInfo?.phone}</h1>,
        },
        {
            title: 'Location',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.userInfo?.location}</h1>,
        },
        {
            title: 'Education',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, id) => <h1>{id.userInfo?.education}</h1>,
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
                        handleUserDelete(id.userInfo?.email)
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
            <h1>All users {users?.length}</h1>
            <Table columns={columns} dataSource={users} />
        </div>
    );
};

export default AllUser;