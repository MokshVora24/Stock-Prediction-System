// TrendAnalysisGraph.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const TrendAnalysisGraph = ({ trends }) => {
    const trendData = {
        labels: trends.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Trend Analysis',
                data: trends.map(trend => (trend === 'Up' ? 1 : 0)),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h3>Trend Analysis (1: Up, 0: Down)</h3>
            <Bar data={trendData} />
        </div>
    );
};

export default TrendAnalysisGraph;
