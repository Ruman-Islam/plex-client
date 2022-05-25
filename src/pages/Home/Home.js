import React from 'react';
import Products from './Products';
import Hero from './Hero';
import Slider from './Slider';
import BusinessSummary from './BusinessSummary';
import Review from './Review';
import OurCustomers from './OurCustomers';
import ChatOption from './ChatOption';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const Home = () => {
    return (
        <div>
            <Navbar background="transparent" font="white" />
            <Hero />
            <Slider />
            <Products />
            <BusinessSummary />
            <Review />
            <OurCustomers />
            <ChatOption />
            <Footer />
        </div>
    );
};

export default Home;