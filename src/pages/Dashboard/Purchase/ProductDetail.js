import { StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';

const ProductDetail = ({ product }) => {
    return (
        <div className='flex flex-col 2xl:flex-row'>
            <div className='w-56 2xl:w-96 shrink-0'>
                <img className='w-full' src={product.productImage} alt="" />
            </div>
            <div className='2xl:px-6'>
                <h1 className='text-2xl font-semibold text-left'>{product.productName}</h1>
                <Rating
                    className='text-lg text-amber-400 2xl:my-2'
                    initialRating={product.review}
                    emptySymbol={<StarOutlined />}
                    fullSymbol={<StarOutlined />}
                    readonly>
                </Rating>
                <p className='flex text-lg'><span className='mr-2'>AVAILABILITY :</span>
                    <span className='flex items-center text-green-500'>
                        <span className='mr-2'>{product.availableQuantity}</span>
                    </span>
                </p>
                <p className='flex text-lg my-2'><span className='mr-16'>TAGS :</span> {product.tags?.map((tag, index) =>
                    <span className='mr-1' key={index}>{tag},</span>
                )}
                </p>
                <p className='flex text-lg'><span className='mr-2'>ID :</span> <span>{product._id}</span></p>
                <p className='text-4xl font-extrabold my-5 primary-color text-center md:text-left'>{'$'}{product.productPrice}</p>
                <div className='flex flex-col'>
                    <div className='order-2 md:order-1 text-center md:text-left'>
                        <p className='text-slate-500'>{product.productDesc}.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;