import React, { useState, useEffect } from 'react';
import makePayment from './makepayment'; // Assuming makePayment.js is in the same directory

const PaymentComponent = () => {
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = await makePayment();
        setPaymentLink(link);
      } catch (error) {
        console.error('Error making payment:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Payment Component</h1>
      {paymentLink ? (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">Complete Payment</a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentComponent;
