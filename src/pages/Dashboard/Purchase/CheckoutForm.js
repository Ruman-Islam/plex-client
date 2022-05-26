import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Spinner from '../../../components/shared/Spinner';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ product }) => {
    const navigate = useNavigate();
    const [user, ,] = useAuthState(auth);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    // const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    // const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { _id, productPrice, minimumOrder, availableQuantity } = product;


    useEffect(() => {
        if (productPrice) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ price: productPrice })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }
                })
        }
    }, [productPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!event.target.address.value || !event.target.phone.value) {
            message.error('Address & phone is required');
            setLoading(false);
            return;
        }

        if (event.target.productQuantity.value < minimumOrder) {
            message.error(`Minimum order value ${minimumOrder}`);
            return;
        }

        if (event.target.productQuantity.value > availableQuantity) {
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
        // setSuccess('');


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
            // setTransactionId(paymentIntent.id);
            // setSuccess('Congrats! Your payment is completed.');

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
            fetch(`http://localhost:5000/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.paymentStatus) {
                        message.success('Payment Successful');
                        navigate('/dashboard/my-orders')
                    }
                })
        }
    };

    return (
        <>
            <form className='border py-5 rounded-lg px-10' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label className='text-xl'>Name:</label>
                        <input name='name' value={user.displayName}
                            disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                        <label className='text-xl'>Email:</label>
                        <input name='email' value={user.email}
                            disabled className='text-lg text-slate-500 font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg' />
                        <label className='text-xl'>Address:</label>
                        <input
                            name='address'
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                        <label className='text-xl'>Phone:</label>
                        <input
                            name='phone'
                            type="number"
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                        <label className='text-xl'>Minimum Order</label>
                        <input
                            name='productQuantity'
                            type="number"
                            defaultValue={minimumOrder}
                            className='text-lg font-semibold bg-slate-100 p-2 px-5 my-1 rounded-lg outline-none' />
                    </div>
                </div>
                <CardElement
                    className='border p-4 mt-3 rounded-lg'
                />
                <button
                    className='mt-4 btn btn-info px-10 text-white text-lg uppercase rounded'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    pay now
                </button>
            </form>
            {loading && <Spinner margin='5' />}
            {cardError && <p className='text-red-500'>{cardError}</p>}
            {/* {success && <div className='text-green-500'>
                <p>{success}</p>
                <p>Your transaction Id: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
            </div>} */}
        </>
    );
};

export default CheckoutForm;