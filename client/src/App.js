// client/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [symbol, setSymbol] = useState('');
  const [date, setDate] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/endpoint', { symbol,date });
      console.log(date);
      setStockData(response.data);
      console.log(date)
	    console.log(response.data)
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setStockData(null);
    }
  };

  return (
    <div class="form-container">
      <h1>Stock Data Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <div class='form-type'>
        <label>
          <input
            type="text"
            value={symbol}
            class="form-field"
            placeholder="Stock Symbol"
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </label><br/>
        <label>
          
          <input
            type="date"
            value={date}
            class="form-field"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label><br/>
        <button class="form-field" type="submit">Fetch Data</button>
        </div>
      </form>

      {stockData && (
        <div>
          <h1>Stock Data</h1>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
}

export default App;
