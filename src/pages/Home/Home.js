import React from 'react';
import Products from './Products';
import Hero from './Hero';
import Slider from './Slider';
import BusinessSummary from './BusinessSummary';

const Home = () => {
    return (
        <div>
            <Hero />
            <Slider />
            <Products />
            <BusinessSummary />
        </div>
    );
};

export default Home;