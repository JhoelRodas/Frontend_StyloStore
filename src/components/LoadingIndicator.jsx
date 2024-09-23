import React from 'react';
import { Spin } from 'antd';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default LoadingIndicator;
