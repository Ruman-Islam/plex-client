import { message, Popconfirm, Table } from 'antd';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../../../components/shared/Spinner';
import auth from '../../../firebase/firebaseConfig';
import { useQuery } from 'react-query';

const AddAdmin = () => {
    const [user, ,] = useAuthState(auth);

    const url = `http://localhost:5000/all-user?email=${user.email}`;
    const { data: { users } = {}, isLoading, refetch } = useQuery(['all-user', user], () => fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    const makeAdmin = email => {
        const url = `http://localhost:5000/add-admin/${user.email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email: email })
        })
            .then(res => {
                if (res.status === 403) {
                    message.error('Failed to make an admin')
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    message.success('Successfully made an admin')
                    refetch();
                }
            })
    }

    const removeAdmin = email => {
        const url = `http://localhost:5000/remove-admin/${user.email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ email: email })
        })
            .then(res => {
                if (res.status === 403) {
                    message.error('Failed to remove an admin')
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    message.success('Successfully remove an admin')
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
            title: 'Role',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, id) => <h1>{id.role}</h1>,
        },
        {
            title: 'Action',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, id) => {
                return id.role !== 'admin' ?
                    <Popconfirm
                        placement="bottom"
                        title="Make admin?"
                        onConfirm={async () => {
                            makeAdmin(id.userInfo?.email);
                        }}
                        okText="Yes"
                        cancelText="No">
                        <button
                            className='hover:bg-sky-400 bg-[#1890ff] cursor-pointer
                     text-white uppercase w-5/12 text-2xs rounded'>
                            Make Admin
                        </button>
                    </Popconfirm>
                    :
                    <Popconfirm
                        placement="bottom"
                        title="Make admin?"
                        onConfirm={async () => {
                            removeAdmin(id.userInfo?.email);
                        }}
                        okText="Yes"
                        cancelText="No">
                        <button
                            className='hover:bg-red-700 bg-red-600 text-white uppercase
                             w-5/12 px-1 text-2xs rounded cursor-pointer'>
                            Remove Admin
                        </button>
                    </Popconfirm>
            },
        }
    ];
    return (
        <div>
            <h1>All Admin {users?.length}</h1>
            <Table columns={columns} dataSource={users} />
        </div>
    );
};

export default AddAdmin;