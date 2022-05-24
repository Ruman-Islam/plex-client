import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Spinner from '../../components/shared/Spinner';
import { message } from 'antd';

const CheckoutForm = ({ purchaseInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { _id, price, name, email, address, phone } = purchaseInfo;


    useEffect(() => {
        if (price) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ price })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }
                })
        }
    }, [price])


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!address || !phone) {
            (() => {
                message.error('Address or phone is required');
                setLoading(false);
            })()
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
        setSuccess('');


        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
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
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats! Your payment is completed.');

            // store payment on database
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
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

                })
        }
    };

    return (
        <>
            <form className='border py-5 rounded-lg px-10' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-4 bg-white px-5 text-success text-xl' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {loading && <Spinner />}
            {cardError && <p className='text-red-500'>{cardError}</p>}
            {success && <div className='text-green-500'>
                <p>{success}</p>
                <p>Your transaction Id: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
            </div>}
        </>
    );
};

export default CheckoutForm;