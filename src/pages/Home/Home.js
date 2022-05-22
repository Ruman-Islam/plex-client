import React from 'react';
import Products from './Products';
import Hero from './Hero';
import Slider from './Slider';
import BusinessSummary from './BusinessSummary';
import Review from './Review';

const Home = () => {
    return (
        <div>
            <Hero />
            <Slider />
            <Products />
            <BusinessSummary />
            <Review />
        </div>
    );
};

export default Home;