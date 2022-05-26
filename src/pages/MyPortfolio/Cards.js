import React from 'react';
import { Card } from 'antd';
import Img1 from '../../assets/images/Screenshot_1.png';
import Img2 from '../../assets/images/Screenshot_2.png';
import Img3 from '../../assets/images/Screenshot_3.png';
const { Meta } = Card;

const Cards = () => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 justify-items-center p-5
         2xl:grid-cols-3 w-8/12 mx-auto gap-y-5'>
            <a href="https://plex-4449f.web.app/">
                <Card
                    hoverable
                    style={{
                        width: 350,
                        height: 300
                    }}
                    cover={<img alt="example" src={Img1} />}
                >
                    <Meta title="PLEX Manufacturer" description="LIVE SITE" />
                </Card>
            </a>
            <a href="https://warehouse-47f11.web.app/">
                <Card
                    hoverable
                    style={{
                        width: 350,
                        height: 300
                    }}
                    cover={<img alt="example" src={Img2} />}
                >
                    <Meta title="SHELTER Warehouse" description="CLICK" />
                </Card>
            </a>
            <a href="https://dream-weaver-91b28.web.app/">
                <Card
                    hoverable
                    style={{
                        width: 350,
                        height: 300
                    }}
                    cover={<img alt="example" src={Img3} />}
                >
                    <Meta title="PHOTOMETRY A Photographer" description="CLICK" />
                </Card>
            </a>
        </div>
    );
};

export default Cards;