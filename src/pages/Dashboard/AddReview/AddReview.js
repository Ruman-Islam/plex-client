import React, { useState } from 'react';
import Rating from './Rating';
import { Input, message } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase/firebaseConfig';
import fetcher from '../../../api/axios';
import Spinner from '../../../components/shared/Spinner';
const { TextArea } = Input;

const AddReview = () => {
    const [user, ,] = useAuthState(auth);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle submit 
    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        const review = {
            name: user.displayName,
            email: user.email,
            rating: rating,
            companyTitle: e.target.companyTitle.value,
            text: e.target.text.value,
            date: new Date().toLocaleString().split(',')[0]
        }

        const { data } = await fetcher.post('/add-review', review)
        if (data.success) {
            message.success('Thank You for give us review')
            e.target.companyTitle.value = '';
            e.target.text.value = '';
            setRating(null);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-[90vh]'><Spinner /></div>
        )
    }

    return (
        <>
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit} className=' 2xl:w-6/12 mx-auto flex justify-center'>
                <div className='w-full'>
                    <div className='flex justify-center flex-col mb-5 items-center'>
                        <span className='2xl:text-3xl mr-2 mb-1.5'>Please Rate </span>
                        <div className='my-5'>
                            <Rating
                                rating={rating}
                                setRating={setRating}
                                hover={hover}
                                setHover={setHover}
                            />
                        </div>
                        <Input name='companyTitle' placeholder="Your company title" />
                    </div>
                    <div>
                        <TextArea name='text' rows={4} placeholder="Complete with 200 words......" maxLength={200} />
                    </div>
                    <input className='btn btn-primary w-full mt-2' type="submit" value="Add Review" />
                </div>
            </form>
        </>
    );
};

export default AddReview;