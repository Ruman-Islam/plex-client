import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Skeleton } from "antd";

export const useColumn = (active, handleUserDelete) => {
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
            responsive: ['md'],
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
            title: 'Location',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{userInfo?.location}</h1>
            )
        },
        {
            title: 'Education',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{userInfo?.education}</h1>
            )
        },
        {
            title: 'Action',
            dataIndex: ['userInfo', '_id'],
            key: '_id',
            render: (_id, userInfo) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <Popconfirm
                        placement="bottomRight"
                        title="Are you sure want to delete?"
                        onConfirm={async () => handleUserDelete(userInfo?.email)}
                        okText="Yes"
                        cancelText="No">
                        <button
                            className='hover:bg-red-700 bg-red-600 text-white
            hover:text-white uppercase w-20 rounded duration-300'>
                            Delete
                        </button>
                    </Popconfirm>
            )
        }
    ];
    return { columns }
}
