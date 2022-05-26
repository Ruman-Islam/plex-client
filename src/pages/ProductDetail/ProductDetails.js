import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';
import Spinner from '../../components/shared/Spinner';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import { message } from 'antd';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`https://mysterious-harbor-14588.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProduct(data);
            })
    }, [id])

    const handleBooking = id => {
        const bookingProduct = {
            name: user.displayName,
            email: user.email,
            productName: product.productName,
            productId: id,
            price: product.productPrice,
            paymentStatus: false,
            date: new Date().toDateString()
        }

        fetch('https://mysterious-harbor-14588.herokuapp.com/book-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingProduct)
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    navigate(`/dashboard/purchase/${id}`)
                } else {
                    message.error('You have already purchased this product')
                }
            })
    }

    return (
        <>
            <Navbar background="white" font="black" />
            <div id='product-detail' className='page-container'>
                {loading ? <Spinner /> :
                    <div className='flex justify-center items-center 2xl:items-start text-center 2xl:text-left
                     flex-col 2xl:flex-row py-24 2xl:py-44 w-8/12 content-wrap mx-auto'>
                        <div className='w-56 2xl:w-4/12 shrink-0'>
                            <img className='w-full 2xl:h-[65vh] object-fill' src={product.productImage} alt="" />
                        </div>
                        <div className='2xl:px-6'>
                            <h1 className='text-2xl font-semibold 2xl:text-left'>{product.productName}</h1>
                            <Rating
                                className='text-lg text-amber-400 2xl:my-2'
                                initialRating={product.rating}
                                emptySymbol={<StarOutlined />}
                                fullSymbol={<StarFilled />}
                                readonly>
                            </Rating>
                            <p className='flex text-lg justify-center 2xl:justify-start'><span className='mr-2'>QUANTITY:</span>
                                <span className='flex items-center text-green-500'>
                                    <span className='mr-2'>{product.availableQuantity}</span>
                                </span>
                            </p>
                            <p className='flex text-lg my-2 justify-center 2xl:justify-start'><span className='mr-2'>TAGS :</span> {product.tags}
                            </p>
                            <p className='flex text-lg justify-center 2xl:justify-start'><span className='mr-2'>ID :</span> <span>{product._id}</span></p>
                            <p className='text-4xl font-extrabold my-5 primary-color text-center md:text-left'>{'$'}{product.productPrice}</p>
                            <div className='flex flex-col'>
                                <div className='order-2 md:order-1 text-center md:text-left'>
                                    <p className='text-slate-500'>{product.productDesc}.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleBooking(product._id)}
                                className="btn btn-primary px-12 rounded">
                                <span className='text-base-100 text-lg font-semibold'>BOOK</span>
                            </button>
                        </div>
                    </div>}
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;