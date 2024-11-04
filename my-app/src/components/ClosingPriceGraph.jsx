// ClosingPriceGraph.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const ClosingPriceGraph = ({ todayPrediction, futurePrices }) => {
    const labels = ['Today', 'Day 1', 'Day 2', 'Day 3', 'Day 4'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Predicted Closing Prices',
                data: [todayPrediction, ...futurePrices],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h3>Predicted Closing Prices for the Next 5 Days</h3>
            <Line data={data} />
        </div>
    );
};

export default ClosingPriceGraph;
