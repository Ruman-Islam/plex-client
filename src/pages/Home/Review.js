import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import img1 from '../../assets/images/IDC-Saas-Award-ERP-color.webp';
import Rating from 'react-rating';
import { StarFilled, StarOutlined } from '@ant-design/icons';


const contentStyle = {
    background: '#F2F3F3',
    display: 'flex'
};

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get-review')
            .then(res => res.json())
            .then(data => {
                console.log(data.reviews);
                setReviews(data.reviews);
            })
    }, [])

    return (
        <div className='border border-black w-10/10 xl:w-8/12 xl:mx-auto my-20 mx-2'>
            <Carousel autoplay>
                {reviews.map(review =>
                    <>
                        <div style={contentStyle} className='p-10 xl:p-20 flex flex-col xl:flex-row justify-center h-full'>
                            <div className='text-black xl:flex-1 flex flex-col'>
                                <span className='text-xl'>{review.date}</span>
                                <h1 className='text-4xl uppercase'>{review.companyTitle}</h1>
                                <h1 className='text-xl uppercase'>{review.name}</h1>
                                <div className='w-8/12 h-20'>
                                    <p className='text-md text-slate-500 break-all'>{review.text.slice(0, 150)}</p>
                                </div>
                                <Rating
                                    className='text-lg text-amber-400 2xl:my-2'
                                    initialRating={review.rating}
                                    emptySymbol={<StarOutlined />}
                                    fullSymbol={<StarFilled />}
                                    readonly>
                                </Rating>
                            </div>
                            <div className='w-56 h-36 xl:flex-auto'>
                                <img className='w-full' src={img1} alt="" />
                            </div>
                        </div>
                    </>)}

            </Carousel>
        </div>
    );
};

export default Review;