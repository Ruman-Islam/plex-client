import { Carousel } from 'antd';
import img1 from '../../assets/images/IDC-Saas-Award-ERP-color.webp';
import Rating from 'react-rating';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

const contentStyle = {
    background: '#F2F3F3',
    display: 'flex'
};

const Review = () => {
    const url = 'http://localhost:5000/get-review';
    const { data: { reviews } = {} } = useQuery('getReview', () => fetch(url, {
        method: 'GET'
    }).then(res => res.json()))


    return (
        <div className='border border-black w-10/10 xl:w-8/12 xl:mx-auto my-20 mx-2'>
            <Carousel autoplay>
                {reviews?.map((review, index) =>
                    <div key={index}>
                        <div style={contentStyle}
                            className='p-10 xl:p-20 flex flex-col xl:flex-row justify-center h-full'>
                            <div className='text-black xl:flex-1 flex flex-col'>
                                <span className='text-xl'>{review.date}</span>
                                <h1 className='text-4xl uppercase'>{review.companyTitle}</h1>
                                <h1 className='text-xl uppercase'>{review.name}</h1>
                                <div className='w-8/12 h-20'>
                                    <p className='text-md text-slate-500 break-all'>{review.text.slice(0, 140)}</p>
                                </div>
                                <Rating
                                    className='text-lg text-amber-400 2xl:my-2'
                                    initialRating={review.rating}
                                    emptySymbol={<StarOutlined />}
                                    fullSymbol={<StarFilled />}
                                    readonly>
                                </Rating>
                            </div>
                            <div className='w-56 h-36 xl:flex-auto hidden xl:block'>
                                <img className='w-full' src={img1} alt="" />
                            </div>
                        </div>
                    </div>)}
            </Carousel>
        </div>
    );
};

export default Review;