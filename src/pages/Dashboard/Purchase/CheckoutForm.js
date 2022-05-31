import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import useGetCurrentUser from '../../../hooks/useGetCurrentUser';
import { LoadingOutlined } from '@ant-design/icons';
import fetcher from '../../../api/axios';

const CheckoutForm = ({ bookedProduct }) => {
    const navigate = useNavigate();
    const [user, ,] = useAuthState(auth);
    const { currentUser } = useGetCurrentUser(user.email);
    const stripe = useStripe();
    const [quantity, setQuantity] = useState();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const { _id, productPrice, minimumOrder, availableQuantity } = bookedProduct;


    useEffect(() => {
        if (productPrice) {
            (async () => {
                const { data } = await fetcher.post('/create-payment-intent', { price: productPrice })
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })()
        }
    }, [productPrice])


    useEffect(() => {
        if (+(quantity) < +(minimumOrder)) {
            setCardError(`Minimum order value ${minimumOrder}`);
        }
        else if (+(quantity) > +(availableQuantity)) {
            setCardError(`you have exceeded limit of order ${availableQuantity}`);
        } else {
            setCardError('');
        }
    }, [quantity, minimumOrder, availableQuantity])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!event.target.address.value || !event.target.phone.value) {
            message.error('Address & phone is required');
            setLoading(false);
            return;
        }

        if (+(event.target.productQuantity.value) < +minimumOrder) {
            message.error(`Minimum order value ${minimumOrder}`);
            return;
        }

        if (+(event.target.productQuantity.value) > +availableQuantity) {
            message.error(`you have exceeded limit of order ${availableQuantity}`);
            return;
        }

        if (!elements || !stripe) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setCardError(error?.message);
        } else {
            setCardError('');
        }
        setLoading(true);


        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );

        if (intentError) {
            setLoading(false);
            setCardError(intentError?.message);
        } else {
            setLoading(false);
            setCardError('');

            // store payment on database
            const payment = {
                product: _id,
                transactionId: paymentIntent.id,
                name: event.target.name.value,
                email: event.target.email.value,
                address: event.target.address.value,
                phone: event.target.phone.value,
                productQuantity: event.target.productQuantity.value
            }
            const { data } = await fetcher.patch(`/booking/${_id}`, payment)
            if (data.paymentStatus) {
                message.success('Payment Successful');
                navigate('/dashboard/my-orders')
            }
        }
    };

    return (
        <>
            <form className='border py-5 rounded-lg px-10' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label className='text-xl'>Name:</label>
                        <input name='name' value={currentUser.name}
                            disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                        <label className='text-xl'>Email:</label>
                        <input name='email' value={currentUser.email}
                            disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                        <label className='text-xl'>Address:</label>
                        <input
                            name='address' defaultValue={currentUser.location}
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                        <label className='text-xl'>Phone:</label>
                        <input
                            name='phone' defaultValue={currentUser.phone}
                            type="number"
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                        <label className='text-xl'>Minimum Order</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            name='productQuantity'
                            type="number"
                            defaultValue={minimumOrder}
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                    </div>
                </div>
                <CardElement
                    className='border p-4 mt-3 rounded-lg'
                />

                <div className='flex justify-center w-full'>
                    <button
                        className='mt-4 w-full btn btn-info px-10 text-white text-lg uppercase rounded'
                        type="submit"
                        disabled={!stripe || !clientSecret || loading || + quantity < +minimumOrder || +quantity > +availableQuantity}>
                        <Spin spinning={loading} indicator={<LoadingOutlined />}>
                            pay now
                        </Spin>
                    </button>
                </div>

            </form>

            {cardError && <p className='text-red-500 text-xl'>{cardError}</p>}
        </>
    );
};

export default CheckoutForm;