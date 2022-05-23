import React from 'react';
import { Collapse } from 'antd';
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled, YoutubeFilled } from '@ant-design/icons';
const { Panel } = Collapse;

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <>
            <div className='border border-t border-l-0 border-r-0 border-b-0 w-10/12 mx-auto'>
                <div className='hidden xl:flex'>
                    <div className='grid grid-cols-3 mx-auto gap-4 mt-5'>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Products</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Manufacturing Execution System (MES)</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Enterprise Resource Planning (ERP)</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Quality Management System (QMS)</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Supply Chain Planning (SCP)</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Production Monitoring</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>MES Automation &apm; Orchestration</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Asset Performance Management (APM)</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Platform</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Smart Manufacturing Platform Overview</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Cloud Infrastructure &apm; Security</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Mobile Application</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Availability &amp; Performance</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Manufacturing Automation</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Industries</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>MES Beginners Guide</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Cloud-Based MES Basics</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>What is a Quality Management System</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Types of Quality Management Systems</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Quality Management Systems (QMS) for Manufacturing</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>IIoT Beginners Guide</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Resources</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>All Resources</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Enterprise Resource Planning (ERP)</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Success Stories</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Product Demos</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Analyst Reports</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Blog</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Services &amp; Support</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Customer Success &amp; Advocacy</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Support Services</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Education Services</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Professional Services</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Plex Community</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className='text-md mb-7 font-bold'>Company</h1>
                            <ul>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>About Us</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Leadership</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Customers</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Partner Ecosystem</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Newsroom</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Careers</li>
                                <li className='text-slate-500 hover:text-secondary cursor-pointer'>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='text-md mb-7 font-bold'>Knowledge Articles</h1>
                        <ul>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>MES Beginners Guide</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Cloud-Based MES Basics</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>What is a Quality Management System</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Types of Quality Management Systems</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Quality Management Systems (QMS) for Manufacturing</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>IIoT Beginners Guide</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>MES Beginners Guide</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Cloud-Based MES Basics</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Quality Management Systems (QMS) for Manufacturing</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>What is Industry 4.0?</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>What is a Smart Factory?</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>The Rise of Automation in Manufacturing</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>The Future of Robotics and Automation in Manufacturing</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>Supply Chain Planning: a Guide to Strategic Planning and Operations</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>What is Smart Supply Chain Management?</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>An Extensive Guide To Asset Performance Management (APM)</li>
                            <li className='text-slate-500 hover:text-secondary cursor-pointer'>A Guide to Monitoring Machine Performance </li>
                        </ul>
                    </div>
                </div>
                <Collapse accordion className='block 2xl:hidden'>
                    <Panel header="Products" key="1">
                        <ul>
                            <li>Manufacturing Execution System (MES)</li>
                            <li>Enterprise Resource Planning (ERP)</li>
                            <li>Quality Management System (QMS)</li>
                            <li>Supply Chain Planning (SCP)</li>
                            <li>Production Monitoring</li>
                            <li>MES Automation &apm; Orchestration</li>
                            <li>Asset Performance Management (APM)</li>
                        </ul>
                    </Panel>
                    <Panel header="Platform" key="2">
                        <ul>
                            <li>Smart Manufacturing Platform Overview</li>
                            <li>Cloud Infrastructure &apm; Security</li>
                            <li>Mobile Application</li>
                            <li>Availability &amp; Performance</li>
                            <li>Manufacturing Automation</li>
                        </ul>
                    </Panel>
                    <Panel header="Industries" key="3">
                        <ul>
                            <li>MES Beginners Guide</li>
                            <li>Cloud-Based MES Basics</li>
                            <li>What is a Quality Management System</li>
                            <li>Types of Quality Management Systems</li>
                            <li>Quality Management Systems (QMS) for Manufacturing</li>
                            <li>IIoT Beginners Guide</li>
                        </ul>
                    </Panel>
                    <Panel header="Resources" key="4">
                        <ul>
                            <li>All Resources</li>
                            <li>Enterprise Resource Planning (ERP)</li>
                            <li>Success Stories</li>
                            <li>Product Demos</li>
                            <li>Analyst Reports</li>
                            <li>Blog</li>
                        </ul>
                    </Panel>
                    <Panel header="Services &amp; Support" key="5">
                        <ul>
                            <li>Customer Success &amp; Advocacy</li>
                            <li>Support Services</li>
                            <li>Education Services</li>
                            <li>Professional Services</li>
                            <li>Plex Community</li>
                        </ul>
                    </Panel>
                    <Panel header="Company" key="7">
                        <ul>
                            <li>About Us</li>
                            <li>Leadership</li>
                            <li>Customers</li>
                            <li>Partner Ecosystem</li>
                            <li>Newsroom</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </Panel>
                    <Panel header="Knowledge Articles" key="6">
                        <ul>
                            <li>MES Beginners Guide</li>
                            <li>Cloud-Based MES Basics</li>
                            <li>What is a Quality Management System</li>
                            <li>Types of Quality Management Systems</li>
                            <li>Quality Management Systems (QMS) for Manufacturing</li>
                            <li>IIoT Beginners Guide</li>
                            <li>MES Beginners Guide</li>
                            <li>Cloud-Based MES Basics</li>
                            <li>Quality Management Systems (QMS) for Manufacturing</li>
                            <li>What is Industry 4.0?</li>
                            <li>What is a Smart Factory?</li>
                            <li>The Rise of Automation in Manufacturing</li>
                            <li>The Future of Robotics and Automation in Manufacturing</li>
                            <li>Supply Chain Planning: a Guide to Strategic Planning and Operations</li>
                            <li>What is Smart Supply Chain Management?</li>
                            <li>An Extensive Guide To Asset Performance Management (APM)</li>
                            <li>A Guide to Monitoring Machine Performance </li>
                        </ul>
                    </Panel>
                </Collapse>
            </div>
            <div className='border border-t-0 border-l-0 border-r-0 border-b-1 w-10/12 mx-auto mt-10 2xl:mt-20'>
                <ul className='flex justify-center 2xl:justify-start text-4xl 2xl:pl-10'>
                    <li className='ml-1 text-blue-600 hover:text-primary cursor-pointer duration-300'><FacebookFilled /></li>
                    <li className='ml-1 text-sky-600 hover:text-primary cursor-pointer duration-300'><TwitterSquareFilled /></li>
                    <li className='ml-1 text-blue-900 hover:text-primary cursor-pointer duration-300'><LinkedinFilled /></li>
                    <li className='ml-1 text-red-600 hover:text-primary cursor-pointer duration-300'><YoutubeFilled /></li>
                </ul>
            </div>
            <p className='text-center text-secondary font-bold mt-2'>© {year} Ruman Islam. All rights reserved</p>
            <br />
        </>
    );
};

export default Footer;
