// PastClosingValueGraph.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const PastClosingValueGraph = ({ pastData, ticker }) => {
    const data = {
        labels: pastData.dates,
        datasets: [
            {
                label: `Past Closing Prices for ${ticker}`,
                data: pastData.closing_prices,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h3>Past Closing Prices for {ticker} (Last Year)</h3>
            <Line data={data} />
        </div>
    );
};

export default PastClosingValueGraph;
