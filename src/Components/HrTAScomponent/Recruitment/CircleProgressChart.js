import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ['Applied', 'Round 1', 'Round 2'],
    datasets: [
      {
        label: 'Candidates',
        data: [400, 200, 100],
        backgroundColor: ['#6283C0', '#BDABF5', '#8855B2'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height and width
    cutout: '70%', // Adjust this to control the doughnut thickness
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} Candidates`;
          },
        },
      },
    },
  };

  return (
    <div
      className="p-6"
      style={{ height: '292px', width: '' }} 
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
