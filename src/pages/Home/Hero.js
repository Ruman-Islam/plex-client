import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero h-screen lg:h-[90vh] hero-container">
            <div className="hero-content flex-col lg:flex-row z-50">
                <div className='mr-10 mt-20'>
                    <h1 className='uppercase text-5xl xl:text-6xl leading-none font-bold text-white'>Make your</h1>
                    <h1 className='uppercase text-5xl xl:text-6xl font-bold text-white'>operations</h1>
                    <h1 className='uppercase text-5xl xl:text-6xl font-bold text-primary'>smarter</h1>
                    <p className='text-white text-md xl:text-xl my-6 xl:my-16'>Meet Plex and the <span className='text-primary'>Smart Manufacturing Platform</span> that connects your people, systems, machines, and supply chains.</p>
                    <button
                        className="btn btn-secondary rounded">
                        Get Started
                    </button>
                </div>
                <div className='h-[40vh] shrink-0'>
                    <img src="https://play.vidyard.com/E5Yqz8U4eqaFhWAhj3gecN.jpg" className="h-full" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Hero;