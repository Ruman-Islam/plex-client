import { Cascader, Popconfirm, Skeleton, Tooltip } from "antd";

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

export const useColumn = (active, onChange, handleDeleteOrder) => {
    const columns = [
        {
            title: 'Product Name',
            dataIndex: ['productName', '_id'],
            key: '_id',
            render: (_id, productName) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <Tooltip color='blue' key='blue' placement="topLeft" title={productName?.productName}>
                        <h1>{productName?.productName.slice(0, 30)}...</h1>
                    </Tooltip>
            )
        },
        {
            title: 'Ordered Date',
            dataIndex: ['date', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, date) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{date.date}</h1>
            )
        },
        {
            title: 'Customer Name',
            dataIndex: ['name', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, name) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1>{name.name}</h1>
            )
        },
        {
            title: 'Transaction Id',
            dataIndex: ['transactionId', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (_id, transactionId) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <h1 className='text-blue-600'>{transactionId.transactionId ?
                        <span className={`${transactionId.deliveryStatus && 'text-success'}`}>
                            {transactionId.transactionId}</span>
                        :
                        <span className='text-red-600'>UNPAID</span>}</h1>
            )
        },
        {
            title: 'Status',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, paymentStatus) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <Cascader options={options}
                        value={paymentStatus.deliveryStatus ? 'Shipped' : 'Pending'}
                        expandTrigger="hover"
                        disabled={!paymentStatus.paymentStatus || paymentStatus.deliveryStatus}
                        onChange={(e) => onChange(paymentStatus._id, e)} />
            )
        },
        {
            title: 'Action',
            dataIndex: ['paymentStatus', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, paymentStatus) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} />
                    :
                    <Popconfirm placement="bottomRight" title="Are you sure want to delete?"
                        onConfirm={async () => handleDeleteOrder(paymentStatus._id)}
                        okText="Yes"
                        cancelText="No">
                        <button
                            className='hover:bg-red-700 bg-red-600 text-white
            hover:text-white uppercase w-20 rounded duration-300'>
                            delete
                        </button>
                    </Popconfirm>
            )
        }
    ];

    return { columns }
}
