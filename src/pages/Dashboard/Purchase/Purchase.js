import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import fetcher from '../../../api/axios';
const stripePromise = loadStripe('pk_test_51L0XLkIIvR2CLQXhNg0viBvcrgnmpEttjNnvnGp7i7FiYRLgJ1qd41RNvm6aoWgN1uQM6uw6YKsoByX3YhWYajcO00E6QTREIU');

const Purchase = () => {
    const { productId, bookedProductId } = useParams();
    const [product, setProduct] = useState({});
    const [bookedProduct, setBookedProduct] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await fetcher(`/product/${productId}`)
            setProduct(data)
        })()
    }, [productId])

    useEffect(() => {
        (async () => {
            const { data } = await fetcher(`/book-product/${bookedProductId}`)
            setBookedProduct(data)
        })()
    }, [bookedProductId])

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 w-4/4 mx-auto my-10 xl:my-0 2xl:my-20'>
                <ProductDetail product={product} />
                <div className='2xl:ml-5'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm bookedProduct={bookedProduct} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Purchase;