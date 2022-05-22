import { PlusOutlined, PercentageOutlined } from '@ant-design/icons';
import React from 'react';

const BusinessSummary = () => {
    return (
        <div className='text-center'>
            <h1 className='text-6xl'>Working for your business...</h1>
            <div className='flex justify-around items-center w-8/12 mx-auto my-20'>
                <div>
                    <div className='flex items-center justify-center text-9xl font-extrabold'>
                        <span>8B</span><span className='text-7xl text-primary'><PlusOutlined /></span>
                    </div>
                    <span className='text-xl mr-16'>Transactions a Day</span>
                </div>
                <div>
                    <div className='flex items-center justify-center text-9xl font-extrabold'>
                        <span>A</span>
                    </div>
                    <span className='text-xl'>Security Rating</span>
                </div>
                <div>
                    <div className='flex items-center justify-center text-9xl font-extrabold'>
                        <span>96</span><span className='text-7xl text-primary'><PercentageOutlined /></span>
                    </div>
                    <span className='text-xl mr-10'>Gross Renewal Rate</span>
                </div>
            </div>
            <h1 className='text-6xl'>and your respect.</h1>
        </div>
    );
};

export default BusinessSummary;