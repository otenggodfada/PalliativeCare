import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center  mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-mypink text-white' : 'bg-gray-300 text-gray-500'}`}>
            {index + 1}
          </div>
       
        {index < steps.length - 1 && (
     
     <div className={` z-0  h-1  absolute  w-full mr-10   ${index < currentStep ? 'bg-mypink' : 'bg-gray-300'}`} />

 )}
       
        </div>
      ))}
    </div>
  );
};

export default Stepper;
