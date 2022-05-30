import { Popconfirm, Skeleton } from "antd";
import { Link } from "react-router-dom";

export const useColumn = (active, handleCancelOrder) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: ['name', '_id'],
            key: '_id',
            render: (status, name) => (
                active ?
                    <Skeleton.Button active={active} size='small' shape='square' block={true} />
                    :
                    <h1>{name?.name}</h1>
            )
        },
        {
            title: 'Product',
            dataIndex: ['productName', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, productName) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{productName?.productName}</h1>
            )
        },
        {
            title: 'Transaction ID',
            dataIndex: ['transactionId', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, transactionId) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <small className='text-[#1890ff]'>{transactionId?.transactionId}</small>
            )
        },
        {
            title: 'Payment (status)',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, paymentStatus) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    paymentStatus.paymentStatus ?
                        <button
                            className='bg-success text-white uppercase w-20 rounded cursor-default'>
                            Paid
                        </button>
                        :
                        <Link to={`/dashboard/purchase/${paymentStatus.productId}/${paymentStatus._id}`}
                            className='hover:bg-sky-400 bg-[#1890ff]
                    px-7 py-0.5 text-white hover:text-white uppercase w-20 rounded duration-300'>
                            pay
                        </Link>
            )
        },
        {
            title: 'Action',
            dataIndex: ['transactionId', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, transactionId) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    transactionId.paymentStatus ?
                        <button
                            disabled readOnly
                            className='cursor-not-allowed bg-slate-200 text-slate-400
                         uppercase w-20 rounded duration-300'>
                            cancel
                        </button> :
                        <Popconfirm
                            placement="bottomRight"
                            title="Are you sure want to cancel?"
                            onConfirm={async () => {
                                handleCancelOrder(transactionId._id)
                            }}
                            okText="Yes"
                            cancelText="No">
                            <button
                                className='hover:bg-red-700 bg-red-600
                    text-white hover:text-white uppercase w-20 rounded duration-300'>
                                cancel
                            </button>
                        </Popconfirm>
            )
        },
    ];

    return { columns };
}