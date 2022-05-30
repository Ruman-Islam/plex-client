import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Skeleton } from "antd";

export const useColumn = (active, handleDeleteProduct) => {

    const columns = [
        {
            title: 'Product Name',
            dataIndex: ['productImage', '_id'],
            key: '_id',
            render: (_id, productImage) => (
                active ?
                    <Skeleton.Avatar active={active} size='default' shape='circle' />
                    : productImage?.productImage ?
                        <Avatar className='border border-green-700' src={productImage?.productImage} />
                        :
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            )
        },
        {
            title: 'Product Name',
            dataIndex: ['productName', '_id'],
            key: '_id',
            render: (status, productName) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1>{productName?.productName.slice(0, 30)}...</h1>
            )
        },
        {
            title: 'Price',
            dataIndex: ['productPrice', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, productPrice) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1>{productPrice?.productPrice} $</h1>
            )
        },
        {
            title: 'Discount Price',
            dataIndex: ['discount', '_id'],
            key: '_id',
            render: (status, discount) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1>{discount?.discount} %</h1>
            )
        },
        {
            title: 'Available Quantity',
            dataIndex: ['availableQuantity', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, availableQuantity) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1>{availableQuantity.availableQuantity} pieces</h1>
            )
        },
        {
            title: 'Minimum Order',
            dataIndex: ['minimumOrder', '_id'],
            key: '_id',
            responsive: ['md'],
            render: (status, minimumOrder) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <h1>{minimumOrder.minimumOrder} pieces</h1>
            ),
        },
        {
            title: 'Action',
            dataIndex: ['product', '_id'],
            key: '_id',
            responsive: ['lg'],
            render: (status, product) => (
                active ?
                    <Skeleton.Button active={active} size='default' shape='square' block={true} /> :
                    <Popconfirm
                        placement="bottomRight"
                        title="Are you sure want to delete?"
                        onConfirm={async () => handleDeleteProduct(product._id)}
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

    return { columns };

}