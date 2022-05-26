import React from 'react';
import { Space, Spin } from 'antd';

const Spinner = ({ social }) => {
    return (
        <div className={`w-16 mx-auto flex justify-center items-center ${social === 'social' && 'my-10'}`}>
            <Space size="middle">
                <Spin size="medium" />
            </Space>
        </div>
    );
};

export default Spinner;