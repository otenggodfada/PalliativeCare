const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Replace with your actual Flutterwave public and secret keys
const FLUTTERWAVE_SECRET_KEY = 'FLWSECK_TEST-53c9d56fa1ce204de1572a85b70cca0e-X';
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-25aa008a4acfb391043e20292e76c0e4-X';

app.use(cors());
app.use(bodyParser.json());

app.post('/initialize-payment', async (req, res) => {
    try {
      console.log('Request received:', req.body);
      const paymentData = { ...req.body, public_key: FLUTTERWAVE_PUBLIC_KEY };
      console.log('Sending payment data to Flutterwave API:', paymentData);
  
      const response = await axios.post('https://api.flutterwave.com/v3/payments', paymentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      });
  
      console.log('Flutterwave API response:', response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Error initializing payment:', error.response ? error.response.data : error.message);
      res.status(500).json({ message: error.response ? error.response.data : error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
