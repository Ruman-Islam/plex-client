import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import auth from '../../firebase/firebaseConfig';
import ProductDetail from './ProductDetail';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51L0XLkIIvR2CLQXhNg0viBvcrgnmpEttjNnvnGp7i7FiYRLgJ1qd41RNvm6aoWgN1uQM6uw6YKsoByX3YhWYajcO00E6QTREIU');

const Purchase = () => {
    const { id } = useParams();
    const [user, ,] = useAuthState(auth);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [purchaseInfo, setPurchaseInfo] = useState({
        name: user.displayName,
        email: user.email
    })

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProduct(data);
                setPurchaseInfo({
                    ...purchaseInfo,
                    productName: data.productName,
                    price: data.productPrice,
                    _id: data._id,
                })
            })
    }, [id])

    return (
        <>
            {loading ? <Spinner />
                :
                <div className='grid grid-cols-1 md:grid-cols-2 w-4/4 mx-auto my-10 md:my-20'>
                    <ProductDetail product={product} />
                    <div className='2xl:ml-5'>
                        <div className='flex flex-col'>
                            <label className='text-xl'>Name:</label>
                            <input name='name' value={user.displayName}
                                disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                            <label className='text-xl'>Email:</label>
                            <input name='email' value={user.email}
                                disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                            <label className='text-xl'>Address:</label>
                            <input onChange={(e) => setPurchaseInfo({
                                ...purchaseInfo, address: e.target.value
                            })}
                                name='address'
                                className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                            <label className='text-xl'>Phone:</label>
                            <input onChange={(e) => setPurchaseInfo({
                                ...purchaseInfo, phone: e.target.value
                            })}
                                name='phone'
                                type="number"
                                className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                            <label className='text-xl'>Minimum Order</label>
                            <input
                                type="number" name='productQuantity'
                                defaultValue={product.minimumOrder}
                                className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm purchaseInfo={purchaseInfo} />
                        </Elements>
                    </div>
                </div>}
        </>
    );
};

export default Purchase;