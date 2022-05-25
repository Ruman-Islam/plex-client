import React from 'react';
import { Space, Spin } from 'antd';

const Spinner = () => {
    return (
        <div className={`w-16 mx-auto flex justify-center items-center h-screen`}>
            <Space size="middle">
                <Spin size="medium" />
            </Space>
        </div>
    );
};

export default Spinner;