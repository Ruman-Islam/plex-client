import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/shared/Spinner';
import ProductDetail from './ProductDetail';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51L0XLkIIvR2CLQXhNg0viBvcrgnmpEttjNnvnGp7i7FiYRLgJ1qd41RNvm6aoWgN1uQM6uw6YKsoByX3YhWYajcO00E6QTREIU');

const Purchase = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://mysterious-harbor-14588.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProduct(data);
            })
    }, [id])

    return (
        <>
            {loading ? <Spinner />
                :
                <div className='grid grid-cols-1 md:grid-cols-2 w-4/4 mx-auto my-10 md:my-20'>
                    <ProductDetail product={product} />
                    <div className='2xl:ml-5'>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm product={product} />
                        </Elements>
                    </div>
                </div>}
        </>
    );
};

export default Purchase;