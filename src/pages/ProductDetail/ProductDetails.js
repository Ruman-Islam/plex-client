import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { message } from 'antd';
import Rating from 'react-rating';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import auth from '../../firebase/firebaseConfig';
import fetcher from '../../api/axios';
import Spinner from '../../components/shared/Spinner';

const ProductDetails = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { data } = await fetcher.get(`/product/${id}`)
            setProduct(data);
            setLoading(false);
        })()
    }, [id])

    const handleBooking = async id => {
        if (!user) {
            return message.warning('You have to login first')
        }

        const bookingProduct = {
            productId: id,
            name: user?.displayName,
            email: user?.email,
            productName: product.productName,
            productPrice: +(product.productPrice),
            availableQuantity: +(product.availableQuantity),
            minimumOrder: +(product.minimumOrder),
            paymentStatus: false,
            deliveryStatus: false,
            productDesc: product.productDesc,
            discount: +(product.discount),
            rating: +(product.rating),
            tags: product.tags,
            productImage: product.productImage,
            date: new Date().toDateString()
        }

        const { data } = await fetcher.post('/book-product', bookingProduct)
        if (data.success) {
            message.success('Booked!');
        }
    }

    const handleBuy = id => {
        navigate(`/dashboard/direct-purchase/${id}`)
    }

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner />
        </div>
    }

    return (
        <>
            <Navbar background="black" font="white" />
            <div className='page-container bg-slate-100'>
                <div className='content-wrap flex justify-center items-center h-screen'>
                    <div className='flex justify-center items-center xl:items-start text-center xl:text-left
                     flex-col xl:flex-row mx-auto bg-base-100 p-10 rounded-md w-12/12 xl:w-8/12 mt-16'>
                        <div className='w-64 xl:w-96  h-64 shrink-0 border'>
                            <img className='w-full h-full object-fill rounded-md' src={product.productImage} alt="" />
                            <div className='flex justify-between'>
                                <button
                                    onClick={() => handleBooking(product._id)}
                                    className="btn btn-primary px-12 rounded mt-2">
                                    <span className='text-base-100 text-lg font-semibold'>BOOK now</span>
                                </button>
                                <button
                                    onClick={() => handleBuy(product._id)}
                                    className="btn btn-success px-12 rounded mt-2">
                                    <span className='text-base-100 text-lg font-semibold'>buy now</span>
                                </button>
                            </div>
                        </div>
                        <div className='xl:px-6 pt-20 xl:py-0'>
                            <h1>Machineries</h1>
                            <h1 className='text-2xl font-semibold xl:text-left'>{product.productName}</h1>
                            <div className='flex justify-center xl:justify-start'>
                                <Rating
                                    className='text-sm text-amber-400'
                                    initialRating={product.rating}
                                    emptySymbol={<StarOutlined />}
                                    fullSymbol={<StarFilled />}
                                    readonly>
                                </Rating> <span className='mt-0.5 ml-2'>{product.rating}/5</span>
                            </div>
                            <p className='flex text-lg justify-center xl:justify-start'><span className='mr-2'>QUANTITY:</span>
                                <span className='flex items-center text-green-500'>
                                    <span className='mr-2'>{product.availableQuantity}</span>
                                </span>
                            </p>
                            <p className='flex text-lg my-2 justify-center xl:justify-start'><span className='mr-2'>TAGS :</span> {product?.tags}
                            </p>
                            <p className='flex text-lg justify-center xl:justify-start'><span className='mr-2'>ID :</span> <span>{product._id}</span></p>
                            <p className='text-4xl font-extrabold my-5 primary-color text-center md:text-left'>{'$'}{product.productPrice}</p>
                            <div className='flex flex-col'>
                                <div className='order-2 md:order-1 text-center md:text-left'>
                                    <p className='text-slate-500 text-justify'>{product.productDesc}.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default ProductDetails;