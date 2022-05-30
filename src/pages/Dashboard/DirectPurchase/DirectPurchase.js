import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import ProductDetail from '../Purchase/ProductDetail';
import DirectCheckForm from './DirectCheckForm';
import fetcher from '../../../api/axios';
const stripePromise = loadStripe('pk_test_51L0XLkIIvR2CLQXhNg0viBvcrgnmpEttjNnvnGp7i7FiYRLgJ1qd41RNvm6aoWgN1uQM6uw6YKsoByX3YhWYajcO00E6QTREIU');

const DirectPurchase = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await fetcher(`/product/${productId}`)
            setProduct(data)
        })()
    }, [productId])

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 w-4/4 mx-auto my-10 md:my-20'>
                <ProductDetail product={product} />
                <div className='2xl:ml-5'>
                    <Elements stripe={stripePromise}>
                        <DirectCheckForm product={product} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default DirectPurchase;