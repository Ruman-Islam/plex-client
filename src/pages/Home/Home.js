import React from 'react';
import Products from './Products';
import Hero from './Hero';
import Slider from './Slider';
import BusinessSummary from './BusinessSummary';
import Review from './Review';
import OurCustomers from './OurCustomers';
import ChatOption from './ChatOption';

const Home = () => {
    return (
        <div>
            <Hero />
            <Slider />
            <Products />
            <BusinessSummary />
            <Review />
            <OurCustomers />
            <ChatOption />
        </div>
    );
};

export default Home;