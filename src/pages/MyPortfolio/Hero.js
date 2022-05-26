import { FacebookFilled, InstagramFilled, LinkedinFilled, MailTwoTone, PhoneTwoTone, ReadFilled, TwitterSquareFilled } from '@ant-design/icons';
import React from 'react';
import Img from '../../assets/images/person-2.png';

const Hero = () => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 
        justify-center items-center justify-items-center px-5 xl:px-32 2xl:px-56
         2xl:grid-cols-3 min-h-screen  xl:h-[40vh] 2xl:h-[100vh] bg-[#22252A] text-center xl:text-left'>
            <div className='w-8/12 xl:w-10/12 2xl:w-9/12 mb-24'>
                <img className='w-full shrink-0' src={Img} alt="" />
            </div>
            <div className='mt-0 xl:mt-[-50px]'>
                <h1 className='text-6xl font-semibold text-white'>I am <span className='text-primary'>Ruman</span></h1>
                <p className='text-slate-400 mt-[-20px]'>front-end web developer | graphic designer</p>
                <p className='text-slate-300 text-justify text-xs'>My goal is to become a skilled web developer. After completing programming hero web development course successfully, I shall apply for the designation 'Web Developer' in software companies. After getting job I'll try my best to serve the company by the skills I have gained from this course. I have higher desire to get job in renowned software firm. Insha Allah one day I'll reach my desired goal of life.</p>
                <ul className='text-slate-300 flex justify-around flex-col xl:flex-row border text-xs'>
                    <label>Skill - </label>
                    <li>JavaScript</li>
                    <li>React JS</li>
                    <li>Tailwind</li>
                    <li>Bootstrap</li>
                    <li>Vanilla CSS</li>
                    <li>Redux</li>
                </ul>
            </div>
            <div className='mb-5'>
                <ul className='ml-0 xl:ml-5r'>
                    <li className='flex items-center'>
                        <MailTwoTone />
                        <h1 className='ml-2 mt-1 text-slate-300'> rumanislam0429@gmail.com</h1>
                    </li>
                    <li className='flex items-center'>
                        <PhoneTwoTone />
                        <h1 className='ml-2 mt-1 text-slate-300'>+8801536160661</h1>
                    </li>
                    <li className='flex items-center'>
                        <span className='text-slate-300'><ReadFilled /></span>
                        <h1 className='ml-2 mt-3 text-slate-300'>Bsc in CSE</h1>
                    </li>
                </ul>
                <div className='text-3xl text-sky-500'>
                    <FacebookFilled className='mr-2 cursor-pointer' />
                    <LinkedinFilled className='mr-2 cursor-pointer' />
                    <TwitterSquareFilled className='mr-2 cursor-pointer' />
                    <InstagramFilled className='mr-2 cursor-pointer' />
                </div>
            </div>

        </div>
    );
};

export default Hero;