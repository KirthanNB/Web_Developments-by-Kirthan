// src/components/SplineBackground.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <Spline scene="https://prod.spline.design/JcU8UnAHG3w4FcOa/scene.splinecode" />
    </div>
  );
}

export default React.memo(SplineBackground);