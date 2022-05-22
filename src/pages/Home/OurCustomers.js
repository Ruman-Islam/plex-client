import React from 'react';
import img1 from '../../assets/images/wisconsin-metal-tech-logo-800x800.png';
import img2 from '../../assets/images/Plex_Customers_CaseStudy_Sanders_Logo.png';
import img3 from '../../assets/images/JF_Fredericks-Logo-800x800.png';
import img4 from '../../assets/images/OldeThompson_800x800.png';

const OurCustomers = () => {
    return (
        <div className='text-center'>
            <h1 className='text-4xl 2xl:text-6xl font-extrabold'>Our Customers.</h1>
            <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 justify-items-center 2xl:px-72 gap-6 justify-center items-center'>
                <div className='w-[300px] border'>
                    <img src={img1} alt="" />
                </div>
                <div className='w-[300px] border'>
                    <img src={img2} alt="" />
                </div>
                <div className='w-[300px] border'>
                    <img src={img3} alt="" />
                </div>
                <div className='w-[300px] border'>
                    <img src={img4} alt="" />
                </div>
            </div>
        </div>
    );
};

export default OurCustomers;