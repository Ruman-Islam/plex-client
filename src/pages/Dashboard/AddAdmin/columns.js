import { DingdingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Skeleton } from "antd";

export const useColumn = (active, makeAdmin, removeAdmin) => {
    const columns = [
        {
            title: 'Photo',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Avatar active={active} size='default' shape='circle' />
                    : userInfo?.photoURL ?
                        <Avatar src={userInfo?.photoURL} />
                        :
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            )
        },
        {
            title: 'Name',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{userInfo?.name}</h1>
            )
        },
        {
            title: 'Email',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{userInfo?.email}</h1>
            )
        },
        {
            title: 'Phone',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{userInfo?.phone}</h1>
            )
        },
        {
            title: 'Role',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1 className='flex items-center'>
                        <span className='mt-2'>{userInfo.role}</span>
                        {userInfo.email === 'rumanislam0429@gmail.com' &&
                            <span className='text-sky-600 text-xl'><DingdingOutlined /></span>}
                    </h1>
            )
        },
        {
            title: 'Action',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    userInfo.role !== 'admin' ?
                        <Popconfirm
                            placement="left" title="Make admin?"
                            onConfirm={async () => {
                                makeAdmin(userInfo.email);
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
                            placement="left" title="Remove admin?"
                            onConfirm={async () => removeAdmin(userInfo.email)}
                            okText="Yes" cancelText="No">
                            <button
                                className='hover:bg-red-700 bg-red-600 text-white uppercase
                             w-5/12 px-1 text-2xs rounded cursor-pointer'>
                                Remove Admin
                            </button>
                        </Popconfirm>)
        }
    ];

    return { columns }
}