import React from 'react';
import { Space, Spin } from 'antd';

const Spinner = ({ margin }) => {
    console.log(margin);
    return (
        <div className={`w-16 mx-auto flex justify-center my-${margin}`}>
            <Space size="middle">
                <Spin size="medium" />
            </Space>
        </div>
    );
};

export default Spinner;