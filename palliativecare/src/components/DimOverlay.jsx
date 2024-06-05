// DimOverlay.js

import React from 'react';

const DimOverlay = ({ isOpen }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'bg-black bg-opacity-50' : 'hidden'}`}></div>
  );
};

export default DimOverlay;
