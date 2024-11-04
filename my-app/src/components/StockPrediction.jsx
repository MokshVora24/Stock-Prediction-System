// StockPrediction.jsx
import React, { useState } from 'react';
import { fetchStockData } from '../api';
import ClosingPriceGraph from './ClosingPriceGraph';  // Assuming you have this component
import PastClosingValueGraph from './PastClosingValueGraph';  // Assuming you have this component
import TrendAnalysisGraph from './TrendAnalysisGraph';  // Assuming you have this component

const StockPrediction = () => {
    const [ticker, setTicker] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null); // State to hold error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state on new request
        try {
            const predictionResult = await fetchStockData(ticker);
            setData(predictionResult);
        } catch (error) {
            setError(error.message); // Set the error message to state
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter stock ticker"
                />
                <button type="submit">Predict</button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Display error messages */}
            {data && (
                <div>
                    <h3>Today's Predicted Closing Price: {data.regression_prediction}</h3>
                    {/* Here you can include other components to display the data */}
                    <ClosingPriceGraph todayPrediction={data.regression_prediction} />
                    {/* Include PastClosingValueGraph and TrendAnalysisGraph as needed */}
                </div>
            )}
        </div>
    );
};

export default StockPrediction;
