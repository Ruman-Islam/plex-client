import React from 'react';
import { Carousel } from 'antd';
import img1 from '../../assets/images/IDC-Saas-Award-ERP-color.webp';


const contentStyle = {
    background: '#F2F3F3',
    display: 'flex'
};

const Review = () => {

    return (
        <div className='border border-black w-8/12 mx-auto my-20'>
            <Carousel autoplay>
                <>
                    <div style={contentStyle} className='p-20 flex justify-center h-full'>
                        <div className='text-black flex-1'>
                            <h1 className='text-4xl'>IDC</h1>
                            <p className='text-lg'>Plex Systems was recognized by Gartner as a Challenger in MES. In its 2021 Magic Quadrant for Manufacturing Execution Systems, Gartner evaluated 18 vendors on their ability to execute and their completeness of vision.</p>
                            <button className='uppercase btn btn-primary rounded'>see full review</button>
                        </div>
                        <div className='w-56 h-36 flex-auto'>
                            <img className='w-full' src={img1} alt="" />
                        </div>
                    </div>
                </>
                <>
                    <div style={contentStyle} className='p-20 flex justify-center h-full'>
                        <div className='text-black flex-1'>
                            <h1 className='text-4xl'>IDC</h1>
                            <p className='text-lg'>Plex Systems was recognized by Gartner as a Challenger in MES. In its 2021 Magic Quadrant for Manufacturing Execution Systems, Gartner evaluated 18 vendors on their ability to execute and their completeness of vision.</p>
                            <button className='uppercase btn btn-primary rounded'>see full review</button>
                        </div>
                        <div className='w-56 h-36 flex-auto'>
                            <img className='w-full' src={img1} alt="" />
                        </div>
                    </div>
                </>
                <>
                    <div style={contentStyle} className='p-20 flex justify-center h-full'>
                        <div className='text-black flex-1'>
                            <h1 className='text-4xl'>IDC</h1>
                            <p className='text-lg'>Plex Systems was recognized by Gartner as a Challenger in MES. In its 2021 Magic Quadrant for Manufacturing Execution Systems, Gartner evaluated 18 vendors on their ability to execute and their completeness of vision.</p>
                            <button className='uppercase btn btn-primary rounded'>see full review</button>
                        </div>
                        <div className='w-56 h-36 flex-auto'>
                            <img className='w-full' src={img1} alt="" />
                        </div>
                    </div>
                </>
                <>
                    <div style={contentStyle} className='p-20 flex justify-center h-full'>
                        <div className='text-black flex-1'>
                            <h1 className='text-4xl'>IDC</h1>
                            <p className='text-lg'>Plex Systems was recognized by Gartner as a Challenger in MES. In its 2021 Magic Quadrant for Manufacturing Execution Systems, Gartner evaluated 18 vendors on their ability to execute and their completeness of vision.</p>
                            <button className='uppercase btn btn-primary rounded'>see full review</button>
                        </div>
                        <div className='w-56 h-36 flex-auto'>
                            <img className='w-full' src={img1} alt="" />
                        </div>
                    </div>
                </>
                <>
                    <div style={contentStyle} className='p-20 flex justify-center h-full'>
                        <div className='text-black flex-1'>
                            <h1 className='text-4xl'>IDC</h1>
                            <p className='text-lg'>Plex Systems was recognized by Gartner as a Challenger in MES. In its 2021 Magic Quadrant for Manufacturing Execution Systems, Gartner evaluated 18 vendors on their ability to execute and their completeness of vision.</p>
                            <button className='uppercase btn btn-primary rounded'>see full review</button>
                        </div>
                        <div className='w-56 h-36 flex-auto'>
                            <img className='w-full' src={img1} alt="" />
                        </div>
                    </div>
                </>
            </Carousel>
        </div>
    );
};

export default Review;