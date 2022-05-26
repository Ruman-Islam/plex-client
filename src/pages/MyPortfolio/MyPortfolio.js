import React from 'react';
import Navbar from '../../components/shared/Navbar';
import Cards from './Cards';
import Hero from './Hero';
import { Divider } from 'antd';

const MyPortfolio = () => {
    return (
        <div>
            <Navbar background="white" font="black" />
            <div className='pt-16 xl:pt-20'>
                <Hero />
            </div>
            <div>
                <Divider>
                    <span className='uppercase text-black font-bold text-center text-4xl'>my works</span>
                </Divider>
                <Cards />
            </div>
        </div>
    );
};

export default MyPortfolio;