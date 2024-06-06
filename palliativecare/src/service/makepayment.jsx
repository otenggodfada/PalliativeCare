import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Stepper from '../utils/stepper';

const steps = ['Personal Info', 'Address Info', 'Verify Identity', 'Upload Document', 'Payment'];

const PaymentForm = () => {
  const [paymentLink, setPaymentLink] = useState();
  const [step, setStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [documentImage, setDocumentImage] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });
  const [addressInfo, setAddressInfo] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const currencies = [
    'AED', 'ARS', 'AUD', 'BGN', 'BRL', 'BWP', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EGP', 'ETB', 'EUR', 'GBP', 'GHS',
    'HUF', 'ILS', 'INR', 'JPY', 'KES', 'MAD', 'MUR', 'MWK', 'MXN', 'MYR', 'NGN', 'NOK', 'NZD', 'PEN', 'PLN', 'QAR',
    'RUB', 'RWF', 'SAR', 'SEK', 'SGD', 'SLL', 'THB', 'TRY', 'TZS', 'UGX', 'USD', 'VEF', 'XAF', 'XOF', 'ZAR', 'ZMK',
    'ZMW'
  ];
  const handleImageUpload = (event) => {
    setDocumentImage(event.target.files[0]);
  };

  const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction((prev) => ({ ...prev, [name]: value }));
  };

  const generateTxRef = () => {
    return `txref-${Math.floor(Math.random() * 1000000)}`;
  };

  const makePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/initialize-payment', {
        tx_ref: generateTxRef(),
        amount: 50,
        currency: selectedCurrency,
        redirect_url: "https://www.flutterwave.ng",
        payment_options: 'card, banktransfer, ussd, momo',
        meta: {
          consumer_mac: '92a3-912ba-1192a',
        },
        customer: {
          email: personalInfo.email,
          phone_number: personalInfo.phoneNumber,
          name: personalInfo.fullName,
        },
        customizations: {
          title: 'KYC Verification',
          description: 'Verification fee',
          logo: 'https://i.ibb.co/4gx5Srm/logo-4.png',
        },  callback: function (data){
          console.log("payment callback:", data);
        },
        onclose: function() {
          console.log("Payment cancelled!");
        }
      });
      const { link } = response.data.data;
      setPaymentLink(link);
    } catch (error) {
      console.error('Payment initialization error:', error);
      setPaymentError('Payment initialization failed. Please try again.');
    }
  };

  const nextStep = () => {
    if (step === 0 && Object.values(personalInfo).some(value => !value)) {
      alert('Please fill in all personal information fields.');
      return;
    }
    if (step === 1 && Object.values(addressInfo).some(value => !value)) {
      alert('Please fill in all address information fields.');
      return;
    }
    if (step === 2 && !documentType) {
      alert('Please select a document type.');
      return;
    }
    if (step === 3 && !documentImage) {
      alert('Please upload the document.');
      return;
    }
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <Stepper steps={steps} currentStep={step} />
        {step === 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Step 1: Personal Information</h2>
            <p className="mb-6">All fields are required to complete the KYC process. There are 5 steps in total, and you will need to pay $5 to complete the verification.</p>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="w-full p-4 border rounded mb-6"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange(e, setPersonalInfo)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-4 border rounded mb-6"
              value={personalInfo.email}
              onChange={(e) => handleInputChange(e, setPersonalInfo)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              className="w-full p-4 border rounded mb-6"
              value={personalInfo.phoneNumber}
              onChange={(e) => handleInputChange(e, setPersonalInfo)}
              required
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Step 2: Address Information</h2>
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="w-full p-4 border rounded mb-6"
              value={addressInfo.address}
              onChange={(e) => handleInputChange(e, setAddressInfo)}
              required
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              className="w-full p-4 border rounded mb-6"
              value={addressInfo.city}
              onChange={(e) => handleInputChange(e, setAddressInfo)}
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="w-full p-4 border rounded mb-6"
              value={addressInfo.state}
              onChange={(e) => handleInputChange(e, setAddressInfo)}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              className="w-full p-4 border rounded mb-6"
              value={addressInfo.postalCode}
              onChange={(e) => handleInputChange(e, setAddressInfo)}
              required
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-200"
                onClick={previousStep}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Step 3: Verify Identity</h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Choose Document Type</label>
              <select                 className="w-full p-4 border rounded mb-6"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              >
                <option value="">Select Document Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver's License</option>
                <option value="national_id">National ID</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-200"
                onClick={previousStep}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Step 4: Upload Document</h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Upload {documentType}</label>
              <input
                type="file"
                className="w-full p-4 border rounded mb-6"
                onChange={handleImageUpload}
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-200"
                onClick={previousStep}
              >
                Back
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Step 5: Payment</h2>
            <div className="mb-6 text-lg font-bold">Your order is {selectedCurrency}5</div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select Currency</label>
              <select
                className="w-full p-4 border rounded mb-6"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                required
              >
                <option value="">Select Currency</option>
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-200"
              type="button"
              onClick={makePayment}
            >
              Proceed to Payment
            </button>
            {paymentLink && (
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Complete Payment
              </a>
            )}
            {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-200"
                onClick={previousStep}
              >
                Back
              </button>
              {paymentLink && (
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-200"
                  onClick={() => setStep(0)}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;

               
