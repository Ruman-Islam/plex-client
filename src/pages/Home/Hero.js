import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero 2xl:h-[80vh] hero-container pt-12 2xl:pt-0">
            <div className="hero-content flex-col lg:flex-row z-50">
                <div className='mt-20 xl:mr-16 tracking-widest'>
                    <h1 className='uppercase text-5xl xl:text-5xl 2xl:text-6xl leading-none font-extrabold text-white'>Make your</h1>
                    <h1 className='uppercase text-5xl xl:text-5xl 2xl:text-6xl font-extrabold text-white'>operations</h1>
                    <h1 className='uppercase text-5xl xl:text-5xl 2xl:text-6xl font-extrabold text-primary'>smarter</h1>
                    <p className='text-white text-md xl:text-xl my-6 xl:my-16'>Meet Plex and the <span className='text-primary'>Smart Manufacturing Platform</span> that connects your people, systems, machines, and supply chains.</p>
                    <button
                        className="btn btn-secondary rounded hidden xl:block">
                        Get Started
                    </button>
                </div>
                <div className='xl:h-[45vh] 2xl:h-[35vh] shrink-0'>
                    <img src="https://play.vidyard.com/E5Yqz8U4eqaFhWAhj3gecN.jpg" className="h-full" alt="" />
                </div>
                <button
                    className="btn btn-secondary w-full rounded block xl:hidden mt-5">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Hero;