import React from 'react';
import { Carousel } from 'antd';
import img1 from '../../assets/images/advanced-manufacturing-rock.jpeg';
import img2 from '../../assets/images/report.png';
import img3 from '../../assets/images/220x260_IDC-CSAT-ERP-Plex.png';

const contentStyle = {
    background: '#F2F3F3',
};

const Slider = () => {
    return (
        <Carousel autoplay>
            <>
                <div style={contentStyle} className='xl:px-96 flex flex-col xl:flex-row justify-center items-center h-[500px] xl:h-[250px]'>
                    <img className='w-56 h-56' src={img1} alt="" />
                    <div className='text-black text-center xl:text-left text-lg px-5'>
                        <strong>PowerPlex is joining ROKLive in Orlando </strong> <br />
                        ROKLive brings together industry leaders and innovators to explore the real-world solutions that are linking OT and IT like never before.
                    </div>
                </div>
            </>
            <>
                <div style={contentStyle} className='xl:px-96 flex flex-col xl:flex-row justify-center items-center h-[500px] xl:h-[250px]'>
                    <img className='w-56 h-56' src={img2} alt="" />
                    <div className='text-black text-center xl:text-left text-lg px-5'>
                        <strong>7th Annual State of Smart Manufacturing Report</strong> <br />
                        300+ manufacturing leaders share the  challenges facing their business and how they use technology to address these needs.
                    </div>
                </div>
            </>
            <>
                <div style={contentStyle} className='xl:px-96 flex flex-col xl:flex-row justify-center items-center h-[500px] xl:h-[250px]'>
                    <img className='w-56 h-56' src={img3} alt="" />
                    <div className='text-black text-center xl:text-left text-lg px-5'>
                        <strong>2021 IDC SaaS ERP Customer Satisfaction Award</strong> <br />
                        Plex customers gave  high satisfaction ratings in  IDC’s SaaSPath survey. See where Plex excels.
                        See how Plex quickly delivered value and ROI to a leading manufacturer.
                    </div>
                </div>
            </>
        </Carousel>
    );
};

export default Slider;