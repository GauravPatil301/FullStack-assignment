// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/endpoint',async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const { symbol,date } = req.body; // Assuming the client sends the stock symbol in the request body

    try {
        // Replace 'YOUR_ALPHA_VANTAGE_API_KEY' with your actual Alpha Vantage API key
        if (!symbol|| !date) {
            return res.status(400).json({ error: "Stock symbol and date are required." });
        }
        const apiKey = 'process.env.API_KEY';
        const apiUrl = `https://api.polygon.io/v1/open-close/AAPL/${date}?adjusted=true&apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        
        const stockData = response.data;
        console.log(stockData)
        
        res.status(200).json(stockData);
  } catch (error) {
    // Handle errors and return relevant response codes
    console.error('Error fetching stock data:', error.message);
    res.status(500).json({ error: 'Error fetching stock data' });
  }
    
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));